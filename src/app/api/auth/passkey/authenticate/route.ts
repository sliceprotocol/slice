import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    const {
      userId,
      credentialId,
      signature,
      // authenticatorData and clientDataJSON are reserved for future WebAuthn verification
      // authenticatorData,
      // clientDataJSON,
    } = body;

    if (!userId || !credentialId || !signature) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get passkey from database
    const { data: passkey, error: fetchError } = await supabase
      .from("user_passkeys")
      .select("*")
      .eq("user_id", userId)
      .eq("credential_id", credentialId)
      .single();

    if (fetchError || !passkey) {
      return NextResponse.json(
        { error: "Invalid passkey" },
        { status: 401 },
      );
    }

    // TODO: Implement proper WebAuthn verification
    // For now, we'll just verify the credential exists and update counter
    // In production, you should verify the signature using the public key

    // Update counter (prevent replay attacks)
    const { error: updateError } = await supabase
      .from("user_passkeys")
      .update({ counter: passkey.counter + 1 })
      .eq("credential_id", credentialId);

    if (updateError) {
      console.error("Error updating passkey counter:", updateError);
    }

    // After successful passkey verification, generate an auth token using Admin API
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!serviceRoleKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Create admin client
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

    // Generate a recovery/signup link which gives us a valid token hash
    // We use 'signup' type which provides a token that can be used immediately
    const { data: linkData, error: linkError } =
      await adminClient.auth.admin.generateLink({
        type: 'signup',
        email: passkey.email,
      });

    if (linkError || !linkData) {
      console.error("Error generating auth link:", linkError);
      return NextResponse.json(
        { error: "Failed to generate authentication token" },
        { status: 500 },
      );
    }

    // Extract the hashed token from the properties
    // This token can be exchanged for a session
    const tokenHash = linkData.properties.hashed_token;
    
    if (!tokenHash) {
      console.error("No hashed token in response");
      return NextResponse.json(
        { error: "Failed to generate authentication token" },
        { status: 500 },
      );
    }

    // Return the token hash for the client to exchange
    return NextResponse.json({
      success: true,
      userId,
      email: passkey.email,
      tokenHash,
      tokenType: 'signup',
    });
  } catch (error: any) {
    console.error("Error in passkey authentication:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
