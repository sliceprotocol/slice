import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Check if user exists in auth.users using Admin API
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

    // Search for user by email
    const { data: usersData, error: usersError } =
      await adminClient.auth.admin.listUsers();

    if (usersError) {
      console.error("Error checking email:", usersError);
      return NextResponse.json(
        { error: "Failed to check email" },
        { status: 500 },
      );
    }

    const userExists = usersData?.users?.some((u) => u.email === email) || false;

    return NextResponse.json({ exists: userExists });
  } catch (error: any) {
    console.error("Error in check-email:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
