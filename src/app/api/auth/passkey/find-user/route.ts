import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // First, check if user exists in auth.users using Admin API
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let userExists = false;
    let userId: string | null = null;

    if (serviceRoleKey) {
      try {
        const adminClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          serviceRoleKey,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          },
        );

        // Try to get user by email using listUsers with pagination
        // Note: Supabase Admin API doesn't have a direct getUserByEmail method
        // So we use listUsers and filter (this works but may be slow with many users)
        const { data: usersData, error: usersError } =
          await adminClient.auth.admin.listUsers();

        if (!usersError && usersData?.users) {
          const user = usersData.users.find((u) => u.email === email);
          if (user) {
            userExists = true;
            userId = user.id;
          }
        }
      } catch (adminError) {
        // If Admin API fails, continue without user check
        // We'll rely on the passkey table lookup instead
        console.warn("Admin API check failed:", adminError);
      }
    }

    // Find user by email in user_passkeys table to get credentialIds
    const { data: passkeyRecords, error: passkeyError } = await supabase
      .from("user_passkeys")
      .select("user_id, credential_id")
      .eq("email", email);

    // If user exists but has no passkeys, return userId so they can register one
    if (userExists && userId && (!passkeyRecords || passkeyRecords.length === 0)) {
      return NextResponse.json(
        {
          error:
            "No passkey found for this email. Please register a passkey first.",
          userId, // Return userId so user can register passkey
          userExists: true,
        },
        { status: 404 },
      );
    }

    // If no passkeys found and user doesn't exist
    // Return 200 (not 404) to treat this as an informative state, not an error
    if (passkeyError || !passkeyRecords || passkeyRecords.length === 0) {
      return NextResponse.json(
        {
          message:
            "No account found with this email. Please sign up first.",
          userExists: false,
        },
        { status: 200 },
      );
    }

    // Get unique userId (all records should have the same user_id for the same email)
    const foundUserId = passkeyRecords[0].user_id;
    const credentialIds = passkeyRecords.map((p) => p.credential_id);

    return NextResponse.json({ userId: foundUserId, credentialIds });
  } catch (error: any) {
    console.error("Error in find-user:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
