"use client";

import { useState } from "react";
import { createClient } from "@/config/supabase";
import { usePasskey } from "@/hooks/usePasskey";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X, Mail, KeyRound } from "lucide-react";
import { useSupabase } from "@/components/providers/SupabaseProvider";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"email" | "passkey" | "wallet">("email");
  const supabase = createClient();
  const { user } = useSupabase();
  const {
    register,
    authenticate,
    isSupported: isPasskeySupported,
  } = usePasskey();

  if (!isOpen) return null;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("handleEmailLogin called", { isSignUp, email, passwordLength: password.length, isLoading });
    
    // Prevent multiple submissions
    if (isLoading) {
      console.log("Already loading, returning");
      return;
    }
    
    // Validate inputs
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    if (isSignUp && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    if (!isSignUp && !password) {
      toast.error("Please enter your password");
      return;
    }
    
    setIsLoading(true);
    console.log("Starting authentication...", { isSignUp, email });

    try {
      if (isSignUp) {
        console.log("Attempting signup...");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        
        console.log("Signup response:", { data, error, hasUser: !!data?.user, hasSession: !!data?.session });
        
        if (error) {
          // Handle rate limiting specifically
          if (error.status === 429) {
            throw new Error(
              "Too many requests. Please wait a moment and try again.",
            );
          }
          throw error;
        }
        
        // Check if user was created
        if (data?.user) {
          // If we have a session, user is logged in immediately
          if (data.session) {
            console.log("User signed up and logged in immediately");
            toast.success("Account created! You are now logged in.");
            onSuccess?.();
            onClose();
          } else {
            // No session means email confirmation is required
            console.log("User created but needs email confirmation");
            toast.success("Account created! Please check your email for verification.");
            // Close modal after showing message
            setTimeout(() => {
              onClose();
            }, 2000);
          }
        } else {
          // Fallback - shouldn't happen but handle it
          console.warn("Signup succeeded but no user data returned");
          toast.success("Account created! Please check your email for verification.");
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } else {
        console.log("Attempting signin...");
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log("Signin response:", { data, error });
        
        if (error) {
          // Handle rate limiting specifically
          if (error.status === 429) {
            throw new Error(
              "Too many requests. Please wait a moment and try again.",
            );
          }
          
          // Check if the error is due to unconfirmed email
          if (error.message === "Email not confirmed") {
            throw new Error(
              "Please check your email and click the confirmation link before signing in. If you don't see the email, check your spam folder.",
            );
          }
          
          if (error.message === "Invalid login credentials") {
            // This could be due to unconfirmed email or wrong password
            throw new Error(
              "Invalid credentials. If you just signed up, please check your email to confirm your account first.",
            );
          }
          
          throw error;
        }
        
        console.log("Signin successful");
        toast.success("Logged in successfully!");
        onSuccess?.();
        onClose();
      }
    } catch (error: any) {
      const errorMessage =
        error.message || error.error_description || "Authentication failed";
      toast.error(errorMessage);
      
      // Log error for debugging
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeySignup = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      console.log("=== PASSKEY SIGNUP STARTED ===");
      console.log("Starting passkey signup for:", email);
      console.log("isSignUp:", isSignUp, "mode:", mode);

      // Check if email already exists
      try {
        console.log("Checking if email exists...");
        const checkResponse = await fetch("/api/auth/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        console.log("Check email response status:", checkResponse.status);
        
        if (checkResponse.ok) {
          const { exists } = await checkResponse.json();
          console.log("Email exists?", exists);
          
          if (exists) {
            toast.error(
              "An account with this email already exists. Please sign in with email/password first, then you can register a passkey from your profile.",
            );
            setIsSignUp(false); // Switch to sign in mode
            return;
          }
        }
      } catch (checkError) {
        // If check fails, continue with signup
        console.warn("Could not check email:", checkError);
      }
      
      console.log("Email check passed, proceeding with signup...");

      // Create account with email (passwordless - using random password user won't need)
      const { data: signupData, error: signupError } =
        await supabase.auth.signUp({
          email,
          password: crypto.randomUUID(), // Generate random password, user won't need it
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              signup_method: "passkey",
            },
          },
        });

      if (signupError) {
        // Handle specific errors
        if (signupError.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and try again.",
          );
        }
        if (signupError.message.includes("already registered") || 
            signupError.message.includes("already been registered")) {
          toast.error(
            "An account with this email already exists. Please sign in instead.",
          );
          setIsSignUp(false); // Switch to sign in mode
          return;
        }
        throw signupError;
      }

      if (!signupData.user) {
        throw new Error("Failed to create account");
      }

      console.log("Account created, registering passkey...");

      // Register passkey for the new user
      try {
        await register({
          userId: signupData.user.id,
          userName: email,
          displayName: email.split("@")[0],
          email: email, // Pass email for storage
        });

        console.log("Passkey registered successfully");

        // If we have a session, user is logged in immediately
        if (signupData.session) {
          toast.success("Account created with passkey! You are now logged in.");
          onSuccess?.();
          onClose();
        } else {
          // Email confirmation might be required
          toast.success(
            "Account created! Please check your email to verify your account. You can then use your passkey to sign in.",
          );
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } catch (passkeyError: any) {
        // If passkey registration fails, account is still created
        // User can still sign in with email/password or register passkey later
        console.error("Passkey registration failed:", passkeyError);
        toast.warning(
          "Account created, but passkey registration failed. You can sign in with email/password and register a passkey later.",
        );
        onClose();
      }
    } catch (error: any) {
      console.error("Passkey signup error:", error);
      toast.error(
        error.message || "Failed to create account with passkey. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeyAuth = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      // Find user by email to get their userId
      const response = await fetch("/api/auth/passkey/find-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Handle network errors (like 404 if endpoint doesn't exist)
      if (!response.ok && response.status === 404) {
        // Check if it's a 404 from the endpoint itself or from Next.js
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          // This is likely a Next.js 404 (endpoint not found)
          throw new Error(
            "Authentication service unavailable. Please try again later or contact support.",
          );
        }
      }

      const data = await response.json();

      // Handle case where user doesn't exist (200 OK with userExists: false)
      if (response.ok && data.userExists === false) {
        // Show informative message (not error) and suggest signing up
        toast.info(
          data.message || "No account found with this email. Please sign up first.",
          {
            action: {
              label: "Sign Up",
              onClick: () => {
                setIsSignUp(true);
              },
            },
          },
        );
        setIsSignUp(true); // Automatically switch to signup mode
        return; // Exit early, don't throw error
      }

      // Handle case where user exists but has no passkeys (404 from our endpoint)
      if (!response.ok) {
        const errorData = data;
        
        // If user exists but has no passkeys, suggest registering one
        if (errorData.userExists && errorData.userId) {
          toast.error(
            "No passkey found for this account. Please register a passkey first.",
          );
          // Switch to signup mode to register passkey
          setIsSignUp(true);
          return; // Don't throw, just switch to signup mode
        }
        
        // Other server errors
        throw new Error(
          errorData.error || "An error occurred. Please try again.",
        );
      }

      // User exists and has passkeys
      const { userId, credentialIds } = data;

      if (!credentialIds || credentialIds.length === 0) {
        throw new Error("No passkeys found for this user");
      }

      // Now authenticate with passkey using the userId and credentialIds
      console.log("Calling authenticate with userId:", userId);
      const authResult = await authenticate(userId, credentialIds);
      console.log("Authentication result:", authResult);

      // The authenticate endpoint returns a token hash to verify
      if (authResult?.success && authResult?.tokenHash) {
        console.log("Verifying token hash to establish session...");
        
        // Verify the token hash to get a session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.verifyOtp({
            token_hash: authResult.tokenHash,
            type: authResult.tokenType || 'signup',
          });

        console.log("Session verification result:", { sessionData, sessionError });

        if (sessionError || !sessionData.session) {
          console.error("Failed to verify token:", sessionError);
          throw new Error("Failed to establish session after passkey authentication");
        }

        console.log("Authentication successful!");
        toast.success("Authenticated with passkey!");
        onSuccess?.();
        onClose();
      } else {
        console.error("Invalid authResult structure:", authResult);
        throw new Error("Invalid response from passkey authentication");
      }
    } catch (error: any) {
      console.error("Passkey auth error:", error);
      toast.error(
        error.message || "Failed to authenticate with passkey. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeyRegister = async () => {
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    try {
      await register({
        userId: user.id,
        userName: user.email || "user",
        displayName: user.email?.split("@")[0] || "User",
        email: user.email || undefined,
      });
      toast.success("Passkey registered successfully!");
    } catch (error: any) {
      // Error already handled in hook
      console.error("Passkey register error:", error);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Prevent multiple submissions
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        // Handle rate limiting specifically
        if (error.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and try again.",
          );
        }
        throw error;
      }
      
      toast.success("Check your email for the magic link!");
    } catch (error: any) {
      const errorMessage =
        error.message || error.error_description || "Failed to send magic link";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1b1c23] mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-500">
            {isSignUp
              ? mode === "passkey" 
                ? "Sign up with passkey to get started"
                : "Sign up to get started"
              : mode === "passkey"
                ? "Sign in with passkey to continue"
                : "Sign in to continue to Slice"}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "email" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("email")}
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          {isPasskeySupported && (
            <Button
              variant={mode === "passkey" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("passkey")}
              className="flex-1"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Passkey
            </Button>
          )}
        </div>

        {/* Email Login Form */}
        {mode === "email" && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c8fff]"
                placeholder="you@example.com"
              />
            </div>

            {!isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c8fff]"
                  placeholder="••••••••"
                />
              </div>
            )}

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c8fff]"
                  placeholder="At least 6 characters"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !email || (!isSignUp && !password) || (isSignUp && password.length < 6)}
              className="w-full bg-[#1b1c23] text-white hover:bg-[#2c2d33] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Loading..."
                : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
            </Button>

            {!isSignUp && (
              <Button
                type="button"
                variant="outline"
                onClick={handleMagicLink}
                disabled={isLoading || !email}
                className="w-full"
              >
                Send Magic Link
              </Button>
            )}

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-sm text-gray-500 hover:text-[#8c8fff]"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </form>
        )}

        {/* Passkey Login */}
        {mode === "passkey" && (
          <div className="space-y-4">
            {!user ? (
              <div className="space-y-4">
                {/* For new users: Register with passkey */}
                {isSignUp ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email (for account creation)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c8fff]"
                        placeholder="you@example.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll create your account and register your passkey
                      </p>
                    </div>
                    <Button
                      onClick={handlePasskeySignup}
                      disabled={isLoading || !email}
                      className="w-full bg-[#1b1c23] text-white hover:bg-[#2c2d33]"
                    >
                      <KeyRound className="w-4 h-4 mr-2" />
                      {isLoading
                        ? "Registering..."
                        : "Register with Passkey"}
                    </Button>
                  </>
                ) : (
                  /* For existing users: Authenticate with passkey */
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c8fff]"
                        placeholder="you@example.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter your email to authenticate with passkey
                      </p>
                    </div>
                    <Button
                      onClick={handlePasskeyAuth}
                      disabled={isLoading || !email}
                      className="w-full bg-[#1b1c23] text-white hover:bg-[#2c2d33]"
                    >
                      <KeyRound className="w-4 h-4 mr-2" />
                      {isLoading
                        ? "Authenticating..."
                        : "Authenticate with Passkey"}
                    </Button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="w-full text-sm text-gray-500 hover:text-[#8c8fff]"
                >
                  {isSignUp
                    ? "Already have an account? Sign in with passkey"
                    : "Don't have a passkey? Sign up"}
                </button>
              </div>
            ) : (
              /* User is already logged in - can register additional passkey */
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  You're already logged in. You can register an additional
                  passkey for this account.
                </p>
                <Button
                  onClick={handlePasskeyRegister}
                  disabled={isLoading}
                  className="w-full bg-[#1b1c23] text-white hover:bg-[#2c2d33]"
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  {isLoading
                    ? "Registering..."
                    : "Register New Passkey"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
