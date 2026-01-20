import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    const { userId, email, credentialId, publicKey, counter, deviceName } =
      body;

    if (!userId || !email || !credentialId || !publicKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get service role key for Admin API operations
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

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

    // Verify user exists and email matches using Admin API
    const { data: userData, error: adminError } =
      await adminClient.auth.admin.getUserById(userId);

    if (adminError || !userData.user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    // Verify email matches
    if (userData.user.email !== email) {
      return NextResponse.json(
        { error: "Email does not match user" },
        { status: 403 },
      );
    }

    // Use Admin API to insert passkey (bypasses RLS)
    // This is necessary because during signup, the user might not have an active session yet
    const { data, error } = await adminClient
      .from("user_passkeys")
      .insert({
        user_id: userId,
        email: email,
        credential_id: credentialId,
        public_key: publicKey,
        counter: counter || 0,
        device_name: deviceName || "Unknown Device",
      })
      .select()
      .single();

    if (error) {
      console.error("Error registering passkey:", error);
      return NextResponse.json(
        { error: "Failed to register passkey", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error in passkey registration:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
