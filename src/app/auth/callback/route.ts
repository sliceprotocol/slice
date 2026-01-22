import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const errorCode = requestUrl.searchParams.get("error_code");

  // Create response object for cookie handling
  const response = NextResponse.redirect(new URL("/", requestUrl.origin));

  // If there's an error, redirect to home with error message
  if (error) {
    const errorUrl = new URL("/", requestUrl.origin);
    if (errorCode === "otp_expired") {
      errorUrl.searchParams.set(
        "auth_error",
        "The authentication link has expired. Please try signing in again.",
      );
    } else {
      errorUrl.searchParams.set(
        "auth_error",
        errorDescription || "Authentication failed",
      );
    }
    return NextResponse.redirect(errorUrl);
  }

  // If there's a code, exchange it for a session
  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code,
    );

    if (!exchangeError) {
      // Success - redirect to home with success message
      const successUrl = new URL("/", requestUrl.origin);
      successUrl.searchParams.set("auth", "success");
      return NextResponse.redirect(successUrl);
    } else {
      // Handle exchange error
      const errorUrl = new URL("/", requestUrl.origin);
      errorUrl.searchParams.set("auth_error", exchangeError.message);
      return NextResponse.redirect(errorUrl);
    }
  }

  // Default redirect to home
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
