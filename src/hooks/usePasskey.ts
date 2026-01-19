"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  registerPasskey,
  authenticateWithPasskey,
  isWebAuthnSupported,
  type RegistrationOptions,
} from "@/lib/webauthn";
import { createClient } from "@/config/supabase";

const supabase = createClient();

export function usePasskey() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (options: RegistrationOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("usePasskey.register called with:", { 
        userId: options.userId, 
        userName: options.userName,
        email: options.email 
      });

      if (!isWebAuthnSupported()) {
        throw new Error("Passkeys are not supported in this browser");
      }

      console.log("WebAuthn is supported, registering passkey...");
      // Register passkey locally (this will trigger browser dialog)
      const passkeyData = await registerPasskey(options);
      console.log("Passkey data received from browser:", { credentialId: passkeyData.credentialId });

      // Send to server to store via API endpoint
      const response = await fetch("/api/auth/passkey/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: options.userId,
          email: options.email,
          credentialId: passkeyData.credentialId,
          publicKey: passkeyData.publicKey,
          counter: passkeyData.counter,
          deviceName: passkeyData.deviceName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to register passkey");
      }

      const { data } = await response.json();

      toast.success("Passkey registered successfully!");
      return data;
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to register passkey. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = async (userId: string, credentialIds?: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isWebAuthnSupported()) {
        throw new Error("Passkeys are not supported in this browser");
      }

      // If credentialIds are provided, use them directly (for unauthenticated users)
      // Otherwise, fetch from Supabase (for authenticated users managing their passkeys)
      let finalCredentialIds: string[];

      if (credentialIds && credentialIds.length > 0) {
        finalCredentialIds = credentialIds;
      } else {
        // Get user's passkeys from server (requires authentication)
        const { data: passkeys, error: fetchError } = await supabase
          .from("user_passkeys")
          .select("credential_id")
          .eq("user_id", userId);

        if (fetchError) {
          throw fetchError;
        }

        if (!passkeys || passkeys.length === 0) {
          throw new Error("No passkeys found for this user");
        }

        finalCredentialIds = passkeys.map((p) => p.credential_id);
      }

      // Authenticate with passkey
      const authData = await authenticateWithPasskey(finalCredentialIds);

      // Verify with server via API endpoint
      const response = await fetch("/api/auth/passkey/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          credentialId: authData.credentialId,
          signature: authData.signature,
          authenticatorData: authData.authenticatorData,
          clientDataJSON: authData.clientDataJSON,
        }),
      });

      console.log("Authenticate API response status:", response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to authenticate with passkey");
      }

      const result = await response.json();
      console.log("Authenticate API response:", result);

      // The API returns the data directly, not nested in a 'data' property
      // Return the result which should have: { success, userId, email, token }
      return result;
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to authenticate with passkey. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (credentialId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from("user_passkeys")
        .delete()
        .eq("credential_id", credentialId);

      if (deleteError) {
        throw deleteError;
      }

      toast.success("Passkey removed successfully!");
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to remove passkey. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    authenticate,
    remove,
    isLoading,
    error,
    isSupported: isWebAuthnSupported(),
  };
}
