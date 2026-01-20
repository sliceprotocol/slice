/**
 * WebAuthn/Passkeys utility functions
 * Handles registration and authentication of passkeys
 */

export interface PasskeyCredential {
  id: string;
  publicKey: string;
  counter: number;
  deviceName?: string;
}

export interface RegistrationOptions {
  userId: string;
  userName: string;
  displayName: string;
  email?: string; // Optional email for storage in database
}

export interface AuthenticationOptions {
  userId: string;
}

/**
 * Generate registration options for WebAuthn
 */
export async function generateRegistrationOptions(
  userId: string,
  userName: string,
  displayName: string,
): Promise<PublicKeyCredentialCreationOptions> {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);

  return {
    challenge,
    rp: {
      name: "Slice",
      id: window.location.hostname,
    },
    user: {
      id: new TextEncoder().encode(userId),
      name: userName,
      displayName: displayName,
    },
    pubKeyCredParams: [
      { alg: -7, type: "public-key" }, // ES256
      { alg: -257, type: "public-key" }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "preferred",
      requireResidentKey: true,
    },
    timeout: 60000,
    attestation: "direct",
  };
}

/**
 * Register a new passkey
 */
export async function registerPasskey(
  options: RegistrationOptions,
): Promise<{
  credentialId: string;
  publicKey: string;
  counter: number;
  deviceName?: string;
}> {
  if (!window.PublicKeyCredential) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  console.log("Generating passkey registration options...");
  const creationOptions = await generateRegistrationOptions(
    options.userId,
    options.userName,
    options.displayName,
  );

  console.log("Requesting passkey creation from browser...");
  const credential = (await navigator.credentials.create({
    publicKey: creationOptions,
  })) as PublicKeyCredential | null;

  if (!credential) {
    console.error("Browser returned null credential");
    throw new Error("Failed to create passkey");
  }

  console.log("Passkey created successfully by browser");

  const response = credential.response as AuthenticatorAttestationResponse;

  // Extract credential ID and public key
  const credentialId = btoa(
    String.fromCharCode(...new Uint8Array(credential.rawId)),
  );
  const publicKey = btoa(
    String.fromCharCode(...new Uint8Array(response.getPublicKey()!)),
  );

  // Get device name if available
  const deviceName =
    (credential as any).authenticatorAttachment === "platform"
      ? "This Device"
      : "External Device";

  return {
    credentialId,
    publicKey,
    counter: 0,
    deviceName,
  };
}

/**
 * Generate authentication options for WebAuthn
 */
export async function generateAuthenticationOptions(
  credentialIds: string[],
): Promise<PublicKeyCredentialRequestOptions> {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);

  const allowCredentials = credentialIds.map((id) => ({
    id: Uint8Array.from(atob(id), (c) => c.charCodeAt(0)),
    type: "public-key" as const,
  }));

  return {
    challenge,
    allowCredentials,
    timeout: 60000,
    userVerification: "preferred",
    rpId: window.location.hostname,
  };
}

/**
 * Authenticate with a passkey
 */
export async function authenticateWithPasskey(
  credentialIds: string[],
): Promise<{
  credentialId: string;
  signature: string;
  authenticatorData: string;
  clientDataJSON: string;
}> {
  if (!window.PublicKeyCredential) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  const requestOptions = await generateAuthenticationOptions(credentialIds);

  const credential = (await navigator.credentials.get({
    publicKey: requestOptions,
  })) as PublicKeyCredential | null;

  if (!credential) {
    throw new Error("Failed to authenticate with passkey");
  }

  const response = credential.response as AuthenticatorAssertionResponse;

  const credentialId = btoa(
    String.fromCharCode(...new Uint8Array(credential.rawId)),
  );
  const signature = btoa(
    String.fromCharCode(...new Uint8Array(response.signature)),
  );
  const authenticatorData = btoa(
    String.fromCharCode(...new Uint8Array(response.authenticatorData)),
  );
  const clientDataJSON = btoa(
    String.fromCharCode(...new Uint8Array(response.clientDataJSON)),
  );

  return {
    credentialId,
    signature,
    authenticatorData,
    clientDataJSON,
  };
}

/**
 * Check if WebAuthn is supported
 */
export function isWebAuthnSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.PublicKeyCredential !== "undefined"
  );
}
