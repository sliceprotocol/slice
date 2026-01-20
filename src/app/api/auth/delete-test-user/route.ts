import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * ENDPOINT DE DESARROLLO SOLO PARA TESTING
 * Elimina un usuario de prueba por email
 * 
 * ADVERTENCIA: Este endpoint debe ser eliminado en producción
 * o protegido con autenticación de admin
 */
export async function POST(request: NextRequest) {
  // Solo permitir en desarrollo
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Only allow test emails (safety measure)
    if (!email.includes("test") && !email.includes("demo") && !email.includes("+")) {
      return NextResponse.json(
        { error: "For safety, only emails containing 'test', 'demo', or '+' can be deleted via this endpoint" },
        { status: 400 },
      );
    }

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

    // Find user by email
    const { data: usersData, error: listError } =
      await adminClient.auth.admin.listUsers();

    if (listError) {
      console.error("Error listing users:", listError);
      return NextResponse.json(
        { error: "Failed to list users" },
        { status: 500 },
      );
    }

    const user = usersData?.users?.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    // Delete user
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(
      user.id,
    );

    if (deleteError) {
      console.error("Error deleting user:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 },
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `User ${email} deleted successfully`,
      userId: user.id 
    });
  } catch (error: any) {
    console.error("Error in delete-test-user:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
