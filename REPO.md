This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
contracts/
  contracts/
    slice/
      Interfaces/
        ISlice.sol
      MockUSDC.sol
      Slice.sol
      SliceFHE.sol
    FHECounter.sol
  hardhat.config.ts
  package.json
  README.md
src/
  adapters/
    beexo.ts
    web.ts
  app/
    .well-known/
      farcaster.json/
        route.ts
    (disputes)/
      assign-dispute/
        page.tsx
      create/
        page.tsx
      disputes/
        [id]/
          page.tsx
        page.tsx
      join-dispute/
        [id]/
          page.tsx
      loading-disputes/
        [id]/
          page.tsx
    (evidence)/
      category-amount/
        page.tsx
      claimant-evidence/
        [id]/
          page.tsx
      defendant-evidence/
        [id]/
          page.tsx
      manage/
        evidence/
          [id]/
            page.tsx
        page.tsx
    (payments)/
      execute-ruling/
        [id]/
          page.tsx
      pay/
        [id]/
          page.tsx
    (settings)/
      beexo/
        page.tsx
      debug/
        page.tsx
      profile/
        page.tsx
    (voting)/
      my-votes/
        page.tsx
      reveal/
        [id]/
          page.tsx
      vote/
        [id]/
          page.tsx
    api/
      auth/
        route.ts
    globals.css
    layout.tsx
    not-found.tsx
    page.tsx
    providers.tsx
  config/
    app.ts
    chains.ts
    contracts.ts
    tenant.ts
  contexts/
    TimerContext.tsx
  hooks/
    actions/
      useAssignDispute.ts
      useCreateDispute.ts
      useExecuteRuling.ts
      useFaucet.ts
      usePayDispute.ts
      useSendFunds.ts
      useWithdraw.ts
    core/
      useContracts.ts
      useSliceAccount.ts
      useSliceConnect.ts
      useStakingToken.ts
      useTokenBalance.ts
    debug/
      useConsoleLogs.ts
    disputes/
      useAllDisputes.ts
      useDisputeList.ts
      useDisputeParties.ts
      useGetDispute.ts
      useMyDisputes.ts
    evidence/
      useEvidence.ts
    forms/
      useCreateDisputeForm.ts
      useStepBasics.ts
    ui/
      useClickOutside.ts
      usePageSwipe.ts
    user/
      useAddressBook.ts
      useUserProfile.ts
    voting/
      useJurorStats.ts
      useReveal.ts
      useSliceVoting.ts
      useVote.ts
  lib/
    utils.ts
  types/
    xo-connect.d.ts
  util/
    disputeAdapter.ts
    ipfs.ts
    storage.ts
    votingStorage.ts
    votingUtils.ts
    wallet.ts
.env.example
.repomixignore
AGENTS.md
minikit.config.ts
next.config.ts
package.json
README.md
```

# Files

## File: src/app/globals.css
````css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Generic replacements for Stellar components */
:root {
  --primary: #1b1c23;
  --secondary: #8c8fff;
  --bg-color: #f6f7f9;
  --border-radius: 8px;
}

.btn {
  padding: 10px 16px;
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-primary {
  background: var(--primary);
  color: white;
}
.btn-secondary {
  background: var(--secondary);
  color: white;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  margin-top: 5px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.text-lg {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.text-sm {
  font-size: 0.875rem;
  color: #666;
}
````

## File: src/lib/utils.ts
````typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
````

## File: src/util/ipfs.ts
````typescript
import axios from "axios";

// Environment variables for Pinata configuration
const JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;
const GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL!;
const GROUP_ID = process.env.NEXT_PUBLIC_PINATA_GROUP_ID!;

/**
 * Uploads a JSON object to IPFS via Pinata, assigning it to a specific group.
 * * @param content - The JSON object containing dispute data (title, description, etc.)
 * @returns The IPFS Hash (CID) of the pinned content, or null if failed.
 */
export const uploadJSONToIPFS = async (content: any) => {
  try {
    if (!JWT) {
      throw new Error("Pinata JWT is missing in environment variables.");
    }

    // Construct the payload required by Pinata for grouping and metadata
    const payload = {
      pinataContent: content, // The actual data goes here
      pinataMetadata: {
        name: content.title
          ? `Dispute - ${content.title}`
          : "Slice Dispute Data",
        keyvalues: {
          type: "dispute_metadata",
          // You can add more custom key-values here for filtering in Pinata
        },
      },
      pinataOptions: {
        cidVersion: 1, // Recommended for better compatibility
        groupId: GROUP_ID, // Assigns this pin to your specific group
      },
    };

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      payload,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS: ", error);
    return null;
  }
};

/**
 * Uploads a File object to IPFS via Pinata.
 * @param file - The File object to upload.
 * @returns The IPFS Hash (CID) of the pinned file, or null if failed.
 */
export const uploadFileToIPFS = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          // axios automatically sets the multipart boundary
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
      },
    );
    return res.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    return null;
  }
};

/**
 * Fetches JSON data from IPFS using the configured Gateway.
 * * @param ipfsHash - The CID of the content to fetch.
 * @returns The parsed JSON data, or null if failed.
 */
export const fetchJSONFromIPFS = async (ipfsHash: string) => {
  try {
    if (!GATEWAY_URL) {
      throw new Error("IPFS Gateway URL is missing in environment variables.");
    }

    // Ensure the gateway URL ends with a slash
    const baseUrl = GATEWAY_URL.endsWith("/") ? GATEWAY_URL : `${GATEWAY_URL}/`;

    const res = await axios.get(`${baseUrl}ipfs/${ipfsHash}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching from IPFS (${ipfsHash}): `, error);
    return null;
  }
};
````

## File: src/util/storage.ts
````typescript
/**
 * A typed wrapper around localStorage largely borrowed from (but less capable
 * than) https://www.npmjs.com/package/typed-local-store
 *
 * Provides a fully-typed interface to localStorage, and is easy to modify for other storage strategies (i.e. sessionStorage)
 */

/**
 * Valid localStorage key names mapped to an arbitrary value of the correct
 * type. Used to provide both good typing AND good type-ahead, so that you can
 * see a list of valid storage keys while using this module elsewhere.
 */
type Schema = {
  walletId: string;
  walletAddress: string;
  walletNetwork: string;
  networkPassphrase: string;
  contractId: string;
};

/**
 * Typed interface that follows the Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 *
 * Implementation has been borrowed and simplified from https://www.npmjs.com/package/typed-local-store
 */
class TypedStorage<T> {
  private readonly storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public get length(): number {
    return this.storage?.length;
  }

  public key<U extends keyof T>(index: number): U {
    return this.storage?.key(index) as U;
  }

  public getItem<U extends keyof T>(
    key: U,
    retrievalMode: "fail" | "raw" | "safe" = "fail",
  ): T[U] | null {
    const item = this.storage?.getItem(key.toString());

    if (item == null) {
      return item;
    }

    try {
      return JSON.parse(item) as T[U];
    } catch (error) {
      switch (retrievalMode) {
        case "safe":
          return null;
        case "raw":
          return item as unknown as T[U];
        default:
          throw error;
      }
    }
  }

  public setItem<U extends keyof T>(key: U, value: T[U]): void {
    this.storage?.setItem(key.toString(), JSON.stringify(value));
  }

  public removeItem<U extends keyof T>(key: U): void {
    this.storage?.removeItem(key.toString());
  }

  public clear(): void {
    this.storage?.clear();
  }
}

/**
 * Fully-typed wrapper around localStorage
 */
const storageInstance = new TypedStorage<Schema>();
export default storageInstance;
````

## File: src/util/votingStorage.ts
````typescript
interface VoteData {
  vote: number;
  salt: string; // Stored as string to handle BigInt safely
  timestamp: number;
}

/**
 * Generates a unique, collision-resistant storage key.
 * Format: slice_v2_<contract_address>_dispute_<id>_user_<user_address>
 */
export const getVoteStorageKey = (
  contractAddress: string | undefined,
  disputeId: string | number,
  userAddress: string | null | undefined,
): string => {
  // Fallback values prevent crashes if data isn't ready, though logic should prevent this
  const safeContract = contractAddress
    ? contractAddress.toLowerCase()
    : "unknown_contract";
  const safeUser = userAddress ? userAddress.toLowerCase() : "unknown_user";

  return `slice_v2_${safeContract}_dispute_${disputeId}_user_${safeUser}`;
};

/**
 * Saves the vote commitment data (Salt + Vote Choice).
 */
export const saveVoteData = (
  contractAddress: string,
  disputeId: string | number,
  userAddress: string,
  vote: number,
  salt: bigint,
) => {
  if (!contractAddress || !userAddress) return;

  const key = getVoteStorageKey(contractAddress, disputeId, userAddress);
  const data: VoteData = {
    vote,
    salt: salt.toString(), // Convert BigInt to string for JSON serialization
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Slice: Failed to save vote data to LocalStorage", e);
  }
};

/**
 * Retrieves the stored vote data. Returns null if not found.
 */
export const getVoteData = (
  contractAddress: string | undefined,
  disputeId: string | number,
  userAddress: string | null | undefined,
): VoteData | null => {
  if (!contractAddress || !userAddress) return null;

  const key = getVoteStorageKey(contractAddress, disputeId, userAddress);
  const item = localStorage.getItem(key);

  if (!item) return null;

  try {
    return JSON.parse(item) as VoteData;
  } catch (e) {
    console.error("Slice: Error parsing vote data from storage", e);
    return null;
  }
};

/**
 * Boolean check: Did the user vote on *this specific contract instance*?
 */
export const hasLocalVote = (
  contractAddress: string | undefined,
  disputeId: string | number,
  userAddress: string | null | undefined,
): boolean => {
  return !!getVoteData(contractAddress, disputeId, userAddress);
};
````

## File: src/util/votingUtils.ts
````typescript
import { encodePacked, keccak256, toHex, fromHex, toBytes } from "viem";

/**
 * Generate a random identity secret for voting
 */
export function generateIdentitySecret(): bigint {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  // Convert to bigint (taking first 31 bytes to fit in Field if using ZK, though here just random)
  let value = BigInt(0);
  for (let i = 0; i < 31; i++) {
    value = value * BigInt(256) + BigInt(array[i]);
  }
  return value;
}

/**
 * 1. STATIC MESSAGE GENERATOR
 * The message must be identical on every device to produce the same signature/salt.
 */
export function getSaltGenerationMessage(disputeId: string | number): string {
  return `Slice Protocol: Generate secure voting secret for Dispute #${disputeId}. \n\nSign this message to derive your voting salt. This does not cast a vote or cost gas.`;
}

/**
 * 2. DETERMINISTIC SALT DERIVATION
 * Hashes the signature (which is unique to the user + dispute) to create the salt.
 */
export function deriveSaltFromSignature(signature: string): bigint {
  const hash = keccak256(toBytes(signature));
  return BigInt(hash);
}

/**
 * 3. VOTE RECOVERY
 * Brute-force checks if Vote 0 or Vote 1 matches the commitment found on-chain.
 */
export function recoverVote(
  recoveredSalt: bigint,
  onChainCommitment: string, // The hash stored in the contract
): number {
  // Check against Vote 0 (Defender)
  const hash0 = calculateCommitment(0, recoveredSalt);
  if (hash0 === onChainCommitment) return 0;

  // Check against Vote 1 (Claimant)
  const hash1 = calculateCommitment(1, recoveredSalt);
  if (hash1 === onChainCommitment) return 1;

  throw new Error("Signature derived salt does not match on-chain commitment.");
}

/**
 * Calculate commitment: keccak256(vote || salt)
 * Equivalent to Solidity: keccak256(abi.encodePacked(vote, salt))
 */
export function calculateCommitment(vote: number, salt: bigint): string {
  // Viem: Encode packed arguments then hash
  return keccak256(encodePacked(["uint256", "uint256"], [BigInt(vote), salt]));
}

/**
 * Calculate nullifier: hash(identity_secret || salt || proposal_id)
 * Equivalent to Solidity: keccak256(abi.encodePacked(identitySecret, salt, uint64(proposalId)))
 * Returns the nullifier as a 32-byte array (Uint8Array)
 */
export function calculateNullifier(
  identitySecret: bigint,
  salt: bigint,
  proposalId: number,
): Uint8Array {
  // We use uint64 for proposalId based on the original logic (8 bytes)
  const hash = keccak256(
    encodePacked(
      ["uint256", "uint256", "uint64"],
      [identitySecret, salt, BigInt(proposalId)],
    ),
  );

  // Convert hex string back to Uint8Array
  return fromHex(hash, "bytes");
}

/**
 * Convert Uint8Array to hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return toHex(bytes);
}

/**
 * Convert hex string to Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  return fromHex(hex as `0x${string}`, "bytes");
}

/**
 * Convert Uint8Array to Buffer (for Stellar SDK compatibility if needed)
 */
export function bytesToBuffer(bytes: Uint8Array): Buffer {
  return Buffer.from(bytes);
}
````

## File: src/util/wallet.ts
````typescript
import { isAddress } from "viem";

/**
 * Shortens a wallet address to the format 0x1234...5678
 * @param address The full wallet address (or any string)
 * @param chars Number of characters to show at start and end (default 4)
 * @returns Shortened address or original string if not a valid address format
 */
export const shortenAddress = (
  address: string | undefined,
  chars = 4,
): string => {
  if (!address) return "";

  // Use Viem to validate it's a real Ethereum address
  if (!isAddress(address)) {
    // Fallback logic for non-address strings (like names)
    return address.length > 20
      ? `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`
      : address;
  }

  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};
````

## File: next.config.ts
````typescript
import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const isDev = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
  dest: "public",
  disable: isDev,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  transpilePackages: ["xo-connect"],

  // Tells Next.js 16: "I know plugins might be injecting webpack config,
  // but I want to use Turbopack anyway."
  turbopack: {},
};

export default withPWA(nextConfig);
````

## File: contracts/contracts/slice/Interfaces/ISlice.sol
````solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISlice {
    // --- Enums & Structs ---
    enum DisputeStatus {
        Created,
        Commit,
        Reveal,
        Finished
    }

    struct DisputeConfig {
        address claimer;
        address defender;
        string category;
        string ipfsHash;
        uint256 jurorsRequired;
        uint256 paySeconds;
        uint256 evidenceSeconds;
        uint256 commitSeconds;
        uint256 revealSeconds;
    }

    struct Dispute {
        uint256 id;
        address claimer;
        address defender;
        string category;
        uint256 requiredStake;
        uint256 jurorsRequired;
        string ipfsHash;
        // state
        uint256 commitsCount;
        uint256 revealsCount;
        DisputeStatus status;
        bool claimerPaid;
        bool defenderPaid;
        address winner;
        // deadlines
        uint256 payDeadline;
        uint256 evidenceDeadline;
        uint256 commitDeadline;
        uint256 revealDeadline;
    }

    struct JurorStats {
        uint256 totalDisputes;
        uint256 coherentVotes;
        uint256 totalEarnings;
    }

    // --- Events ---
    event DisputeCreated(uint256 indexed id, address claimer, address defender);
    event FundsDeposited(uint256 indexed id, address role, uint256 amount);
    event EvidenceSubmitted(uint256 indexed id, address indexed party, string ipfsHash);
    event JurorJoined(uint256 indexed id, address juror);
    event StatusChanged(uint256 indexed id, DisputeStatus newStatus);
    event VoteCommitted(uint256 indexed id, address juror);
    event VoteRevealed(uint256 indexed id, address juror, uint256 vote);
    event RulingExecuted(uint256 indexed id, address winner);
    event FundsWithdrawn(address indexed user, uint256 amount);

    // --- State Variable Getters ---
    function disputeCount() external view returns (uint256);
    function stakingToken() external view returns (IERC20);
    function MIN_STAKE() external view returns (uint256);
    function MAX_STAKE() external view returns (uint256);

    // --- Mapping Getters ---
    function disputeJurors(uint256 _id, uint256 _index) external view returns (address);
    function commitments(uint256 _id, address _juror) external view returns (bytes32);
    function revealedVotes(uint256 _id, address _juror) external view returns (uint256);
    function hasRevealed(uint256 _id, address _juror) external view returns (bool);
    function balances(address _user) external view returns (uint256);
    function jurorStakes(uint256 _id, address _juror) external view returns (uint256);
    function jurorStats(address _juror) external view returns (uint256 totalDisputes, uint256 coherentVotes, uint256 totalEarnings);

    // --- View Functions ---
    function disputes(uint256 _id) external view returns (Dispute memory);
    function getJurorDisputes(address _user) external view returns (uint256[] memory);
    function getUserDisputes(address _user) external view returns (uint256[] memory);

    // --- Core Functions ---
    function createDispute(DisputeConfig calldata _config) external returns (uint256);
    function submitEvidence(uint256 _id, string calldata _ipfsHash) external;
    function payDispute(uint256 _id) external;
    function joinDispute(uint256 _id, uint256 _amount) external;
    function commitVote(uint256 _id, bytes32 _commitment) external;
    function revealVote(uint256 _id, uint256 _vote, uint256 _salt) external;
    function executeRuling(uint256 _id) external;
    function withdraw() external;
}
````

## File: contracts/contracts/slice/MockUSDC.sol
````solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
````

## File: contracts/contracts/slice/SliceFHE.sol
````solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SliceV2 is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public stakingToken;
    uint256 public stakePerJuror; // This is the stake required when creating a dispute to ask for a certain number of jurors (ej this is 5usd you need it to be 10 to ask for 2 jurors)
    uint256 public disputeCount;

    enum DisputeStatus {
        Created, // Uploading evidence
        Voting, // Voting
        Revealing, // Revealing
        Finished // Finished
    }

    struct Dispute {
        address claimer;
        address defender;
        address[] jurors;
        string ipfsHash;
        DisputeStatus status;
        uint256 stakeRequired;
        uint256 jurorsRequired;
        uint256 payDeadline;
        uint256 evidenceDeadline;
        uint256 commitDeadline;
        uint256 revealDeadline;
        // Vote tracking mappings stored within dispute
        mapping(address => bool) commitments;
        mapping(address => uint256) revealedVotes;
    }

    struct DisputeConfig {
        address claimer;
        address defender;
        uint256 jurorsRequired;
        uint256 paySeconds;
        uint256 evidenceSeconds;
        uint256 commitSeconds;
        uint256 revealSeconds;
    }

    struct UserStats {
        uint256 totalStaked;
        uint256 stakeInDisputes;
        uint256[] activeDisputes;
        uint256[] finishedDisputes; // This can be read from indexer it is not needed on chian
    }

    // Event declarations
    event DisputeCreated(uint256 indexed id, address claimer, address defender);
    event EvidenceSubmitted(uint256 indexed id, address indexed party, string ipfsHash);
    event JurorJoined(uint256 indexed id, address juror);
    event VoteCommitted(uint256 indexed id, address juror, bool commitment);
    event StatusChanged(uint256 indexed id, DisputeStatus newStatus);
    event VoteRevealed(uint256 indexed id, address juror, uint256 vote);
    event Withdrawn(address indexed user, uint256 amount);
    event Staked(address indexed user, uint256 amount);

    mapping(uint256 => Dispute) public disputes; // Dispute id => Dispute
    mapping(address => UserStats) public userStats; // Address => UserStats

    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
    }

    // ===============================
    // =       Core Functions       =
    // ===============================

    function createDispute(DisputeConfig calldata _config) external nonReentrant returns (uint256) {
        require(_config.claimer != address(0), "Claimer cannot be 0 address");
        require(_config.defender != address(0), "Defender cannot be 0 address");
        require(_config.paySeconds > 0, "Pay seconds must be greater than 0");
        require(_config.evidenceSeconds > 0, "Evidence seconds must be greater than 0");
        require(_config.commitSeconds > 0, "Commit seconds must be greater than 0");
        require(_config.revealSeconds > 0, "Reveal seconds must be greater than 0");
        require(msg.sender != _config.defender, "Self-dispute not allowed");
        require(_config.claimer != _config.defender, "Claimer cannot be Defender");
        require(_config.jurorsRequired > 0, "Jurors required must be greater than 0");

        uint256 stakeRequired = stakePerJuror * _config.jurorsRequired;

        // Transfer the stake to the contract
        stakingToken.safeTransferFrom(msg.sender, address(this), stakeRequired);

        disputeCount++;

        // Create the dispute - use storage pointer to initialize nested mappings
        Dispute storage newDispute = disputes[disputeCount];
        newDispute.claimer = _config.claimer;
        newDispute.defender = _config.defender;
        newDispute.ipfsHash = "";
        newDispute.status = DisputeStatus.Created;
        newDispute.stakeRequired = stakeRequired;
        newDispute.jurorsRequired = _config.jurorsRequired;
        newDispute.payDeadline = block.timestamp + _config.paySeconds;
        newDispute.evidenceDeadline = block.timestamp + _config.evidenceSeconds;
        newDispute.commitDeadline = block.timestamp + _config.commitSeconds;
        newDispute.revealDeadline = block.timestamp + _config.revealSeconds;

        userStats[_config.claimer].activeDisputes.push(disputeCount);
        userStats[_config.defender].activeDisputes.push(disputeCount);

        emit DisputeCreated(disputeCount, _config.claimer, _config.defender);

        return disputeCount;
    }

    function submitEvidence(uint256 _id, string calldata _ipfsHash) external {
        Dispute storage dispute = disputes[_id];
        require(dispute.status == DisputeStatus.Created, "Dispute not created");
        require(block.timestamp < dispute.evidenceDeadline, "Evidence deadline passed");
        require(msg.sender == dispute.claimer || msg.sender == dispute.defender, "Not allowed to submit evidence");

        dispute.ipfsHash = _ipfsHash;

        emit EvidenceSubmitted(_id, msg.sender, _ipfsHash);
    }

    function payDispute(uint256 _id) external nonReentrant {}

    function joinDispute(uint256 _id, uint256 _amount) external nonReentrant {
        Dispute storage dispute = disputes[_id];

        require(dispute.status == DisputeStatus.Created, "Dispute not created");
        require(dispute.jurors.length < dispute.jurorsRequired, "Jurors required reached");
        require(msg.sender != dispute.claimer && msg.sender != dispute.defender, "Not allowed to join dispute");

        // Renamed from 'userStats' to 'stats' to avoid shadowing the state variable
        UserStats storage stats = userStats[msg.sender];

        uint256 totalToStake = dispute.stakeRequired;
        require(stats.totalStaked - stats.stakeInDisputes >= totalToStake, "Not enough staked"); // Check if the user has enough staked to join the dispute
        stats.stakeInDisputes += totalToStake;
        stats.activeDisputes.push(_id);

        dispute.jurors.push(msg.sender);
        emit JurorJoined(_id, msg.sender);
    }

    function commitVote(uint256 _id, bool _commitment) external {
        Dispute storage dispute = disputes[_id];

        require(dispute.status == DisputeStatus.Voting, "Dispute not voting");
        require(block.timestamp < dispute.commitDeadline, "Commit deadline passed");
        // The dispute jurors must include the voter

        bool found = false;
        for (uint i = 0; i < dispute.jurors.length; i++) {
            if (dispute.jurors[i] == msg.sender) {
                found = true;
                break;
            }
        }

        require(found, "Not a juror");

        dispute.commitments[msg.sender] = _commitment;

        emit VoteCommitted(_id, msg.sender, _commitment);

        // Note: Cannot check mapping length directly; would require separate counter
        // Manual transition to Revealing phase will be needed via separate function
    }

    // Revealing votes, this wont be needed in the future with Homomorphic encryption
    function revealVote(uint256 _id, uint256 _vote, uint256 _salt) external {
        Dispute storage dispute = disputes[_id];

        require(dispute.status == DisputeStatus.Revealing, "Dispute not revealing");
        require(block.timestamp < dispute.revealDeadline, "Reveal deadline passed");
        require(msg.sender != dispute.claimer && msg.sender != dispute.defender, "Not allowed to reveal vote");
        require(dispute.commitments[msg.sender], "No commitment found");

        dispute.revealedVotes[msg.sender] = _vote;
        emit VoteRevealed(_id, msg.sender, _vote);

        // Note: Cannot check mapping length directly; would require separate counter
        // Manual transition to Finished phase will be needed via separate function
    }

    // Executing the ruling, this will be needed in the future with Homomorphic encryption
    function executeRuling(uint256 _id) external nonReentrant {}

    function _distributeRewards(uint256 _id) internal {
        Dispute storage dispute = disputes[_id];
        require(dispute.status == DisputeStatus.Finished, "Dispute not finished");
        // TODO: Implement reward distribution logic
    }

    function withdraw() external nonReentrant {
        // Renamed from 'userStats' to 'stats' to avoid shadowing the state variable
        UserStats storage stats = userStats[msg.sender];
        require(stats.totalStaked > 0, "No staked");

        // The user can withdraw the amount he has not staked in disputes
        uint256 amountToWithdraw = stats.totalStaked - stats.stakeInDisputes;
        stakingToken.safeTransfer(msg.sender, amountToWithdraw);
        stats.totalStaked = stats.stakeInDisputes;
        emit Withdrawn(msg.sender, amountToWithdraw);
    }

    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");

        // Renamed from 'userStats' to 'stats' to avoid shadowing the state variable
        UserStats storage stats = userStats[msg.sender];

        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);

        stats.totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }

    // View functions
}
````

## File: contracts/contracts/FHECounter.sol
````solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title A simple FHE counter contract
/// @author fhevm-hardhat-template
/// @notice A very basic example contract showing how to work with encrypted data using FHEVM.
contract FHECounter is ZamaEthereumConfig {
    euint32 private _count;

    /// @notice Returns the current count
    /// @return The current encrypted count
    function getCount() external view returns (euint32) {
        return _count;
    }

    /// @notice Increments the counter by a specified encrypted value.
    /// @param inputEuint32 the encrypted input value
    /// @param inputProof the input proof
    /// @dev This example omits overflow/underflow checks for simplicity and readability.
    /// In a production contract, proper range checks should be implemented.
    function increment(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        euint32 encryptedEuint32 = FHE.fromExternal(inputEuint32, inputProof);

        _count = FHE.add(_count, encryptedEuint32);

        FHE.allowThis(_count);
        FHE.allow(_count, msg.sender);
    }

    /// @notice Decrements the counter by a specified encrypted value.
    /// @param inputEuint32 the encrypted input value
    /// @param inputProof the input proof
    /// @dev This example omits overflow/underflow checks for simplicity and readability.
    /// In a production contract, proper range checks should be implemented.
    function decrement(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        euint32 encryptedEuint32 = FHE.fromExternal(inputEuint32, inputProof);

        _count = FHE.sub(_count, encryptedEuint32);

        FHE.allowThis(_count);
        FHE.allow(_count, msg.sender);
    }
}
````

## File: src/adapters/beexo.ts
````typescript
import { createConfig, http, createConnector, CreateConnectorFn } from "wagmi";
import { base } from "wagmi/chains";
import { getAddress } from "viem";

// 1. Custom Connector Logic
const CHAIN_ID_HEX = "0x2105"; // Base Mainnet
const RPC_URL = "https://mainnet.base.org";

function beexoConnector(): CreateConnectorFn {
    return createConnector((config) => ({
        id: "beexo",
        name: "Beexo",
        type: "beexo",

        // 1. Connect Logic
        async connect(_parameters) {
            const { XOConnectProvider } = await import("xo-connect");

            // Instantiate the provider we tested earlier
            const provider = new XOConnectProvider({
                rpcs: { [CHAIN_ID_HEX]: RPC_URL },
                defaultChainId: CHAIN_ID_HEX,
            });

            // Trigger the XOConnect handshake
            const accounts = (await provider.request({
                method: "eth_requestAccounts",
            })) as string[];
            const chainId = (await provider.request({
                method: "eth_chainId",
            })) as string;

            // Return standard Wagmi data
            return {
                accounts: accounts.map((x) => getAddress(x)),
                chainId: parseInt(chainId, 16),
            } as never;
        },

        // 2. Disconnect Logic
        async disconnect() {
            // XOConnect doesn't have a strict disconnect, but Wagmi needs this method
        },

        // 3. Get Accounts
        async getAccounts() {
            const { XOConnectProvider } = await import("xo-connect");
            const provider = new XOConnectProvider({
                rpcs: { [CHAIN_ID_HEX]: RPC_URL },
                defaultChainId: CHAIN_ID_HEX,
            });
            const accounts = (await provider.request({
                method: "eth_accounts",
            })) as string[];
            return accounts.map((x) => getAddress(x));
        },

        // 4. Get Chain ID
        async getChainId() {
            return parseInt(CHAIN_ID_HEX, 16);
        },

        // 5. Provider Passthrough (Crucial!)
        // This tells Wagmi: "Use THIS provider for all contract calls"
        async getProvider() {
            const { XOConnectProvider } = await import("xo-connect");
            return new XOConnectProvider({
                rpcs: { [CHAIN_ID_HEX]: RPC_URL },
                defaultChainId: CHAIN_ID_HEX,
            });
        },

        // 6. Monitor for changes (Optional but good)
        async isAuthorized() {
            try {
                const accounts = await this.getAccounts();
                return !!accounts.length;
            } catch {
                return false;
            }
        },

        onAccountsChanged(accounts) {
            config.emitter.emit("change", {
                accounts: accounts.map((x) => getAddress(x)),
            });
        },
        onChainChanged(chain) {
            config.emitter.emit("change", { chainId: parseInt(chain, 16) });
        },
        onDisconnect() {
            config.emitter.emit("disconnect");
        },
    }));
}


// 2. Export Config
export const beexoConfig = createConfig({
    chains: [base],
    transports: {
        [base.id]: http("https://mainnet.base.org"),
    },
    connectors: [beexoConnector()],
    ssr: true,
});
````

## File: src/adapters/web.ts
````typescript
import { createConfig, http } from "wagmi";
import { activeChains } from "@/config/chains";
import { injected } from "wagmi/connectors";

export const webConfig = createConfig({
    chains: activeChains,
    transports: Object.fromEntries(activeChains.map((chain) => [chain.id, http()])),
    connectors: [injected()],
    ssr: true,
});
````

## File: src/app/.well-known/farcaster.json/route.ts
````typescript
import { withValidManifest } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../../../minikit.config";

export async function GET() {
  return Response.json(withValidManifest(minikitConfig));
}
````

## File: src/app/(disputes)/disputes/page.tsx
````typescript
"use client";

import { DisputesHeader } from "@/components/disputes/DisputesHeader";
import { BalanceCard } from "@/components/disputes/BalanceCard";
import { DisputesList } from "@/components/disputes/DisputesList";

export default function DisputesPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <DisputesHeader />
      <BalanceCard />
      <DisputesList />
    </div>
  );
}
````

## File: src/app/(disputes)/loading-disputes/[id]/page.tsx
````typescript
"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function LoadingDisputesPage() {
  const router = useRouter();
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  useEffect(() => {
    // Reduced to 4000ms (4s) for better UX
    const timer = setTimeout(() => {
      // Navigate to overview of assigned dispute
      router.push(`/disputes/${disputeId}`);
    }, 4000);

    return () => clearTimeout(timer);
  }, [router, disputeId]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center text-center">
        <div className="w-48 h-48 mb-6">
          <video
            src="/animations/loading.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-lg font-medium text-gray-600">
          Setting up case files...
        </p>
      </div>
    </div>
  );
}
````

## File: src/app/(evidence)/claimant-evidence/[id]/page.tsx
````typescript
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { EvidenceView } from "@/components/dispute-overview/EvidenceView";

export default function ClaimantEvidencePage() {
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  return (
    <EvidenceView
      disputeId={disputeId}
      role="claimant"
      prevPath={`/disputes/${disputeId}`} // Back to overview
      nextPath={`/defendant-evidence/${disputeId}`} // Forward to defendant
      pageIndex={1}
    />
  );
}
````

## File: src/app/(evidence)/defendant-evidence/[id]/page.tsx
````typescript
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { EvidenceView } from "@/components/dispute-overview/EvidenceView";

export default function DefendantEvidencePage() {
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  return (
    <EvidenceView
      disputeId={disputeId}
      role="defendant"
      prevPath={`/claimant-evidence/${disputeId}`} // Back to claimant
      nextPath={`/vote/${disputeId}`} // Forward to vote
      pageIndex={2}
    />
  );
}
````

## File: src/app/(settings)/beexo/page.tsx
````typescript
"use client";

import { useState, useEffect } from "react";
import { useConnect, useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";
import { Wallet, Loader2, AlertTriangle, Terminal } from "lucide-react";
import { toast } from "sonner";

export default function BeexoPage() {
  const { connect, connectors } = useConnect();
  const { address, isConnected, chainId } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();

  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    console.log(`[Beexo] ${msg}`);
  };

  // 1. Auto-Connect
  useEffect(() => {
    // We don't need to search by ID anymore, there is likely only 1 connector (Beexo)
    // But we check just to be safe.
    if (
      !isConnected &&
      typeof window !== "undefined" &&
      (window as unknown as Record<string, unknown>)["XOConnect"]
    ) {
      addLog("Auto-connecting to Beexo...");
      const connector = connectors[0]; // Grab the first/only connector
      if (connector) connect({ connector });
    }
  }, [isConnected, connectors, connect]);

  // 2. Debug Logs
  useEffect(() => {
    if (isConnected && address) {
      addLog(`✅ Connected: ${address}`);
      addLog(`🔗 Chain ID: ${chainId} (Expect 8453)`);
      if (chainId !== 8453) addLog("⚠️ WRONG CHAIN DETECTED");
    }
  }, [isConnected, address, chainId]);

  const handleSendTransaction = async () => {
    if (!address) return;
    addLog("Initiating Transaction...");

    try {
      const amount = parseEther("0.00001");
      const to = "0x3AE66a6DB20fCC27F3DB3DE5Fe74C108A52d6F29";

      addLog(`Sending ${formatEther(amount)} ETH on Chain ${chainId}...`);

      const hash = await sendTransactionAsync({
        to,
        value: amount,
      });

      addLog(`✅ Tx Sent! Hash: ${hash}`);
      toast.success("Transaction sent!");
    } catch (err: any) {
      console.error(err);
      addLog(`❌ Tx Error: ${err.shortMessage || err.message}`);
      toast.error("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-manrope">
      {/* Header */}
      <div className="px-6 py-6 bg-white shadow-sm z-10">
        <h1 className="text-2xl font-extrabold text-[#1b1c23] flex items-center gap-2">
          <span className="text-blue-600">Base</span> Integration
        </h1>
        <p className="text-xs font-medium text-gray-400 mt-1">
          Isolated Wagmi Context + Base Mainnet
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
            <Wallet className="w-8 h-8" />
          </div>

          {!isConnected ? (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="w-full py-3.5 bg-[#1b1c23] text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Connected Address
              </span>
              <span className="text-sm font-mono font-bold text-[#1b1c23] bg-gray-100 px-3 py-1 rounded-lg mt-1 break-all">
                {address}
              </span>
              <span className="text-xs font-bold text-gray-400 mt-2">
                Balance:{" "}
                {balanceData ? Number(balanceData.formatted).toFixed(5) : "..."}{" "}
                ETH
              </span>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs text-red-800 leading-relaxed font-medium">
                <strong>CAUTION:</strong> Using Base Mainnet (Chain {chainId}).
              </p>
            </div>
            <button
              onClick={handleSendTransaction}
              disabled={isSending}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Send 0.00001 ETH"
              )}
            </button>
          </div>
        )}

        {/* Debug Log Console */}
        <div className="bg-[#1b1c23] rounded-3xl p-5 flex flex-col gap-3 min-h-[200px]">
          <div className="flex items-center gap-2 text-white/50 border-b border-white/10 pb-2">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Live Logs
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[200px] font-mono text-[10px] space-y-1.5 pr-2">
            {logs.map((log, i) => (
              <div
                key={i}
                className="text-white/80 border-l-2 border-orange-500 pl-2"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/app/api/auth/route.ts
````typescript
import { Errors, createClient } from "@farcaster/quick-auth";
import { NextRequest, NextResponse } from "next/server";

const client = createClient();

export async function GET(request: NextRequest) {
  // Because we're fetching this endpoint via `sdk.quickAuth.fetch`,
  // if we're in a mini app, the request will include the necessary `Authorization` header.
  const authorization = request.headers.get("Authorization");

  // Here we ensure that we have a valid token.
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  try {
    // Now we verify the token. `domain` must match the domain of the request.
    // In our case, we're using the `getUrlHost` function to get the domain of the request
    // based on the Vercel environment. This will vary depending on your hosting provider.
    const payload = await client.verifyJwt({
      token: authorization.split(" ")[1] as string,
      domain: getUrlHost(request),
    });

    // If the token was valid, `payload.sub` will be the user's Farcaster ID.
    // This is guaranteed to be the user that signed the message in the mini app.
    // You can now use this to do anything you want, e.g. fetch the user's data from your database
    // or fetch the user's info from a service like Neynar.
    const userFid = payload.sub;

    // By default, we'll return the user's FID. Update this to meet your needs.
    return NextResponse.json({ userFid });
  } catch (e) {
    if (e instanceof Errors.InvalidTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }

    throw e;
  }
}

function getUrlHost(request: NextRequest) {
  // First try to get the origin from the Origin header
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const url = new URL(origin);
      return url.host;
    } catch (error) {
      console.warn("Invalid origin header:", origin, error);
    }
  }

  // Fallback to Host header
  const host = request.headers.get("host");
  if (host) {
    return host;
  }

  // Final fallback to environment variables
  let urlValue: string;
  if (process.env.VERCEL_ENV === "production") {
    urlValue = process.env.NEXT_PUBLIC_URL!;
  } else if (process.env.VERCEL_URL) {
    urlValue = `https://${process.env.VERCEL_URL}`;
  } else {
    urlValue = "http://localhost:3000";
  }

  const url = new URL(urlValue);
  return url.host;
}
````

## File: src/app/not-found.tsx
````typescript
"use client";

import React from "react";
import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] relative overflow-hidden font-manrope items-center justify-center p-6">
      {/* 1. Ambient Background Glow (Purple) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8c8fff]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. Main Card */}
      <div className="w-full max-w-sm bg-white rounded-[32px] p-8 text-center shadow-[0_20px_60px_-15px_rgba(27,28,35,0.08)] border border-white relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Icon Animation */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#F8F9FC] rounded-full flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-[#8c8fff]/10 rounded-full blur-xl scale-75 group-hover:scale-90 transition-transform duration-500" />
            <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50">
              <FileQuestion className="w-10 h-10 text-[#8c8fff]" />
            </div>
          </div>
        </div>

        {/* 404 Text Layering */}
        <div className="relative mb-8">
          <h1 className="text-8xl font-black text-[#1b1c23] tracking-tighter opacity-[0.03] absolute left-1/2 -translate-x-1/2 -top-8 select-none">
            404
          </h1>
          <h2 className="text-2xl font-extrabold text-[#1b1c23] mb-2 relative z-10">
            Case Not Found
          </h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[260px] mx-auto relative z-10">
            It looks like this file is missing, archived, or never existed in
            the protocol.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/disputes"
            className="w-full py-4 bg-[#1b1c23] text-white rounded-2xl font-bold text-sm shadow-xl shadow-gray-200 hover:bg-[#2c2d33] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full py-4 bg-white border border-gray-100 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
        Slice Protocol
      </div>
    </div>
  );
}
````

## File: src/config/tenant.ts
````typescript
export enum Tenant {
  WEB = "web", // PWA, Localhost (Privy + Base Sepolia)
  BEEXO = "beexo", // Beexo MiniApp (Pure Wagmi + Base Mainnet)
}

export const getTenantFromHost = (host: string | null): Tenant => {
  if (!host) return Tenant.WEB; // Default to Web for safety

  // Handle localhost (remove port)
  const hostname = host.split(":")[0];

  // Strategy Mapping
  if (hostname.startsWith("beexo.") || hostname.startsWith("mini.")) {
    return Tenant.BEEXO;
  }

  // Default Catch-all (app.slicehub.xyz, localhost, etc.)
  return Tenant.WEB;
};
````

## File: src/contexts/TimerContext.tsx
````typescript
"use client";
import React, { createContext, use, useState, useEffect, useRef } from "react";

interface TimerContextType {
  timeInSeconds: number;
  isRunning: boolean;
  startTimer: (initialSeconds: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = use(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

interface TimerProviderProps {
  children: React.ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeInSeconds, setTimeInSeconds] = useState(10 * 60); // 10 minutos por defecto
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Inicializar el timer solo una vez
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      startTimeRef.current = Date.now();
    }

    if (isRunning && timeInSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimeInSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeInSeconds]);

  const startTimer = (initialSeconds: number) => {
    setTimeInSeconds(initialSeconds);
    setIsRunning(true);
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (startTimeRef.current) {
      pausedTimeRef.current = timeInSeconds;
    }
  };

  const resumeTimer = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeInSeconds(10 * 60);
    pausedTimeRef.current = 0;
    startTimeRef.current = null;
  };

  const value = {
    timeInSeconds,
    isRunning,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };

  return <TimerContext value={value}>{children}</TimerContext>;
};
````

## File: src/hooks/actions/useCreateDispute.ts
````typescript
import { useState } from "react";
import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { uploadJSONToIPFS } from "@/util/ipfs";
import { toast } from "sonner";

export function useCreateDispute() {
  const { address } = useAccount();
  const { sliceContract } = useContracts();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [isCreating, setIsCreating] = useState(false);

  const createDispute = async (
    defenderAddress: string,
    claimerAddress: string | undefined, // NEW: Claimer input
    category: string,
    disputeData: {
      title: string;
      description: string;
      evidence?: string[];
    },
    jurorsRequired: number = 3,
    deadlineHours: number = 96,
  ): Promise<boolean> => {
    try {
      setIsCreating(true);

      // Default to connected user if no claimer specified
      const finalClaimer = claimerAddress || address;

      if (!finalClaimer) {
        toast.error("Claimer address required");
        return false;
      }

      // 1. Upload Metadata (Off-chain)
      toast.info("Uploading evidence to IPFS...");
      const ipfsHash = await uploadJSONToIPFS({
        ...disputeData,
        category,
      });

      if (!ipfsHash) throw new Error("Failed to upload to IPFS");

      console.log("IPFS Hash created:", ipfsHash);
      toast.info("Creating dispute on-chain...");

      // 2. Calculate Phase Durations based on Deadline
      // Total duration in seconds (from hours input)
      const totalSeconds = deadlineHours * 60 * 60;

      // Strategy: Split total time into phases
      // Payment: 10% (Minimum 1 hour to allow reaction)
      // Evidence: 40% (Longest period for gathering info)
      // Commit: 25%
      // Reveal: 25%
      const payTime = Math.max(3600, Math.floor(totalSeconds * 0.1));
      const remainingTime = totalSeconds - payTime;

      const evidenceTime = Math.floor(remainingTime * 0.45); // ~40% of total
      const commitTime = Math.floor(remainingTime * 0.275); // ~25% of total
      const revealTime = Math.floor(remainingTime * 0.275); // ~25% of total

      const paySeconds = BigInt(payTime);
      const evidenceSeconds = BigInt(evidenceTime);
      const commitSeconds = BigInt(commitTime);
      const revealSeconds = BigInt(revealTime);

      const hash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "createDispute",
        args: [
          {
            claimer: finalClaimer as `0x${string}`,
            defender: defenderAddress as `0x${string}`,
            category: category,
            ipfsHash: ipfsHash,
            jurorsRequired: BigInt(jurorsRequired),
            paySeconds: paySeconds,
            evidenceSeconds: evidenceSeconds,
            commitSeconds: commitSeconds,
            revealSeconds: revealSeconds,
          },
        ],
      });

      console.log("Creation TX sent:", hash);
      toast.info("Transaction sent. Waiting for confirmation...");

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Dispute created successfully!");
      return true;
    } catch (error: any) {
      console.error("Create dispute failed", error);
      const msg =
        error.reason || error.shortMessage || error.message || "Unknown error";
      toast.error(`Create Failed: ${msg}`);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createDispute, isCreating };
}
````

## File: src/hooks/actions/useExecuteRuling.ts
````typescript
import { useState } from "react";
import { useWriteContract, usePublicClient } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { toast } from "sonner";

export function useExecuteRuling() {
  const { sliceContract } = useContracts();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [isExecuting, setIsExecuting] = useState(false);

  const executeRuling = async (disputeId: string | number) => {
    try {
      setIsExecuting(true);
      console.log(`Executing ruling for dispute #${disputeId}...`);

      const hash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "executeRuling",
        args: [BigInt(disputeId)],
      });

      toast.info("Transaction sent. Waiting for confirmation...");

      // Wait for confirmation so the UI can reload the status immediately after
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Ruling executed successfully!");
      return hash;
    } catch (err: any) {
      console.error("Execution Error:", err);
      const msg =
        err.reason || err.shortMessage || err.message || "Unknown error";
      toast.error(`Execution Failed: ${msg}`);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    executeRuling,
    isExecuting, // Matches the original return name (was isExecuting in view_file)
  };
}
````

## File: src/hooks/actions/useFaucet.ts
````typescript
import { useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";
import { useStakingToken } from "@/hooks/core/useStakingToken";

const MINT_ABI = [
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;

export const useFaucet = () => {
    const { address } = useAccount();
    const {
        address: tokenAddress,
        decimals,
        isLoading: isTokenLoading,
    } = useStakingToken();
    const { writeContractAsync, isPending } = useWriteContract();

    const mint = async () => {
        if (!address || !tokenAddress) return;

        try {
            await writeContractAsync({
                address: tokenAddress,
                abi: MINT_ABI,
                functionName: "mint",
                args: [address, parseUnits("50", decimals)],
            });
            toast.success("Minting 50 USDC...");
        } catch (error) {
            console.error("Mint failed", error);
            toast.error("Failed to mint tokens");
        }
    };

    return {
        mint,
        isPending,
        isReady: !isTokenLoading && !!tokenAddress,
    };
};
````

## File: src/hooks/actions/usePayDispute.ts
````typescript
import { useState } from "react";
import {
  useWriteContract,
  usePublicClient,
  useAccount,
  useChainId,
} from "wagmi";
import { parseUnits, erc20Abi } from "viem";
import { SLICE_ABI, getContractsForChain } from "@/config/contracts";
import { toast } from "sonner";
import { useStakingToken } from "../core/useStakingToken";

export function usePayDispute() {
  const { address } = useAccount();
  const { address: stakingToken, decimals } = useStakingToken();
  const chainId = useChainId();

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"idle" | "approving" | "paying">("idle");

  const payDispute = async (disputeId: string | number, amountStr: string) => {
    if (!address || !publicClient) {
      toast.error("Wallet not connected");
      return false;
    }

    try {
      setLoading(true);

      const { sliceContract } = getContractsForChain(chainId);

      const amountBI = parseUnits(amountStr, decimals);

      // --- STEP 1: APPROVE ---
      setStep("approving");
      toast.info("Approving tokens...");

      // We check allowance first to avoid redundant approval
      const allowance = await publicClient.readContract({
        address: stakingToken,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, sliceContract],
      });

      if (allowance < amountBI) {
        const approveHash = await writeContractAsync({
          address: stakingToken,
          abi: erc20Abi,
          functionName: "approve",
          args: [sliceContract, amountBI],
        });

        // Wait for approval to be mined
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
        toast.success("Approval confirmed.");
      } else {
        console.log("Allowance sufficient, skipping approval.");
      }

      // --- STEP 2: PAY DISPUTE ---
      setStep("paying");
      toast.info("Paying dispute...");

      const payHash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "payDispute",
        args: [BigInt(disputeId)],
      });

      // Wait for payment to be mined
      await publicClient.waitForTransactionReceipt({ hash: payHash });

      toast.success("Payment successful!");
      return true;
    } catch (error: any) {
      console.error("Payment flow failed", error);
      const msg =
        error.reason || error.shortMessage || error.message || "Unknown error";
      toast.error(`Payment failed: ${msg}`);
      return false;
    } finally {
      setLoading(false);
      setStep("idle");
    }
  };

  return {
    payDispute,
    isPaying: loading,
    step,
  };
}
````

## File: src/hooks/actions/useSendFunds.ts
````typescript
"use client";

import { useState } from "react";
import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { parseUnits, erc20Abi, isAddress } from "viem";
import { toast } from "sonner";
import { useStakingToken } from "../core/useStakingToken";

export function useSendFunds(onSuccess?: () => void) {
  const { address } = useAccount();
  const { address: stakingToken, decimals } = useStakingToken();

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);

  const sendFunds = async (recipient: string, amount: string) => {
    // Basic Validation
    if (!address) {
      toast.error("Wallet not connected");
      return;
    }
    if (!isAddress(recipient)) {
      toast.error("Invalid recipient address");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Invalid amount");
      return;
    }

    setIsLoading(true);
    try {
      const value = parseUnits(amount, decimals);

      toast.info("Sending transaction...");

      // Execute
      const hash = await writeContractAsync({
        address: stakingToken,
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipient, value],
      });

      // Wait
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Transfer successful!");
      onSuccess?.();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.reason || err.shortMessage || err.message || "Transaction failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { sendFunds, isLoading };
}
````

## File: src/hooks/actions/useWithdraw.ts
````typescript
"use client";

import { useState } from "react";
import {
  useWriteContract,
  usePublicClient,
  useReadContract,
  useAccount,
} from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "../core/useContracts";
import { toast } from "sonner";
import { formatUnits } from "viem";
import { useStakingToken } from "../core/useStakingToken";

export function useWithdraw() {
  const { address } = useAccount();
  const { sliceContract: SLICE_ADDRESS } = useContracts();
  const {
    address: stakingToken,
    decimals,
    symbol: _symbol,
  } = useStakingToken();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Read claimable balance
  const { data: balance, refetch } = useReadContract({
    address: SLICE_ADDRESS,
    abi: SLICE_ABI,
    functionName: "balances",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const claimableAmount = balance
    ? formatUnits(balance as bigint, decimals)
    : "0";
  const hasFunds = balance ? (balance as bigint) > 0n : false;

  const withdraw = async () => {
    if (!stakingToken) {
      toast.error("Token address not found");
      return;
    }

    try {
      setIsWithdrawing(true);
      toast.info("Initiating withdrawal...");

      const hash = await writeContractAsync({
        address: SLICE_ADDRESS,
        abi: SLICE_ABI,
        functionName: "withdraw",
        args: [stakingToken as `0x${string}`],
      });

      toast.info("Transaction sent...");

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Funds withdrawn successfully!");
      refetch(); // Update balance UI
      return true;
    } catch (err: any) {
      console.error("Withdraw error", err);
      toast.error(`Withdraw failed: ${err.shortMessage || err.message}`);
      return false;
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    withdraw,
    isWithdrawing,
    claimableAmount,
    hasFunds,
    refetchBalance: refetch,
  };
}
````

## File: src/hooks/core/useContracts.ts
````typescript
import { useChainId } from "wagmi";
import { getContractsForChain } from "@/config/contracts";

export function useContracts() {
  // 1. Get the active chain ID from Wagmi
  // - On Beexo, this will automatically be 8453 (Base)
  // - On Web, this will be 84532 (Base Sepolia)
  const chainId = useChainId();

  // 2. Resolve the correct address dynamically
  const { sliceContract, usdcToken } = getContractsForChain(chainId);

  return {
    sliceContract,
    usdcToken,
    chainId,
  };
}
````

## File: src/hooks/core/useSliceAccount.ts
````typescript
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

export const useSliceAccount = () => {
    const { address, isConnected, status } = useAccount();
    const { user, ready, authenticated } = usePrivy();

    // Unified address resolution
    // We prefer the Wagmi address as it's the one used for transactions
    // but fallback to Privy's wallet address if available (e.g. for display in some states)
    const unifiedAddress = address || user?.wallet?.address;

    return {
        address: unifiedAddress,
        isConnected: isConnected || authenticated,
        userId: user?.id,
        status,
        isReady: ready,
    };
};
````

## File: src/hooks/core/useStakingToken.ts
````typescript
import { useReadContract, useReadContracts } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { erc20Abi } from "viem";
import { useContracts } from "./useContracts";

export function useStakingToken() {
  const { sliceContract } = useContracts();

  // Fetch the address from the Slice contract
  const { data: tokenAddress } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "stakingToken",
  });

  // Fetch Metadata (Decimals, Symbol) from the Token contract
  const { data: tokenMetadata, isLoading } = useReadContracts({
    contracts: [
      {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
    query: { enabled: !!tokenAddress },
  });

  return {
    address: tokenAddress as `0x${string}`,
    decimals: tokenMetadata?.[0]?.result ?? 6, // Fallback to 6 (USDC decimals)
    symbol: tokenMetadata?.[1]?.result ?? "TOKEN",
    isLoading,
  };
}
````

## File: src/hooks/core/useTokenBalance.ts
````typescript
import { useReadContract, useAccount } from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { useStakingToken } from "./useStakingToken";

export function useTokenBalance() {
  const { address } = useAccount();
  const { address: stakingToken, decimals } = useStakingToken();

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: stakingToken,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!stakingToken,
    },
  });

  return {
    value: balance, // BigInt
    formatted: balance ? formatUnits(balance, decimals) : "0", // Assuming USDC (6 decimals)
    loading: isLoading,
    refetch,
  };
}
````

## File: src/hooks/debug/useConsoleLogs.ts
````typescript
import { useEffect, useRef, useState } from "react";

export const useConsoleLogs = () => {
	const [logs, setLogs] = useState<
		{ type: string; message: string; time: string }[]
	>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);

	// Keep track of original console methods to restore them later
	const originalLog = useRef<typeof console.log | null>(null);
	const originalError = useRef<typeof console.error | null>(null);
	const originalWarn = useRef<typeof console.warn | null>(null);

	useEffect(() => {
		// Capture ref values to local variables for safe cleanup
		// Capture at effect time to ensure we get the current implementation
		originalLog.current = originalLog.current ?? console.log;
		originalError.current = originalError.current ?? console.error;
		originalWarn.current = originalWarn.current ?? console.warn;

		const originalLogFn = originalLog.current;
		const originalErrorFn = originalError.current;
		const originalWarnFn = originalWarn.current;

		const formatLog = (args: any[]) => {
			return args
				.map((arg) =>
					typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
				)
				.join(" ");
		};

		const addLog = (type: string, args: any[]) => {
			const message = formatLog(args);
			const time = new Date().toLocaleTimeString();
			setLogs((prev) => [...prev.slice(-49), { type, message, time }]); // Keep last 50
		};

		// Override console methods with safety checks
		console.log = (...args) => {
			if (typeof originalLogFn === "function") {
				originalLogFn(...args);
			}
			addLog("log", args);
		};

		console.error = (...args) => {
			if (typeof originalErrorFn === "function") {
				originalErrorFn(...args);
			}
			addLog("error", args);
		};

		console.warn = (...args) => {
			if (typeof originalWarnFn === "function") {
				originalWarnFn(...args);
			}
			addLog("warn", args);
		};

		// Global error handler for unhandled promises/exceptions
		const originalOnError = window.onerror;
		window.onerror = (msg, url, line, col, error) => {
			addLog("error", [`Uncaught: ${msg} @ ${url}:${line}`]);
			// Call original handler if it exists and return false to allow error propagation
			if (typeof originalOnError === "function") {
				return originalOnError(msg, url, line, col, error);
			}
			return false; // Allow error to propagate normally
		};

		// Listen for custom open event
		const handleOpenEvent = () => setIsOpen(true);
		window.addEventListener("open-debug-console", handleOpenEvent);

		return () => {
			// Restore console methods on cleanup using captured variables
			if (typeof originalLogFn === "function") {
				console.log = originalLogFn;
			}
			if (typeof originalErrorFn === "function") {
				console.error = originalErrorFn;
			}
			if (typeof originalWarnFn === "function") {
				console.warn = originalWarnFn;
			}
			// Restore original error handler
			window.onerror = originalOnError;
			window.removeEventListener("open-debug-console", handleOpenEvent);
		};
	}, []);

	const clearLogs = () => setLogs([]);

	return {
		logs,
		isOpen,
		setIsOpen,
		isMinimized,
		setIsMinimized,
		clearLogs,
	};
};
````

## File: src/hooks/disputes/useAllDisputes.ts
````typescript
import { useReadContract, useReadContracts } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { transformDisputeData, type DisputeUI } from "@/util/disputeAdapter";
import { useMemo, useState, useEffect } from "react";
import { useStakingToken } from "../core/useStakingToken";

export function useAllDisputes() {
  const { decimals } = useStakingToken();
  const { sliceContract } = useContracts();
  // 1. Get the total number of disputes
  const { data: countData } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "disputeCount",
  });

  // 2. Calculate the latest 20 IDs (e.g., 50, 49, 48...)
  const calls = useMemo(() => {
    // FIX: Check for undefined explicitly. '0n' is falsy, so !countData triggers incorrectly on 0.
    if (countData === undefined) return [];

    const total = Number(countData);
    if (total === 0) return []; // Explicitly return empty if 0 disputes

    const start = total;
    const end = Math.max(1, total - 20 + 1); // Fetch last 20
    const contracts = [];

    for (let i = start; i >= end; i--) {
      contracts.push({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "disputes",
        args: [BigInt(i)],
      });
    }
    return contracts;
  }, [countData, sliceContract]);

  // 3. Fetch data for those IDs
  const {
    data: results,
    isLoading: isMulticallLoading,
    refetch,
  } = useReadContracts({
    contracts: calls,
    query: { enabled: calls.length > 0 },
  });

  const [disputes, setDisputes] = useState<DisputeUI[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  // 4. Transform Data (IPFS, etc.)
  useEffect(() => {
    async function process() {
      // Immediate exit if we know count is 0
      if (countData !== undefined && Number(countData) === 0) {
        setDisputes([]);
        setIsProcessing(false);
        return;
      }

      if (!results) {
        // Ensure we stop loading if countData is defined (even if 0, though caught above)
        if (!isMulticallLoading && countData !== undefined)
          setIsProcessing(false);
        return;
      }

      setIsProcessing(true);
      const processed = await Promise.all(
        results.map(async (result) => {
          if (result.status !== "success") return null;
          return await transformDisputeData(result.result, decimals);
        }),
      );

      setDisputes(processed.filter((d): d is DisputeUI => d !== null));
      setIsProcessing(false);
    }
    process();
  }, [results, isMulticallLoading, countData, decimals]);

  return { disputes, isLoading: isMulticallLoading || isProcessing, refetch };
}
````

## File: src/hooks/disputes/useDisputeParties.ts
````typescript
import { useMemo } from "react";
import { shortenAddress } from "@/util/wallet";

export function useDisputeParties(dispute: any) {
  return useMemo(() => {
    // 1. Prefer the "Name" (Alias) if available, otherwise fallback to address
    const claimerRaw = dispute?.claimerName || dispute?.claimer;
    const defenderRaw = dispute?.defenderName || dispute?.defender;

    // 2. Use shortenAddress:
    // - If it's a 0x address, it becomes 0x12...34
    // - If it's a real name (e.g. "John Doe"), it stays "John Doe"
    const claimerLabel = shortenAddress(claimerRaw) || "Claimant";
    const defenderLabel = shortenAddress(defenderRaw) || "Defendant";

    return {
      claimer: {
        name: claimerLabel,
        roleLabel: "Claimant",
        avatarUrl: "/images/profiles-mockup/profile-1.jpg",
        themeColor: "blue",
      },
      defender: {
        name: defenderLabel,
        roleLabel: "Defendant",
        avatarUrl: "/images/profiles-mockup/profile-2.jpg",
        themeColor: "gray",
      },
    };
  }, [dispute]);
}
````

## File: src/hooks/disputes/useGetDispute.ts
````typescript
import { useReadContract } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { transformDisputeData, type DisputeUI } from "@/util/disputeAdapter";
import { useState, useEffect } from "react";
import { useStakingToken } from "../core/useStakingToken";
import { useContracts } from "../core/useContracts";

export function useGetDispute(id: string) {
  const { decimals } = useStakingToken();
  const { sliceContract } = useContracts();
  // 1. Fetch raw dispute data from the contract
  const {
    data: rawDispute,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "disputes", // Matches your Solidity mapping
    args: [BigInt(id)],
    query: {
      enabled: !!id, // Only run if ID exists
      staleTime: 5000, // Cache for 5 seconds
    },
  });

  const [transformedDispute, setTransformedDispute] =
    useState<DisputeUI | null>(null);

  // 2. Transform the data using your utility
  // Since transformDisputeData is async (fetches IPFS), we need a useEffect
  useEffect(() => {
    async function load() {
      if (!rawDispute) {
        setTransformedDispute(null);
        return;
      }
      try {
        // We pass the raw result to the transformer we fixed in Step 1
        const transformed = await transformDisputeData(
          {
            ...(rawDispute as any),
            id,
          },
          decimals,
        );
        setTransformedDispute(transformed);
      } catch (e) {
        console.error("Failed to transform dispute data", e);
      }
    }
    load();
  }, [rawDispute, id, decimals]);

  return {
    dispute: transformedDispute,
    loading: isLoading,
    error,
    refetch,
  };
}
````

## File: src/hooks/disputes/useMyDisputes.ts
````typescript
import { useReadContract, useReadContracts, useAccount } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { transformDisputeData, type DisputeUI } from "@/util/disputeAdapter";
import { useMemo, useState, useEffect } from "react";
import { useStakingToken } from "../core/useStakingToken";

export function useMyDisputes() {
  const { address } = useAccount();
  const { decimals } = useStakingToken();
  const { sliceContract } = useContracts();

  // 1. Fetch IDs
  // We rely on the smart contract fix (userDisputes[_config.claimer])
  // so these standard calls will now work correctly.
  const { data: jurorIds, isLoading: loadJuror } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "getJurorDisputes",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: userIds, isLoading: loadUser } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "getUserDisputes",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // 2. Merge & Deduplicate IDs
  const sortedIds = useMemo(() => {
    const jIds = (jurorIds as bigint[]) || [];
    const uIds = (userIds as bigint[]) || [];

    const unique = Array.from(
      new Set([...jIds, ...uIds].map((id) => id.toString())),
    );

    return unique.map(BigInt).sort((a, b) => Number(b) - Number(a));
  }, [jurorIds, userIds]);

  // 3. Prepare Multicall
  const calls = useMemo(() => {
    return sortedIds.map((id) => ({
      address: sliceContract,
      abi: SLICE_ABI,
      functionName: "disputes",
      args: [id],
    }));
  }, [sortedIds, sliceContract]);

  const { data: results, isLoading: loadMulti } = useReadContracts({
    contracts: calls,
    query: { enabled: sortedIds.length > 0 },
  });

  const [disputes, setDisputes] = useState<DisputeUI[]>([]);

  // 4. Transform Data
  useEffect(() => {
    // If results is undefined/null, handle empty state or return
    if (!results) {
      if (!loadMulti && sortedIds.length === 0) setDisputes([]);
      return;
    }

    // FIX: Capture 'results' into a local const to satisfy TypeScript's
    // narrowing inside the async closure below.
    const currentResults = results;

    async function process() {
      const processed = await Promise.all(
        currentResults.map(async (res, idx) => {
          if (res.status !== "success") return null;

          // Inject ID manually to be safe
          const id = sortedIds[idx].toString();

          return await transformDisputeData(
            { ...(res.result as any), id },
            decimals,
          );
        }),
      );
      setDisputes(processed.filter((d): d is DisputeUI => d !== null));
    }
    process();
  }, [results, decimals, sortedIds, loadMulti]);

  return {
    disputes,
    isLoading: loadJuror || loadUser || loadMulti,
  };
}
````

## File: src/hooks/evidence/useEvidence.ts
````typescript
import { useGetDispute } from "@/hooks/disputes/useGetDispute";
import { shortenAddress } from "@/util/wallet";

export type EvidenceRole = "claimant" | "defendant";

export function useEvidence(disputeId: string, role: EvidenceRole) {
  const { dispute } = useGetDispute(disputeId);
  const isClaimant = role === "claimant";

  // 1. Dynamic Party Info
  // Select the correct name based on the role
  const realName = isClaimant
    ? dispute?.claimerName || dispute?.claimer
    : dispute?.defenderName || dispute?.defender;

  const partyInfo = {
    name: realName || "Loading...",
    // Use the specific profile images requested
    // Fallback to shortenAddress if the name looks like a 0x address
    displayName: realName?.startsWith("0x")
      ? shortenAddress(realName)
      : realName,
    avatar: isClaimant
      ? "/images/profiles-mockup/profile-1.jpg"
      : "/images/profiles-mockup/profile-2.jpg",
    role: isClaimant ? "Claimant" : "Defendant",
  };

  // 2. Statement Logic
  let statement = "No statement provided.";

  if (isClaimant) {
    statement = dispute?.description || "No statement provided.";
  } else {
    // For Defender, try to find the specific description, otherwise fallback
    statement = dispute?.defenderDescription
      ? dispute.defenderDescription
      : "The defendant has not submitted a counter-statement text.";
  }

  // 3. Evidence Routing
  // Switch sources based on role
  const rawCarousel = isClaimant
    ? dispute?.carouselEvidence || []
    : dispute?.defenderCarouselEvidence || []; // Use defender specific array

  const rawAudio = isClaimant
    ? dispute?.audioEvidence
    : dispute?.defenderAudioEvidence; // Use defender specific audio

  // Process Images
  const imageEvidence = rawCarousel.map((url: string, i: number) => ({
    id: `img-${i}`,
    type: "image" as const,
    url,
    description: `Exhibit ${i + 1} (${partyInfo.role})`,
    uploadDate: "Attached to case file",
  }));

  // Process Audio
  const audioEvidence = rawAudio
    ? {
        id: `audio-${role}`,
        title: `${partyInfo.role}'s Statement`,
        duration: "Play Audio",
        url: rawAudio,
      }
    : null;

  // Video placeholder (empty for now unless you add video uploads)
  const videoEvidence: any[] = [];

  // Real Carousel (Added to match previous implementation structure if needed)
  const carouselImages = rawCarousel.map((url: string, i: number) => ({
    id: `slide-${i}`,
    url: url,
    description: `Evidence #${i + 1}`,
  }));

  return {
    dispute,
    partyInfo,
    statement,
    imageEvidence,
    videoEvidence,
    audioEvidence,
    carouselImages,
  };
}
````

## File: src/hooks/forms/useCreateDisputeForm.ts
````typescript
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateDispute } from "@/hooks/actions/useCreateDispute";
import { uploadFileToIPFS } from "@/util/ipfs";
import type { CreateDisputeForm, FileState } from "@/components/create";

export const useCreateDisputeForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { createDispute, isCreating } = useCreateDispute();

    const [isUploading, setIsUploading] = useState(false);

    // --- FORM STATE ---
    const [formData, setFormData] = useState<CreateDisputeForm>({
        title: "",
        category: "General",
        jurorsRequired: 3,
        deadlineHours: 96,
        claimerName: "",
        claimerAddress: "",
        defenderName: "",
        defenderAddress: "",
        description: "",
        evidenceLink: "",
        defDescription: "",
    });

    // --- FILE STATE ---
    const [files, setFiles] = useState<FileState>({
        audio: null,
        carousel: [],
        defAudio: null,
        defCarousel: [],
    });

    // --- HANDLERS ---
    const updateField = (
        field: keyof CreateDisputeForm,
        value: string | number,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const submit = async () => {
        if (formData.jurorsRequired % 2 === 0) {
            toast.error("Please select an odd number of jurors.");
            return;
        }

        try {
            setIsUploading(true);

            // 1. Upload Claimant Assets
            let audioUrl = "";
            if (files.audio) {
                toast.info("Uploading claimant audio...");
                const hash = await uploadFileToIPFS(files.audio);
                if (hash) audioUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
            }

            let carouselUrls: string[] = [];
            if (files.carousel.length > 0) {
                toast.info("Uploading claimant photos...");
                const uploadPromises = files.carousel.map((f) => uploadFileToIPFS(f));
                const hashes = await Promise.all(uploadPromises);
                carouselUrls = hashes
                    .filter((h) => h)
                    .map((h) => `https://gateway.pinata.cloud/ipfs/${h}`);
            }

            // 2. Upload Defender Assets
            let defAudioUrl: string | null = null;
            if (files.defAudio) {
                const hash = await uploadFileToIPFS(files.defAudio);
                if (hash) defAudioUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
            }

            let defCarouselUrls: string[] = [];
            if (files.defCarousel.length > 0) {
                const hashes = await Promise.all(
                    files.defCarousel.map((f) => uploadFileToIPFS(f)),
                );
                defCarouselUrls = hashes
                    .filter((h) => h)
                    .map((h) => `https://gateway.pinata.cloud/ipfs/${h}`);
            }

            // 3. Construct Payload
            const disputePayload = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                evidence: formData.evidenceLink ? [formData.evidenceLink] : [],
                aliases: {
                    claimer: formData.claimerName || "Anonymous Claimant",
                    defender: formData.defenderName || "Anonymous Defendant",
                },
                audioEvidence: audioUrl || null,
                carouselEvidence: carouselUrls,
                defenderDescription: formData.defDescription || null,
                defenderAudioEvidence: defAudioUrl,
                defenderCarouselEvidence: defCarouselUrls,
                created_at: new Date().toISOString(),
            };

            const success = await createDispute(
                formData.defenderAddress,
                formData.claimerAddress || undefined,
                formData.category,
                disputePayload,
                formData.jurorsRequired,
                formData.deadlineHours,
            );

            if (success) {
                await queryClient.invalidateQueries({ queryKey: ["disputeCount"] });
                router.push("/profile");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload evidence.");
        } finally {
            setIsUploading(false);
        }
    };

    const isProcessing = isCreating || isUploading;

    return {
        formData,
        files,
        setFiles,
        updateField,
        submit,
        isProcessing,
    };
};
````

## File: src/hooks/ui/useClickOutside.ts
````typescript
import { RefObject, useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
}

export default useClickOutside;
````

## File: src/hooks/ui/usePageSwipe.ts
````typescript
import { useDrag } from "@use-gesture/react";

interface SwipeConfig {
  onSwipeLeft?: () => void; // Next
  onSwipeRight?: () => void; // Back
}

export function usePageSwipe({ onSwipeLeft, onSwipeRight }: SwipeConfig) {
  const bind = useDrag(({ swipe: [swipeX] }) => {
    // swipeX is -1 (left), 1 (right), or 0 (none)
    if (swipeX === -1 && onSwipeLeft) {
      onSwipeLeft();
    } else if (swipeX === 1 && onSwipeRight) {
      onSwipeRight();
    }
  });

  return bind;
}
````

## File: src/hooks/user/useUserProfile.ts
````typescript
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

// Default set of avatars available in the public folder
export const PRESET_AVATARS = [
  "/images/profiles-mockup/profile-1.jpg",
  "/images/profiles-mockup/profile-2.jpg",
  "/images/profiles-mockup/profile-3.jpg",
  "/images/profiles-mockup/profile-4.jpg",
  "/images/profiles-mockup/profile-5.jpg",
  "/images/profiles-mockup/profile-6.jpg",
  "/images/profiles-mockup/profile-7.jpg",
  "/images/profiles-mockup/profile-8.jpg",
  "/images/profiles-mockup/profile-9.jpg",
  "/images/profiles-mockup/profile-10.jpg",
  "/images/profiles-mockup/profile-11.jpg",
  "/images/profiles-mockup/profile-12.jpg",
];

const STORAGE_KEY_PREFIX = "slice_profile_v1_";
const DEFAULT_NAME = "Anonymous Juror";

function getStoredProfile(address: string | undefined): {
  avatar: string;
  name: string;
} {
  if (!address) return { avatar: PRESET_AVATARS[0], name: DEFAULT_NAME };

  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        avatar: parsed.avatar || PRESET_AVATARS[0],
        name: parsed.name || DEFAULT_NAME,
      };
    }
  } catch (_e) {
    console.error("Failed to load user profile");
  }

  return { avatar: PRESET_AVATARS[0], name: DEFAULT_NAME };
}

export function useUserProfile() {
  // Use wagmi's useAccount to get the current user's address for isolation
  const { address } = useAccount();

  // Initialize profile with current address
  const [avatar, setAvatar] = useState<string>(
    () => getStoredProfile(address).avatar,
  );
  const [name, setName] = useState<string>(
    () => getStoredProfile(address).name,
  );

  // Sync profile when address changes
  useEffect(() => {
    const profile = getStoredProfile(address);
    setAvatar((current) =>
      current !== profile.avatar ? profile.avatar : current,
    );
    setName((current) => (current !== profile.name ? profile.name : current));
  }, [address]);

  const updateAvatar = (newUrl: string) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setAvatar(newUrl);
      const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
      const currentData = JSON.parse(localStorage.getItem(key) || "{}");
      localStorage.setItem(
        key,
        JSON.stringify({ ...currentData, avatar: newUrl }),
      );

      toast.success("Profile updated");
    } catch (_e) {
      toast.error("Failed to save profile");
    }
  };

  const updateName = (newName: string) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setName(newName);
      const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
      const currentData = JSON.parse(localStorage.getItem(key) || "{}");
      localStorage.setItem(
        key,
        JSON.stringify({ ...currentData, name: newName }),
      );

      toast.success("Name updated");
    } catch (_e) {
      toast.error("Failed to save name");
    }
  };

  return {
    avatar,
    name,
    updateAvatar,
    updateName,
    availableAvatars: PRESET_AVATARS,
  };
}
````

## File: src/hooks/voting/useJurorStats.ts
````typescript
import { useReadContract, useAccount } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { formatUnits } from "viem";
import { useStakingToken } from "../core/useStakingToken";

export function useJurorStats() {
  const { address } = useAccount();
  const { decimals } = useStakingToken();
  const { sliceContract } = useContracts();

  const { data, isLoading, refetch } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "jurorStats", // New mapping on contract
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Default State
  if (!data || !address) {
    return {
      stats: {
        matches: 0,
        wins: 0,
        earnings: "0",
        accuracy: "0%",
      },
      rank: "Rookie",
      isLoading,
      refetch,
    };
  }

  // Parse Data: struct JurorStats { totalDisputes; coherentVotes; totalEarnings; }
  // Viem/Wagmi can return this as an object (named struct) or array depending on ABI config.
  // Handle both cases safely.
  const raw = data as any;

  // Try object property access first (preferred), fallback to array index
  const matches = Number(raw.totalDisputes ?? raw[0] ?? 0);
  const wins = Number(raw.coherentVotes ?? raw[1] ?? 0);
  const rawEarnings = raw.totalEarnings ?? raw[2] ?? 0n;

  // Calculate Accuracy
  const accuracyVal = matches > 0 ? (wins / matches) * 100 : 0;
  const accuracy = accuracyVal.toFixed(0) + "%";

  // Determine Rank
  let rank = "Rookie";
  if (matches > 5) {
    if (accuracyVal >= 90) rank = "High Arbiter";
    else if (accuracyVal >= 70) rank = "Magistrate";
    else if (accuracyVal >= 50) rank = "Juror";
  }

  return {
    stats: {
      matches,
      wins,
      earnings: formatUnits(rawEarnings, decimals),
      accuracy,
    },
    rank,
    isLoading,
    refetch,
  };
}
````

## File: src/hooks/voting/useReveal.ts
````typescript
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useContracts } from "@/hooks/core/useContracts";
import { useSliceVoting } from "@/hooks/voting/useSliceVoting";
import { useGetDispute } from "@/hooks/disputes/useGetDispute";
import { getVoteData } from "@/util/votingStorage";

export function useReveal(disputeId: string) {
  const { address } = useAccount();
  const { sliceContract } = useContracts();

  const { revealVote, isProcessing, logs } = useSliceVoting();
  const { dispute } = useGetDispute(disputeId);

  const [localVote, setLocalVote] = useState<number | null>(null);
  const [hasLocalData, setHasLocalData] = useState(false);

  // Status flags
  const status = {
    isTooEarly: dispute ? dispute.status < 2 : true,
    isRevealOpen: dispute ? dispute.status === 2 : false,
    isFinished: dispute ? dispute.status > 2 : false,
  };

  useEffect(() => {
    if (address && sliceContract) {
      const stored = getVoteData(sliceContract, disputeId, address);
      if (stored) {
        setLocalVote(stored.vote);
        setHasLocalData(true);
      } else {
        setHasLocalData(false);
      }
    }
  }, [address, disputeId, sliceContract]);

  return {
    dispute,
    localVote,
    hasLocalData,
    status,
    revealVote: () => revealVote(disputeId),
    isProcessing,
    logs,
  };
}
````

## File: src/hooks/voting/useSliceVoting.ts
````typescript
import { useState } from "react";
import { toast } from "sonner";
import {
  useWriteContract,
  usePublicClient,
  useAccount,
  useChainId,
} from "wagmi";
import { getContractsForChain, SLICE_ABI } from "@/config/contracts";
import {
  calculateCommitment,
  deriveSaltFromSignature,
  getSaltGenerationMessage,
  recoverVote,
} from "../../util/votingUtils";
import { useSignMessage } from "wagmi";
import { saveVoteData, getVoteData } from "../../util/votingStorage";

export const useSliceVoting = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string>("");

  const { writeContractAsync } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const chainId = useChainId();
  const { sliceContract } = getContractsForChain(chainId);

  // --- COMMIT VOTE ---
  const commitVote = async (disputeId: string, vote: number) => {
    if (!address || !publicClient) {
      toast.error("Please connect your wallet");
      return false;
    }

    setIsProcessing(true);
    setLogs("Generating secure commitment...");

    try {
      // Generate deterministic salt
      const message = getSaltGenerationMessage(disputeId);
      console.log("[Commit] Salt Message:", message);
      const signature = await signMessageAsync({ message });
      console.log("[Commit] Signature:", signature);

      setLogs("Verifying signature...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const salt = deriveSaltFromSignature(signature);
      console.log("[Commit] Salt:", salt);

      // Generate commitment
      const commitmentHash = calculateCommitment(vote, salt);
      console.log(`Vote: ${vote}, Salt: ${salt}, Hash: ${commitmentHash}`);
      setLogs("Sending commitment to blockchain...");

      console.log("[Commit] Vote to be Committed");
      const hash = await writeContractAsync({
        address: sliceContract as `0x${string}`,
        abi: SLICE_ABI,
        functionName: "commitVote",
        args: [BigInt(disputeId), commitmentHash as `0x${string}`],
      });
      console.log("[Commit] Vote Committed");

      setLogs("Waiting for confirmation...");
      await publicClient.waitForTransactionReceipt({ hash });

      // Save to storage
      saveVoteData(sliceContract, disputeId, address, vote, salt);
      toast.success("Vote committed successfully! Salt saved.");
      setLogs("Commitment confirmed on-chain.");

      return true;
    } catch (error: any) {
      console.error("Commit Error:", error);
      // Handle the specific "User rejected" vs "System error"
      const msg = error.message || "Unknown error";
      if (msg.includes("User rejected")) {
        toast.error("Signature rejected");
      } else {
        toast.error("Failed to commit vote");
      }
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // --- REVEAL VOTE ---
  const revealVote = async (disputeId: string) => {
    if (!address || !publicClient) {
      toast.error("Please connect your wallet");
      return false;
    }

    setIsProcessing(true);
    setLogs("Retrieving secret salt...");

    try {
      let voteToReveal: number;
      let saltToReveal: bigint;

      const storedData = getVoteData(sliceContract, disputeId, address);

      if (storedData) {
        console.log("Found local data");
        voteToReveal = storedData.vote;
        saltToReveal = BigInt(storedData.salt);
      } else {
        setLogs("Local data missing. Recovering from signature...");

        // Ask user to sign the original message again
        const message = getSaltGenerationMessage(disputeId);
        const signature = await signMessageAsync({ message });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        saltToReveal = deriveSaltFromSignature(signature);

        // Fetch the commitment stored on-chain to verify against
        const onChainCommitment = await publicClient.readContract({
          address: sliceContract as `0x${string}`,
          abi: SLICE_ABI,
          functionName: "commitments",
          args: [BigInt(disputeId), address],
        });

        // Recover the vote by checking which option (0 or 1) matches the hash
        voteToReveal = recoverVote(saltToReveal, onChainCommitment as string);
        setLogs("Vote recovered! Revealing...");
      }

      const hash = await writeContractAsync({
        address: sliceContract as `0x${string}`,
        abi: SLICE_ABI,
        functionName: "revealVote",
        args: [BigInt(disputeId), BigInt(voteToReveal), BigInt(saltToReveal)],
        account: address,
      });

      setLogs("Waiting for confirmation...");
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Vote revealed successfully!");
      setLogs("Vote revealed and counted.");
      return true;
    } catch (error: any) {
      console.error("Reveal Error:", error);
      toast.error(`Reveal Failed: ${error.message}`);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { commitVote, revealVote, isProcessing, logs };
};
````

## File: src/types/xo-connect.d.ts
````typescript
declare module "xo-connect" {
  // 1. Define the shape of the Currency and Client objects
  // (Based on the library implementation you shared)
  export interface Currency {
    id: string;
    symbol: string;
    address: string;
    image: string;
    chainId: string; // This is the crucial field for your debugging
  }

  export interface Client {
    _id: string;
    alias: string;
    image: string;
    currencies: Currency[];
  }

  // 2. Define the Singleton Class Interface
  interface XOConnectInterface {
    getClient(): Promise<Client>;
  }

  // 3. Export the Singleton Instance
  // This matches 'export const XOConnect = new _XOConnect();' from the library
  export const XOConnect: XOConnectInterface;

  // 4. Export the Provider (Existing)
  export class XOConnectProvider {
    constructor(config: {
      rpcs: Record<string, string>;
      defaultChainId: string;
    });

    request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  }
}
````

## File: .repomixignore
````
# --- Assets & Binaries ---
assets/
public/
src/app/fonts/
*.png
*.jpg
*.jpeg
*.svg
*.ico
*.woff
*.woff2

# --- Dev Ops & Tooling ---
.github/
.vscode/
.husky/
scripts/
contracts/deploy/
contracts/tasks/
ignition/
test/

# --- Contracts Config Boilerplate ---
.eslintignore
.gitignore
.prettierignore
.prettierrc.yml
.solcover.js
.solhint.json
.solhintignore

# --- Config Boilerplate ---
postcss.config.mjs
tsconfig.json
.eslintrc.json
.eslintrc.yml
eslint.config.mjs
biome.json
components.json
package-lock.json
bun.lockb
yarn.lock
*.backup

# --- Generated / Artifacts ---
# We keep contracts/contracts/ (Solidity) but ignore the frontend JSON ABIs
src/contracts/
out/
artifacts/
cache/
typechain-types/

# --- Frontend Components ---
src/components/
src/components/ui/
src/components/icons/

# --- Documentation ---
docs/
CONTRIBUTING.md
LICENSE
````

## File: src/app/(evidence)/category-amount/page.tsx
````typescript
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SelectAmount } from "@/components/category-amount/SelectAmount";
import { SwipeButton } from "@/components/category-amount/SwipeButton";
import { AlertCircle } from "lucide-react";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";

export default function CategoryAmountPage() {
  const router = useRouter();
  // Default to 5 USDC (middle left option)
  const [selectedAmount, setSelectedAmount] = useState<number>(5);

  const handleSwipeComplete = () => {
    // Pass the selected integer amount (e.g., "50") to the assign page.
    // The useAssignDispute hook will parse this string into USDC units (6 decimals).
    router.push(`/assign-dispute?amount=${selectedAmount.toString()}`);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC]">
      <DisputeOverviewHeader onBack={() => router.back()} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center px-5 py-4 gap-4 overflow-y-auto">
        {/* 2. Main Stake Card */}
        <div className="w-full bg-white rounded-[32px] p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-white flex flex-col items-center justify-center text-center relative overflow-visible">
          {/* Ambient Background Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Animation */}
            <div className="w-[100px] h-[100px] my-4 relative">
              <div className="absolute inset-0 bg-[#8c8fff]/10 rounded-full blur-xl scale-90" />
              <video
                src="/animations/money.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain relative z-10 drop-shadow-sm"
              />
            </div>

            <h1 className="text-2xl font-extrabold text-[#1b1c23] mb-2 font-manrope tracking-tight">
              Choose your stake
            </h1>

            <p className="text-gray-400 text-sm font-medium mb-6 max-w-[260px] leading-relaxed">
              You&apos;ll be matched with disputes in the same reward range.
            </p>

            <div className="w-full">
              <SelectAmount
                selectedAmount={selectedAmount}
                onAmountChange={setSelectedAmount}
              />
            </div>
          </div>
        </div>

        {/* 3. Warning / Info Card */}
        <div className="bg-[#F5F6F9] rounded-[20px] p-4 flex items-start gap-3 border border-[#EAECEF]">
          <div className="shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#8c8fff]">
            <AlertCircle className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-bold text-gray-500 leading-[1.5] mt-0.5 text-left">
            <span className="text-[#1b1c23]">Heads up:</span> Once you start a
            dispute, funds will be locked in the contract until a ruling is
            executed.
          </p>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="px-5 pb-8 flex justify-center shrink-0 z-20">
        <SwipeButton onSwipeComplete={handleSwipeComplete}>
          <span className="font-bold">Find Disputes</span>
        </SwipeButton>
      </div>
    </div>
  );
}
````

## File: src/app/(evidence)/manage/evidence/[id]/page.tsx
````typescript
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWriteContract, usePublicClient } from "wagmi";
import { uploadFileToIPFS } from "@/util/ipfs";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";
import { toast } from "sonner";
import { UploadCloud, Loader2, ArrowRight } from "lucide-react";

export default function SubmitEvidencePage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { sliceContract } = useContracts();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (!file) return toast.error("Please select a file");

    try {
      setIsUploading(true);
      toast.info("Uploading to IPFS...");

      const ipfsHash = await uploadFileToIPFS(file);
      if (!ipfsHash) throw new Error("IPFS Upload failed");

      toast.info("Submitting to blockchain...");

      const hash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "submitEvidence",
        args: [BigInt(id), ipfsHash],
      });

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Evidence submitted successfully!");
      router.back();
    } catch (e: unknown) {
      console.error(e);
      const errorMessage =
        e instanceof Error ? e.message : "Failed to submit evidence";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC]">
      <div className="px-4 pt-4">
        <DisputeOverviewHeader
          onBack={() => router.back()}
          title={`Evidence #${id}`}
        />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center items-center gap-6">
        <div className="w-full max-w-sm bg-white rounded-[32px] p-8 text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <UploadCloud className="w-8 h-8 text-[#8c8fff]" />
          </div>

          <h2 className="text-xl font-bold text-[#1b1c23] mb-2">
            Upload Evidence
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Upload images or documents to support your case. This will be
            visible to all jurors.
          </p>

          <label className="block w-full cursor-pointer">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              accept="image/*,application/pdf"
            />
            <div
              className={`
                w-full py-4 border-2 border-dashed rounded-2xl flex items-center justify-center gap-2 transition-colors
                ${file ? "border-[#8c8fff] bg-[#8c8fff]/5 text-[#8c8fff]" : "border-gray-200 hover:border-gray-300 text-gray-400"}
            `}
            >
              <span className="text-sm font-bold truncate px-4">
                {file ? file.name : "Choose File"}
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={handleSubmit}
          disabled={isUploading || !file}
          className="w-full py-4 bg-[#1b1c23] text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Submit On-Chain <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
````

## File: src/app/(evidence)/manage/page.tsx
````typescript
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useMyDisputes } from "@/hooks/disputes/useMyDisputes";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";
import {
  Plus,
  Loader2,
  FileText,
  Coins,
  Gavel,
  Briefcase,
  UploadCloud,
} from "lucide-react";
import { DisputeUI } from "@/util/disputeAdapter";

export default function DisputeManagerPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { disputes, isLoading } = useMyDisputes();

  // Filter: Only show disputes where I am Claimer or Defender
  const myCases = useMemo(() => {
    if (!address) return [];
    return disputes.filter(
      (d) =>
        d.claimer.toLowerCase() === address.toLowerCase() ||
        d.defender.toLowerCase() === address.toLowerCase(),
    );
  }, [disputes, address]);

  const handleCreate = () => router.push("/create");

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] font-manrope">
      {/* Header */}
      <div className="px-4 pt-4 z-10">
        <DisputeOverviewHeader
          onBack={() => router.back()}
          title="Dispute Manager"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32 pt-6">
        {/* Intro */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#1b1c23]">My Cases</h1>
            <p className="text-sm text-gray-400 font-medium">
              Manage your active disputes
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="w-12 h-12 rounded-full bg-[#1b1c23] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#8c8fff]" />
          </div>
        ) : myCases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No Cases Found</h3>
            <p className="text-xs text-gray-500 max-w-[200px]">
              You haven&apos;t created or been added to any disputes yet.
            </p>
            <button
              onClick={handleCreate}
              className="mt-6 text-[#8c8fff] font-bold text-sm hover:underline"
            >
              Create your first case
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myCases.map((dispute) => (
              <ManagerCaseCard
                key={dispute.id}
                dispute={dispute}
                address={address}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for individual case logic
const ManagerCaseCard = ({
  dispute,
  address,
}: {
  dispute: DisputeUI;
  address?: string;
}) => {
  const router = useRouter();

  // FIX: Store 'now' in state to ensure purity during render
  const [now, setNow] = useState(0);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  // Determine Role
  const isClaimer = dispute.claimer.toLowerCase() === address?.toLowerCase();
  const roleLabel = isClaimer ? "Claimer" : "Defender";

  // Determine Action
  let ActionBtn = null;

  // 1. Unpaid -> Pay
  if (dispute.status === 0) {
    const iPaid = isClaimer ? dispute.claimerPaid : dispute.defenderPaid;
    if (!iPaid) {
      ActionBtn = (
        <button
          onClick={() => router.push(`/pay/${dispute.id}`)}
          className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <Coins className="w-3.5 h-3.5" /> Pay Stake ({dispute.stake} USDC)
        </button>
      );
    } else {
      ActionBtn = (
        <div className="w-full py-3 bg-gray-50 text-gray-400 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Waiting for Opponent
        </div>
      );
    }
  }
  // 2. Active -> Evidence
  // Assuming status 1 (Commit) allows evidence. Check your contract logic.
  // Usually evidence is allowed until 'evidenceDeadline'.
  else if (dispute.status === 1 || dispute.status === 2) {
    // FIX: Use the state-based 'now' instead of calling Date.now() directly
    const canSubmit =
      now > 0 && now / 1000 < (dispute.evidenceDeadline || Infinity);

    if (canSubmit) {
      ActionBtn = (
        <button
          onClick={() => router.push(`/manage/evidence/${dispute.id}`)}
          className="w-full py-3 bg-[#1b1c23] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <UploadCloud className="w-3.5 h-3.5" /> Submit Additional Evidence
        </button>
      );
    }
  }
  // 3. Finished -> Execute
  else if (dispute.status === 3 && dispute.phase === "CLOSED") {
    ActionBtn = (
      <button
        onClick={() => router.push(`/execute-ruling/${dispute.id}`)}
        className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
      >
        <Gavel className="w-3.5 h-3.5" /> Execute Ruling
      </button>
    );
  }

  return (
    <div className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-[10px] font-bold">
              #{dispute.id}
            </span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase">
              {roleLabel}
            </span>
          </div>
          <h3 className="font-bold text-[#1b1c23] line-clamp-1">
            {dispute.title}
          </h3>
        </div>
        <button onClick={() => router.push(`/disputes/${dispute.id}`)}>
          <FileText className="w-5 h-5 text-gray-300 hover:text-[#8c8fff]" />
        </button>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500">
        <div
          className={`w-2 h-2 rounded-full ${dispute.status === 3 ? "bg-emerald-500" : "bg-[#8c8fff]"}`}
        />
        Status: {dispute.phase}
      </div>

      {ActionBtn}
    </div>
  );
};
````

## File: src/app/(payments)/execute-ruling/[id]/page.tsx
````typescript
"use client";

import React, { useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetDispute } from "@/hooks/disputes/useGetDispute";
import { useExecuteRuling } from "@/hooks/actions/useExecuteRuling";
import { SuccessAnimation } from "@/components/SuccessAnimation";
import { usePageSwipe } from "@/hooks/ui/usePageSwipe";
import { Loader2, Wallet, Trophy, Coins, Gavel } from "lucide-react";
import { toast } from "sonner";
import { PaginationDots } from "@/components/dispute-overview/PaginationDots";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";

export default function ExecuteRulingPage() {
  const router = useRouter();
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  const { dispute, refetch } = useGetDispute(disputeId);
  const { executeRuling, isExecuting } = useExecuteRuling();
  const [showSuccess, setShowSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const bindSwipe = usePageSwipe({
    onSwipeRight: () => router.back(),
  });

  const handleExecute = async () => {
    if (!dispute) return;
    if (dispute.status !== 2) {
      toast.error("Dispute is not ready for execution yet.");
      return;
    }
    const success = await executeRuling(disputeId);
    if (success) {
      await refetch();
      setShowSuccess(true);
    }
  };

  const handleAnimationComplete = () => {
    setShowSuccess(false);
    // Redirect to profile where the Withdraw button lives
    toast.info(
      "Ruling executed! You can now withdraw your funds from your Profile.",
    );
    router.push("/profile");
  };

  // --- Logic: Mock Reward Calculation ---
  // TODO! you would fetch the potential reward from the contract view function
  const stakedAmount = "50 USDC";
  const rewardAmount = "+25 USDC"; // The "Gain"
  const totalValue = "75 USDC"; // Total Return
  const isFinished = dispute?.status === 3;

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-screen bg-[#F8F9FC] relative overflow-hidden font-manrope"
      {...bindSwipe()}
    >
      {/* 1. Header (Transparent & Clean) */}
      <DisputeOverviewHeader
        onBack={() => router.back()}
        title="Ruling Phase"
        className="pt-6"
      />

      <div className="flex-1 overflow-y-auto px-6 pb-40 flex flex-col pt-4">
        {/* 2. Hero Section: The "Bag" */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-[32px] bg-[#8c8fff]/10 flex items-center justify-center rotate-3">
              <Wallet className="w-10 h-10 text-[#8c8fff]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1b1c23] rounded-full border-[3px] border-white flex items-center justify-center shadow-lg">
              <Coins className="w-5 h-5 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-[#1b1c23] mb-2 leading-tight">
            {isFinished ? "Ruling Executed" : "Finalize Ruling"}
          </h1>
          <p className="text-sm text-gray-500 font-medium max-w-[260px]">
            {isFinished
              ? "The ruling has been executed. Go to your Profile to withdraw your funds."
              : "Finalize the ruling to unlock funds for withdrawal."}
          </p>
        </div>

        {/* 3. The "Receipt" Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-5 animate-in slide-in-from-bottom-4 duration-500">
          {/* Dispute Context */}
          <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
            {/* Changed Icon to Purple to signify 'Victory/Completion' */}
            <div className="w-10 h-10 rounded-xl bg-[#8c8fff]/10 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-[#8c8fff]" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-semibold text-gray-800 truncate">
                {dispute ? dispute.title : "Loading Case..."}
              </h3>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wide">
                Case #{disputeId}
              </p>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="flex flex-col gap-3">
            {/* Row 1: The Principal (Neutral) */}
            <RewardRow
              label="Returned Stake"
              value={stakedAmount}
              icon={<div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
            />

            {/* Row 2: The Profit (Justice Purple Pop) */}
            <RewardRow
              label="Arbitration Fees Earned"
              value={rewardAmount}
              isHighlight // This triggers the purple styling
              icon={<div className="w-1.5 h-1.5 rounded-full bg-[#8c8fff]" />}
            />
          </div>

          {/* Total Section */}
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                Total Payout
              </span>
              <span className="text-[10px] font-medium text-[#8c8fff]">
                Principal + Rewards
              </span>
            </div>
            <span className="text-xl font-extrabold text-[#1b1c23]">
              {totalValue}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-20 pb-8">
        <div className="max-w-sm mx-auto flex flex-col gap-4">
          {/* Step Dots (Optional context) */}
          <div className="flex justify-center mb-2">
            <PaginationDots currentIndex={3} total={4} />
          </div>

          {isFinished ? (
            <button
              onClick={() => router.push("/profile")}
              className="w-full py-4 px-6 bg-[#1b1c23] border border-gray-200 text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-[#2c2d33] transition-all flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              <span>Go to Profile to Withdraw</span>
            </button>
          ) : (
            <button
              onClick={() => void handleExecute()}
              disabled={isExecuting || !dispute || dispute.status !== 2}
              className={`
                 w-full py-4 px-6 rounded-2xl font-semibold tracking-wide transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(140,143,255,0.4)]
                 flex items-center justify-center gap-2
                 ${
                   isExecuting
                     ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                     : "bg-[#1b1c23] text-white hover:scale-[1.02] active:scale-[0.98]"
                 }
               `}
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>PROCESSING...</span>
                </>
              ) : (
                <>
                  <Gavel className="w-4 h-4" />
                  <span>EXECUTE RULING</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {showSuccess && <SuccessAnimation onComplete={handleAnimationComplete} />}
    </div>
  );
}

// --- Helper Component for the "Receipt" ---
const RewardRow = ({
  label,
  value,
  icon,
  isHighlight = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  isHighlight?: boolean;
}) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-2.5">
      {icon}
      <span className="font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
        {label}
      </span>
    </div>
    <span
      className={`font-semibold ${isHighlight ? "text-[#8c8fff]" : "text-[#1b1c23]"}`}
    >
      {value}
    </span>
  </div>
);
````

## File: src/app/(payments)/pay/[id]/page.tsx
````typescript
"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { User, Coins } from "lucide-react";

import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";
import { SwipeButton } from "@/components/category-amount/SwipeButton";
import { usePayDispute } from "@/hooks/actions/usePayDispute";
import { useGetDispute } from "@/hooks/disputes/useGetDispute";

export default function PayDisputePage() {
  const router = useRouter();
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  const { payDispute, isPaying } = usePayDispute();
  const { dispute, refetch } = useGetDispute(disputeId);
  const { address } = useAccount();

  // Derive stakeAmountDisplay directly from dispute
  const stakeAmountDisplay = dispute?.stake || "Loading...";

  useEffect(() => {
    if (dispute && dispute.status > 0) {
      // Check Status: If status > 0 (Created), payment is already done
      router.replace("/profile");
    }
  }, [dispute, router]);

  const handleBack = () => {
    router.back();
  };

  const handleSwipeComplete = async () => {
    if (!dispute) return;
    const success = await payDispute(disputeId, stakeAmountDisplay);

    if (success) {
      refetch(); // Refresh local state
      router.push("/profile");
    }
  };

  // Helper to determine role
  const userRole =
    dispute?.claimer?.toLowerCase() === address?.toLowerCase()
      ? "Claimer"
      : dispute?.defender?.toLowerCase() === address?.toLowerCase()
        ? "Defender"
        : "Observer";

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] relative overflow-hidden font-manrope">
      {/* --- Ambient Background Glow --- */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8c8fff]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="px-4 pt-2 z-10 flex-none">
        <DisputeOverviewHeader onBack={handleBack} />
      </div>

      {/* Main Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-40 z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(27,28,35,0.08)] border border-white relative text-center">
          {/* Hero Animation */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-[#F8F9FC] rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[#8c8fff]/10 rounded-full blur-xl scale-75" />
              <video
                src="/animations/money.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover relative z-10 scale-90"
              />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-[#1b1c23] mb-2 tracking-tight">
            Fund Dispute #{disputeId}
          </h1>

          {/* Details Box */}
          <div className="bg-[#F8F9FC] rounded-2xl p-5 w-full mb-6 border border-gray-100/50">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200/50">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Your Role
              </span>
              <span className="text-sm text-[#1b1c23] font-bold">
                {userRole}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" /> Required Stake
              </span>
              <span className="text-lg text-[#8c8fff] font-black">
                {stakeAmountDisplay} USDC
              </span>
            </div>
          </div>

          <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-[260px] mx-auto">
            Both parties must deposit the required stake for the dispute to
            proceed to the voting phase.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action Area */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-2 pb-8 pt-6 bg-gradient-to-t from-[#F8F9FC] via-[#F8F9FC] to-transparent">
        {/* Swipe Button */}
        <div className="mt-2">
          {isPaying ? (
            <div className="w-[192px] h-10 bg-[#1b1c23] text-white rounded-[14px] font-bold text-xs flex items-center justify-center gap-2 shadow-lg animate-pulse">
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <SwipeButton onSwipeComplete={() => void handleSwipeComplete()}>
              Fund {stakeAmountDisplay} USDC
            </SwipeButton>
          )}
        </div>
      </div>
    </div>
  );
}
````

## File: src/app/(settings)/profile/page.tsx
````typescript
"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Users, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {ContactsView} from "@/components/profile/ContactsView";
import {SettingsView} from "@/components/profile/SettingsView";
import {ProfileOverview} from "@/components/profile/ProfileOverview";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] overflow-hidden">
      {/* --- Sticky Header --- */}
      <div className="w-full px-6 pt-10 pb-2 flex items-center justify-between bg-[#F8F9FC]/90 backdrop-blur-md z-30 shrink-0">
        <button
          onClick={() => router.push("/disputes")}
          className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm border border-gray-100 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[#1b1c23]" />
        </button>
        <span className="font-manrope font-extrabold text-lg text-[#1b1c23]">
          My Profile
        </span>
        <div className="w-10" />
      </div>

      {/* --- Shadcn Tabs Architecture --- */}
      <Tabs
        defaultValue="overview"
        className="flex flex-col flex-1 overflow-hidden"
      >
        {/* Navigation Pills */}
        <div className="px-6 py-2 shrink-0 z-20">
          <TabsList className="w-full bg-white h-auto p-1 rounded-2xl border border-gray-200 shadow-sm flex">
            <TabsTrigger
              value="overview"
              className="flex-1 gap-2 rounded-xl py-2.5 data-[state=active]:bg-[#1b1c23] data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-bold text-xs text-gray-500"
            >
              <User className="w-4 h-4" />
              Overview
            </TabsTrigger>

            <TabsTrigger
              value="contacts"
              className="flex-1 gap-2 rounded-xl py-2.5 data-[state=active]:bg-[#1b1c23] data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-bold text-xs text-gray-500"
            >
              <Users className="w-4 h-4" />
              Contacts
            </TabsTrigger>

            <TabsTrigger
              value="settings"
              className="flex-1 gap-2 rounded-xl py-2.5 data-[state=active]:bg-[#1b1c23] data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-bold text-xs text-gray-500"
            >
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pt-2 scrollbar-hide">
          <TabsContent
            value="overview"
            className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <ProfileOverview />
          </TabsContent>

          <TabsContent
            value="contacts"
            className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <ContactsView />
          </TabsContent>

          <TabsContent
            value="settings"
            className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <SettingsView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
````

## File: src/app/(voting)/my-votes/page.tsx
````typescript
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Gavel,
  Eye,
  Loader2,
  ArrowLeft,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Coins,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { useSliceConnect } from "@/hooks/core/useSliceConnect";
import { useAccount } from "wagmi";
import { useMyDisputes } from "@/hooks/disputes/useMyDisputes";

export default function MyVotesPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { connect } = useSliceConnect();

  const { disputes, isLoading } = useMyDisputes();

  const tasks = disputes.filter(
    (d) =>
      d.phase === "VOTE" ||
      d.phase === "REVEAL" ||
      (d.phase === "WITHDRAW" && d.status === 2),
  );

  const handleAction = (task: any) => {
    if (task.phase === "VOTE") router.push(`/vote/${task.id}`);
    else if (task.phase === "REVEAL") router.push(`/reveal/${task.id}`);
    else if (task.phase === "WITHDRAW")
      router.push(`/execute-ruling/${task.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FC] font-manrope pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8c8fff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="pt-10 px-6 pb-6 bg-[#F8F9FC]/90 backdrop-blur-md z-20 sticky top-0 border-b border-gray-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm active:scale-95 text-[#1b1c23]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-black text-[#1b1c23] tracking-tight">
              Your Missions
            </h1>
          </div>
          {tasks.length > 0 && (
            <div className="bg-[#8c8fff] text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-[#8c8fff]/30">
              {tasks.length} Pending
            </div>
          )}
        </div>
      </div>

      <div className="px-5 w-full flex flex-col gap-6 mt-2 relative z-10">
        {!address ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <Wallet className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-[#1b1c23]">
              Sync Your Profile
            </h3>
            <button
              onClick={() => connect()}
              className="mt-6 px-8 py-3.5 bg-[#1b1c23] text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-200"
            >
              Connect Wallet
            </button>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#8c8fff]" />
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">
              Fetching Disputes...
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-28 h-28 bg-gradient-to-tr from-white to-[#F0F2F5] rounded-full flex items-center justify-center mb-6 border-[6px] border-[#F8F9FC] shadow-xl">
              <CheckCircle2 className="w-12 h-12 text-[#8c8fff]" />
            </div>
            <h3 className="text-2xl font-black text-[#1b1c23] tracking-tight">
              All Clear!
            </h3>
            <p className="text-base text-gray-500 mt-2 max-w-[240px] mx-auto font-medium">
              Great job. You have no pending actions at the moment.
            </p>
            <button
              onClick={() => router.push("/disputes")}
              className="mt-8 px-6 py-3.5 bg-white border border-gray-100 text-[#1b1c23] rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
            >
              Browse Active Cases
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 pb-10">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                onClick={() => handleAction(task)}
                className="group relative bg-white rounded-[28px] p-1 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_-5px_rgba(140,143,255,0.15)] transition-all duration-300 cursor-pointer active:scale-[0.98] animate-in slide-in-from-bottom-4 fade-in fill-mode-forwards"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute left-0 top-8 bottom-8 w-1.5 rounded-r-full ${
                    task.phase === "VOTE"
                      ? "bg-[#8c8fff]"
                      : task.phase === "REVEAL"
                        ? "bg-[#1b1c23]"
                        : "bg-emerald-500"
                  }`}
                />

                <div className="pl-6 pr-5 py-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-[#8c8fff] uppercase tracking-widest bg-[#8c8fff]/10 px-2 py-1 rounded-md">
                      {task.category}
                    </span>
                    {task.isUrgent && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-full animate-pulse">
                        <ShieldAlert className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <h4 className="font-extrabold text-lg text-[#1b1c23] leading-tight line-clamp-2">
                        {task.title}
                      </h4>
                      <div className="mt-1.5 flex items-center gap-2 text-xs font-bold text-gray-400">
                        <span className="font-mono text-gray-300">
                          #{task.id}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 text-[#8c8fff]" />
                          {task.stake} USDC Stake
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8c8fff]/20 to-transparent" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-xl ${
                          task.phase === "VOTE"
                            ? "bg-[#8c8fff]/10 text-[#8c8fff]"
                            : task.phase === "REVEAL"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {task.phase === "VOTE" ? (
                          <Gavel className="w-4 h-4" />
                        ) : task.phase === "REVEAL" ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <Zap className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                          Deadline
                        </span>
                        <span
                          className={`text-xs font-black ${
                            task.isUrgent ? "text-rose-500" : "text-[#1b1c23]"
                          }`}
                        >
                          {task.deadlineLabel}
                        </span>
                      </div>
                    </div>

                    <button
                      className={`
                        pl-5 pr-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-2 transition-all duration-300
                        ${
                          task.phase === "VOTE"
                            ? "bg-[#1b1c23] hover:bg-[#32363f]"
                            : task.phase === "REVEAL"
                              ? "bg-[#8c8fff] hover:bg-[#7a7de0] shadow-[#8c8fff]/20"
                              : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                        }
                      `}
                    >
                      {task.phase === "REVEAL"
                        ? "Reveal Vote"
                        : task.phase === "WITHDRAW"
                          ? "Claim Rewards"
                          : "Cast Vote"}
                      <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
````

## File: src/app/(voting)/reveal/[id]/page.tsx
````typescript
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Eye,
  RefreshCw,
  AlertTriangle,
  Clock,
  Lock,
  Gavel,
} from "lucide-react";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";
import { TimerCard } from "@/components/dispute-overview/TimerCard";
import { PaginationDots } from "@/components/dispute-overview/PaginationDots";
import { SuccessAnimation } from "@/components/SuccessAnimation";
import { DisputeCandidateCard } from "@/components/disputes/DisputeCandidateCard";
import { VsBadge } from "@/components/disputes/VsBadge";
import { useReveal } from "@/hooks/voting/useReveal";
import { usePageSwipe } from "@/hooks/ui/usePageSwipe";
import { useDisputeParties } from "@/hooks/disputes/useDisputeParties";

export default function RevealPage() {
  const router = useRouter();
  const { id: disputeId } = useParams() as { id: string };
  const [showSuccess, setShowSuccess] = useState(false);

  // Hook handles logic & state
  const {
    dispute,
    localVote,
    hasLocalData,
    status,
    revealVote,
    isProcessing,
    logs,
  } = useReveal(disputeId || "1");

  const parties = useDisputeParties(dispute);
  const bindSwipe = usePageSwipe({
    onSwipeRight: () => router.push(`/vote/${disputeId}`),
  });

  const handleRevealClick = async () => {
    if (await revealVote()) setShowSuccess(true);
  };

  const handleAnimationComplete = () => {
    setShowSuccess(false);
    router.push("/disputes");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC]" {...bindSwipe()}>
      {/* 1. Header */}
      <div className="flex-none z-10 bg-[#F8F9FC]/80 backdrop-blur-md">
        <DisputeOverviewHeader onBack={() => router.back()} />
        <TimerCard />
      </div>

      {/* 2. Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-40 pt-2 scrollbar-hide">
        <div className="flex flex-col gap-6 max-w-sm mx-auto h-full">
          {/* STATE 1: TOO EARLY */}
          {status.isTooEarly && (
            <div className="flex flex-col items-center justify-center flex-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[400px]">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center relative border border-gray-200">
                <Clock className="w-10 h-10 text-gray-400" />
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#1b1c23] rounded-full flex items-center justify-center border-[3px] border-white">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="text-center space-y-3 px-4">
                <h3 className="text-xl font-extrabold text-[#1b1c23]">
                  Reveal Phase Locked
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-bold max-w-[260px] mx-auto">
                  The court is still accepting votes. Please wait for the
                  deadline to pass.
                </p>
              </div>
            </div>
          )}

          {/* STATE 2: REVEAL OPEN */}
          {status.isRevealOpen && (
            <div className="flex flex-col gap-5 h-full animate-in fade-in">
              <div className="flex justify-between items-end px-1 mt-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#1b1c23] leading-tight">
                    Reveal
                    <br />
                    Your Vote
                  </h2>
                  <p className="text-xs font-bold text-gray-400 mt-1">
                    Confirm your secret decision on-chain.
                  </p>
                </div>
                {!hasLocalData && (
                  <div className="bg-red-50 text-red-500 p-2 rounded-xl border border-red-100 animate-pulse">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
              </div>

              {!hasLocalData && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-start gap-3 shadow-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-xs uppercase tracking-wide">
                      Missing Secret Keys
                    </span>
                    <span className="text-xs leading-relaxed opacity-90">
                      We couldn't find your local vote data. Did you vote on
                      this device?
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 relative flex-1">
                <div className="relative z-10">
                  <DisputeCandidateCard
                    type="reveal"
                    partyInfo={parties.claimer}
                    isSelected={localVote === 1}
                    isDimmed={hasLocalData && localVote !== 1}
                  />
                  <VsBadge />
                </div>

                <DisputeCandidateCard
                  type="reveal"
                  partyInfo={parties.defender}
                  isSelected={localVote === 0}
                  isDimmed={hasLocalData && localVote !== 0}
                />
              </div>

              {isProcessing && (
                <div className="mx-auto flex items-center gap-2 text-[10px] font-bold text-[#8c8fff] animate-pulse bg-white px-4 py-2 rounded-full shadow-sm border border-[#8c8fff]/20">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>{logs || "Decrypting & Verifying..."}</span>
                </div>
              )}
            </div>
          )}

          {/* STATE 3: FINISHED */}
          {status.isFinished && (
            <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center animate-in fade-in duration-500 min-h-[400px]">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-2 border border-gray-200">
                <Gavel className="w-10 h-10 text-gray-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#1b1c23]">
                  Dispute Closed
                </h3>
                <p className="text-xs text-gray-500 font-bold px-8 max-w-xs mx-auto">
                  The ruling has been executed. Check your portfolio for
                  results.
                </p>
              </div>
              <button
                onClick={() => router.push(`/disputes/${disputeId}`)}
                className="mt-4 px-8 py-4 bg-white border border-gray-200 text-[#1b1c23] rounded-2xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all active:scale-95"
              >
                Return to Overview
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer Action */}
      {status.isRevealOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-5 z-20 flex justify-center pb-8 bg-gradient-to-t from-white via-white/95 to-transparent">
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="mb-2">
              <PaginationDots currentIndex={3} total={4} />
            </div>
            <button
              onClick={() => void handleRevealClick()}
              disabled={isProcessing || !hasLocalData}
              className={`w-full py-4 px-6 rounded-2xl font-manrope font-semibold tracking-wide transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(27,28,35,0.2)] flex items-center justify-center gap-2 ${isProcessing || !hasLocalData ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" : "bg-[#1b1c23] text-white hover:scale-[1.02] active:scale-[0.98]"}`}
            >
              {isProcessing ? (
                <>
                  {" "}
                  <RefreshCw className="w-4 h-4 animate-spin" />{" "}
                  <span>REVEALING...</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Eye className="w-4 h-4" /> <span>REVEAL VOTE</span>{" "}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {!status.isRevealOpen && (
        <div className="fixed bottom-8 left-0 right-0 z-20">
          <PaginationDots currentIndex={3} total={4} />
        </div>
      )}

      {showSuccess && <SuccessAnimation onComplete={handleAnimationComplete} />}
    </div>
  );
}
````

## File: src/app/(voting)/vote/[id]/page.tsx
````typescript
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { RefreshCw, Scale, Home, Eye, ArrowRight, Lock } from "lucide-react";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";
import { TimerCard } from "@/components/dispute-overview/TimerCard";
import { PaginationDots } from "@/components/dispute-overview/PaginationDots";
import { SuccessAnimation } from "@/components/SuccessAnimation";
import { DisputeCandidateCard } from "@/components/disputes/DisputeCandidateCard";
import { VsBadge } from "@/components/disputes/VsBadge";
import { useVote } from "@/hooks/voting/useVote";
import { usePageSwipe } from "@/hooks/ui/usePageSwipe";
import { useDisputeParties } from "@/hooks/disputes/useDisputeParties";

export default function VotePage() {
  const router = useRouter();
  const { id: disputeId } = useParams() as { id: string };
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    dispute,
    selectedVote,
    hasCommittedLocally,
    isRefreshing,
    isProcessing,
    isCommitDisabled,
    isRevealDisabled,
    handleVoteSelect,
    handleCommit,
    handleRefresh,
  } = useVote(disputeId || "1");

  const parties = useDisputeParties(dispute);

  const bindSwipe = usePageSwipe({
    onSwipeRight: () => router.push(`/defendant-evidence/${disputeId}`),
  });

  const onCommitClick = async () => {
    const success = await handleCommit();
    if (success) {
      /* Success is typically handled by toast or UI update */
    }
  };

  const handleAnimationComplete = () => {
    setShowSuccess(false);
    router.push("/disputes");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC]" {...bindSwipe()}>
      {/* 1. Header */}
      <div className="flex-none z-10 bg-[#F8F9FC]/80 backdrop-blur-md">
        <DisputeOverviewHeader onBack={() => router.back()} />
        <TimerCard />
      </div>

      {/* 2. Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-40 pt-2 scrollbar-hide">
        <div className="flex flex-col gap-6 max-w-sm mx-auto h-full">
          {/* Title Area */}
          <div className="flex justify-between items-end px-1 mt-2">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1b1c23] leading-tight">
                Make your judgement
              </h2>
              <p className="text-xs font-bold text-gray-400 mt-1">
                Review evidence and select a winner.
              </p>
            </div>
            <button
              onClick={() => void handleRefresh()}
              disabled={isRefreshing || isProcessing}
              className="p-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-[#8c8fff] active:scale-90 transition-transform hover:bg-gray-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          {/* Voting Cards */}
          <div className="flex flex-col gap-5 relative flex-1 min-h-[320px]">
            <div className="relative z-10">
              <DisputeCandidateCard
                type="vote"
                partyInfo={parties.claimer}
                isSelected={selectedVote === 1}
                isDisabled={hasCommittedLocally}
                onClick={() => handleVoteSelect(1)}
              />
              <VsBadge />
            </div>

            <DisputeCandidateCard
              type="vote"
              partyInfo={parties.defender}
              isSelected={selectedVote === 0}
              isDisabled={hasCommittedLocally}
              onClick={() => handleVoteSelect(0)}
            />
          </div>

          {/* Notifications */}
          {isProcessing && (
            <div className="mx-auto flex items-center gap-2 text-[10px] font-bold text-[#8c8fff] animate-pulse bg-white px-4 py-2 rounded-full shadow-sm border border-[#8c8fff]/20">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>SECURING VOTE ON-CHAIN...</span>
            </div>
          )}

          {hasCommittedLocally && (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 mx-auto w-full">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#1b1c23]">
                  Vote Secured
                </h4>
                <p className="text-xs text-gray-500 font-medium leading-tight">
                  Your decision is encrypted. You must reveal it in the next
                  phase.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white/95 to-transparent z-20 flex justify-center pb-8">
        <div className="w-full max-w-sm flex flex-col gap-4">
          <div className="mb-2">
            <PaginationDots currentIndex={3} total={4} />
          </div>

          {!hasCommittedLocally ? (
            <button
              onClick={() => void onCommitClick()}
              disabled={isCommitDisabled}
              className={`w-full py-4 px-6 rounded-2xl font-manrope font-semibold tracking-wide transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(27,28,35,0.2)] flex items-center justify-center gap-2 ${isCommitDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" : "bg-[#1b1c23] text-white hover:scale-[1.02] active:scale-[0.98]"}`}
            >
              {isProcessing ? (
                <>
                  {" "}
                  <RefreshCw className="w-4 h-4 animate-spin" />{" "}
                  <span>COMMITTING...</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Scale className="w-4 h-4" /> <span>VOTE</span>{" "}
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() =>
                isRevealDisabled
                  ? router.push("/disputes")
                  : router.push(`/reveal/${disputeId}`)
              }
              className={`w-full py-4 px-6 rounded-2xl font-manrope font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${isRevealDisabled ? "bg-white text-[#1b1c23] border border-gray-200 shadow-sm hover:bg-gray-50" : "bg-[#1b1c23] text-white shadow-[0_8px_20px_-6px_rgba(27,28,35,0.2)] hover:scale-[1.02]"}`}
            >
              {isRevealDisabled ? (
                <>
                  {" "}
                  <Home className="w-4 h-4" /> <span>RETURN HOME</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Eye className="w-4 h-4" /> <span>GO TO REVEAL</span>{" "}
                  <ArrowRight className="w-4 h-4" />{" "}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {showSuccess && <SuccessAnimation onComplete={handleAnimationComplete} />}
    </div>
  );
}
````

## File: src/config/app.ts
````typescript
// === Privy
export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
export const PRIVY_CLIENT_ID = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!;
export const PRIVY_JWKS_ENDPOINT = process.env.NEXT_PUBLIC_PRIVY_JWKS_ENDPOINT!;
export const PRIVY_SECRET = process.env.PRIVY_SECRET!;

// === Pinata
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
export const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET!;
export const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL!;
export const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;
export const PINATA_GROUP_ID = process.env.NEXT_PUBLIC_PINATA_GROUP_ID!;

// === Constants
export enum DISPUTE_STATUS {
    CREATED = 0,
    COMMIT = 1,
    REVEAL = 2,
    RESOLVED = 3
}

// === Contacts
export interface Contact {
  name: string;
  address: string;
  avatar?: string; // Optional visual helper
}

// Available avatar images for contact selection
export const AVAILABLE_AVATARS = [
  "/images/profiles-mockup/profile-1.jpg",
  "/images/profiles-mockup/profile-2.jpg",
  "/images/profiles-mockup/profile-3.jpg",
  "/images/profiles-mockup/profile-4.jpg",
  "/images/profiles-mockup/profile-5.jpg",
  "/images/profiles-mockup/profile-6.jpg",
  "/images/profiles-mockup/profile-7.jpg",
  "/images/profiles-mockup/profile-8.jpg",
  "/images/profiles-mockup/profile-9.jpg",
  "/images/profiles-mockup/profile-10.jpg",
  "/images/profiles-mockup/profile-11.jpg",
  "/images/profiles-mockup/profile-12.jpg",
];

// You can expand this later to load from LocalStorage or an API
export const PRELOADED_CONTACTS: Contact[] = [
  {
    name: "John Claimer",
    address: "0xa2a3523faed7d26fe8cc791c7077a99c96ef2edd",
    avatar: "/images/profiles-mockup/profile-1.jpg",
  },
  {
    name: "Jane Defender",
    address: "0xfe26c7555707e7353958447cf72c628552c0abb2",
    avatar: "/images/profiles-mockup/profile-2.jpg",
  },
  {
    name: "Bob Claimer",
    address: "0x3AE66a6DB20fCC27F3DB3DE5Fe74C108A52d6F29",
    avatar: "/images/profiles-mockup/profile-3.jpg",
  },
  {
    name: "Alice Defender",
    address: "0x58609c13942F56e17d36bcB926C413EBbD10e477",
    avatar: "/images/profiles-mockup/profile-4.jpg",
  },
];
````

## File: src/hooks/actions/useAssignDispute.ts
````typescript
import { useState } from "react";
import {
  useWriteContract,
  usePublicClient,
  useAccount,
  useChainId,
} from "wagmi";
import { erc20Abi, parseUnits, parseEventLogs } from "viem";
import { SLICE_ABI, getContractsForChain } from "@/config/contracts";
import { toast } from "sonner";
import { useStakingToken } from "../core/useStakingToken";

export function useAssignDispute() {
  const [isDrawing, setIsDrawing] = useState(false);
  const { address: stakingToken, decimals, symbol } = useStakingToken();
  const { address } = useAccount();
  const chainId = useChainId();

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const { sliceContract } = getContractsForChain(chainId);

  // New "Draw" Logic - Replaces findActiveDispute + joinDispute
  const drawDispute = async (amount: string): Promise<number | null> => {
    if (!address || !publicClient || !sliceContract) {
      toast.error("Wallet not connected");
      return null;
    }

    try {
      setIsDrawing(true);
      const amountToStake = parseUnits(amount, decimals);

      console.log(`[Draft] Staking: ${amount} ${symbol} (${amountToStake})`);

      // 1. Check & Approve Allowance
      const allowance = await publicClient.readContract({
        address: stakingToken,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, sliceContract],
      });

      if (allowance < amountToStake) {
        toast.info("Approving Stake...");
        const approveHash = await writeContractAsync({
          address: stakingToken,
          abi: erc20Abi,
          functionName: "approve",
          args: [sliceContract, amountToStake],
        });
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
        toast.success("Approval confirmed.");
      }

      // 2. Execute Draw
      toast.info("Entering the Draft Pool...");
      const hash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "drawDispute",
        args: [amountToStake],
      });

      toast.info("Drafting in progress...");

      // 3. Wait for Receipt & Parse Logs
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Parse the 'JurorJoined' event to find which ID we got
      const logs = parseEventLogs({
        abi: SLICE_ABI,
        eventName: "JurorJoined",
        logs: receipt.logs,
      });

      if (logs.length > 0) {
        // The event args: { id, juror }
        const assignedId = Number(logs[0].args.id);
        toast.success(`Drafted into Dispute #${assignedId}!`);
        return assignedId;
      } else {
        // Fallback if event isn't found (rare)
        toast.warning(
          "Draft complete, but could not detect ID. Check your profile.",
        );
        return null;
      }
    } catch (error: unknown) {
      console.error("Draft failed", error);
      const err = error as { shortMessage?: string; message?: string };
      const msg = err.shortMessage || err.message || "Unknown error";
      toast.error(`Draft failed: ${msg}`);
      return null;
    } finally {
      setIsDrawing(false);
    }
  };

  return {
    drawDispute,
    isLoading: isDrawing,
    isReady: !!address,
  };
}
````

## File: src/hooks/core/useSliceConnect.ts
````typescript
import { usePrivy } from "@privy-io/react-auth";
import { useDisconnect } from "wagmi";

export const useSliceConnect = () => {
  const { login, logout: privyLogout } = usePrivy();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const connect = async () => {
    login();
  };

  const disconnect = async () => {
    // 1. Try Privy Logout (Server-side session kill)
    // We wrap this in a try/catch so a 400 error (missing token) doesn't stop execution
    try {
      await privyLogout();
    } catch (e) {
      console.warn("Privy logout warning (session might be already inactive):", e);
    }

    // 2. Force Wagmi Disconnect (Client-side wallet kill)
    // This is crucial for MetaMask to update the UI (isConnected: false)
    wagmiDisconnect();
  };

  return {
    connect,
    disconnect,
  };
};
````

## File: src/hooks/forms/useStepBasics.ts
````typescript
import { useState } from "react";

import {CreateDisputeForm} from "@/components/create";

type TimeUnit = "days" | "hours";

interface UseStepBasicsProps {
    data: CreateDisputeForm;
    updateField: (field: keyof CreateDisputeForm, value: string | number) => void;
}

export const useStepBasics = ({ data, updateField }: UseStepBasicsProps) => {
    const [timeUnit, setTimeUnit] = useState<TimeUnit>("days");
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);

    // Convert hours to display value based on unit
    const getDisplayValue = () => {
        if (timeUnit === "days") {
            return Math.floor(data.deadlineHours / 24);
        }
        return data.deadlineHours;
    };

    // Update hours when slider changes
    const handleTimeChange = (value: number) => {
        if (timeUnit === "days") {
            updateField("deadlineHours", value * 24);
        } else {
            updateField("deadlineHours", value);
        }
    };

    // When switching units, adjust the value to stay within bounds
    const handleUnitChange = (newUnit: TimeUnit) => {
        setTimeUnit(newUnit);
        if (newUnit === "days") {
            // Round to nearest day, ensure at least 1 day
            const days = Math.max(1, Math.round(data.deadlineHours / 24));
            updateField("deadlineHours", Math.min(days * 24, 168));
        }
    };

    const sliderMin = timeUnit === "days" ? 1 : 1;
    const sliderMax = timeUnit === "days" ? 7 : 24;
    const sliderStep = timeUnit === "days" ? 1 : 1;

    // Calculate phase durations for display (in hours)
    const totalHours = data.deadlineHours;
    const payHours = Math.max(1, Math.round(totalHours * 0.1));
    const remainingHours = totalHours - payHours;
    const evidenceHours = Math.round(remainingHours * 0.45);
    const votingHours = Math.round(remainingHours * 0.55);

    // Format hours to days/hours string
    const formatDuration = (hours: number) => {
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            const remainingHrs = hours % 24;
            if (remainingHrs === 0) {
                return `${days} day${days > 1 ? "s" : ""}`;
            }
            return `${days}d ${remainingHrs}h`;
        }
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    };

    return {
        timeUnit,
        isTimelineOpen,
        setIsTimelineOpen,
        getDisplayValue,
        handleTimeChange,
        handleUnitChange,
        sliderMin,
        sliderMax,
        sliderStep,
        payHours,
        evidenceHours,
        votingHours,
        formatDuration,
    };
};
````

## File: src/hooks/user/useAddressBook.ts
````typescript
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PRELOADED_CONTACTS, Contact } from "@/config/app";

const STORAGE_KEY = "slice_address_book_v1";

export function useAddressBook() {
  // Initialize with System contacts
  const [contacts, setContacts] = useState<Contact[]>(PRELOADED_CONTACTS);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge: System Contacts + User Contacts (Deduplicated by address)
        const combined = [...PRELOADED_CONTACTS, ...parsed].filter(
          (contact, index, self) =>
            index ===
            self.findIndex(
              (c) => c.address.toLowerCase() === contact.address.toLowerCase(),
            ),
        );
        setContacts(combined);
      }
    } catch (e) {
      console.error("Failed to load address book", e);
    }
  }, []);

  const addContact = (name: string, address: string, avatar?: string) => {
    if (!name || !address) return;

    const newContact: Contact = { name, address, avatar };

    setContacts((prev) => {
      // Avoid duplicates
      const others = prev.filter(
        (c) => c.address.toLowerCase() !== address.toLowerCase(),
      );
      const updated = [...others, newContact]; // Add new to end

      // Persist ONLY user contacts (filter out system ones to save space)
      const userContacts = updated.filter(
        (c) => !PRELOADED_CONTACTS.some((pc) => pc.address === c.address),
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userContacts));

      return updated;
    });

    toast.success(`Saved "${name}" to contacts`);
  };

  const removeContact = (address: string) => {
    // Prevent deleting system contacts
    if (
      PRELOADED_CONTACTS.some(
        (c) => c.address.toLowerCase() === address.toLowerCase(),
      )
    ) {
      toast.error("Cannot delete system contact.");
      return;
    }

    setContacts((prev) => {
      const updated = prev.filter(
        (c) => c.address.toLowerCase() !== address.toLowerCase(),
      );

      const userContacts = updated.filter(
        (c) => !PRELOADED_CONTACTS.some((pc) => pc.address === c.address),
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userContacts));

      return updated;
    });

    toast.success("Contact removed");
  };

  return { contacts, addContact, removeContact };
}
````

## File: src/hooks/voting/useVote.ts
````typescript
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useGetDispute } from "@/hooks/disputes/useGetDispute";
import { useSliceVoting } from "@/hooks/voting/useSliceVoting";
import { useAccount, useChainId } from "wagmi";
import { getVoteData } from "@/util/votingStorage";
import { getContractsForChain } from "@/config/contracts";

import { DISPUTE_STATUS } from "@/config/app";

export function useVote(disputeId: string) {
  const chainId = useChainId();
  const { address } = useAccount();
  const { sliceContract } = getContractsForChain(chainId);

  // Local state
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [hasCommittedLocally, setHasCommittedLocally] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Contract & Data hooks
  const { dispute, refetch } = useGetDispute(disputeId);
  const { commitVote, isProcessing, logs } = useSliceVoting();

  // Load vote from local storage
  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      const stored = getVoteData(sliceContract, disputeId, address);

      if (stored) {
        setHasCommittedLocally(true);
        setSelectedVote(stored.vote);
      } else {
        setHasCommittedLocally(false);
        setSelectedVote(null);
      }
    }
  }, [address, disputeId, sliceContract]);

  // Actions
  const handleVoteSelect = useCallback(
    (vote: number) => {
      if (hasCommittedLocally) return;
      setSelectedVote((prevVote) => (prevVote === vote ? null : vote));
    },
    [hasCommittedLocally],
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [refetch]);

  const handleCommit = useCallback(async () => {
    if (selectedVote === null) return false;

    const success = await commitVote(disputeId, selectedVote);

    if (success) {
      setHasCommittedLocally(true);
      toast.success("Vote committed! Refreshing status...");
      await handleRefresh();
      return true;
    }
    return false;
  }, [disputeId, selectedVote, commitVote, handleRefresh]);

  // Derived State
  const currentStatus = dispute?.status;
  const isCommitPhase = currentStatus === DISPUTE_STATUS.COMMIT;
  const isRevealPhase = currentStatus === DISPUTE_STATUS.REVEAL;

  const isCommitDisabled =
    isProcessing ||
    selectedVote === null ||
    hasCommittedLocally ||
    !isCommitPhase;

  const isRevealDisabled = !isRevealPhase;

  return {
    dispute,
    selectedVote,
    hasCommittedLocally,
    isRefreshing,
    isProcessing,
    logs,
    isCommitPhase,
    isRevealPhase,
    isCommitDisabled,
    isRevealDisabled,
    handleVoteSelect,
    handleCommit,
    handleRefresh,
  };
}
````

## File: AGENTS.md
````markdown
# Slice Protocol – Developer & Agent Guidelines

This document defines the architectural rules, development standards, and technical constraints for the Slice Protocol frontend and smart contract system.

---

## Architectural Principles

### 1. Multi-Tenant Strategy Pattern

This application runs across multiple environments (PWA, Beexo, Base MiniApp) using a single codebase.

> **Rule:** Do **not** use conditional logic inside UI components (e.g., `if (isBeexo)` or `if (isMiniApp)`).

#### Design Requirements

**Abstraction Layer**  
All wallet interactions must go through a dedicated adapter layer and a single unified provider component. UI components must never talk directly to wallet SDKs or RPC providers.

**Tenant Detection**  
Tenants are detected using request metadata (such as host, origin, or runtime signals) and resolved before any wallet or chain logic is initialized.

**Strategies**
- **Web / PWA** → `Privy + Wagmi` (Smart Wallets via ERC-4337)
- **Beexo** → `Wagmi` with injected `xo-connect` provider (EIP-1193)

---

### 2. State Management

**On-chain data**  
Use **Wagmi v2** hooks:
- `useReadContract`
- `useWriteContract`

Combined with **TanStack Query** for caching and synchronization.

**Local state**  
Use typed LocalStorage helpers for temporary client-side data (for example commit-reveal salts and voting metadata).

**Client / Server separation**
- `wagmi` hooks → **Client Components only** (`"use client"`)
- Server Components → layout, static data, or configuration only

---

## Tech Stack & Standards

- **Framework:** Next.js 16 (App Router)
- **Blockchain interaction:** Viem + Wagmi v2
  > Do **not** use Ethers.js.
- **Styling:** Tailwind CSS + shadcn/ui
  - **UI rule:** Avoid `text-sm` for body copy in embedded contexts (MiniApps)
  - Prefer `text-base` for readability
- **Authentication:**
  - Privy → Web / PWA / Base
  - Injected providers → Beexo

### Required Standards

- **ERC-4337** → Account Abstraction (PWA users)
- **EIP-1193** → Provider interface (Beexo integration)
- **EIP-712** → Typed data signing (when applicable)

---

## Development Workflows

### 1. Running the App

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

- **Standard mode:** http://localhost:3000
- **Beexo simulation:**
  - Inject a compatible provider in the browser, or
  - Mock the `Host` header to trigger Beexo tenant detection

---

### 2. Smart Contract Development

```bash
cd contracts

# Compile
pnpm hardhat compile

# Deploy to Base Sepolia
pnpm hardhat deploy --network baseSepolia
```

---

### 3. IPFS & Evidence Handling

Dispute metadata is stored on IPFS using **Pinata**.

**Rules:**
- Always use the shared IPFS utility module provided by the application to ensure consistent metadata formatting and error handling.
  ```
  src/util/ipfs.ts
  ```
- Evidence JSON must match the `DisputeUI` interface used by the frontend to guarantee correct decoding and rendering.
  ```
  src/util/disputeAdapter.ts
  ```

---

## Coding Conventions

### Component Rules

1. **Wallet-agnostic**  
   Components must consume `useAccount` or `useSliceAccount` and never depend on connection method.

2. **Strict typing**  
   Use `DisputeUI` for all frontend dispute representations.

3. **Error handling**  
   Use `sonner` for user-facing notifications:
   ```ts
   toast.error("Message")
   ```

---

### Commit Messages

Follow **Conventional Commits**:

```text
feat(adapter): add lemon wallet support
fix(voting): resolve salt generation issue
style(ui): update font sizes for mobile
chore(contracts): recompile abis
```

---

## Environment Configuration

> **DO NOT COMMIT SECRETS**

The application requires several environment variables for:
- Runtime mode selection (development vs production)
- Authentication providers
- IPFS / storage backends
- Blockchain network configuration and contract addresses

These values must be provided via your local environment configuration mechanism and deployment platform secrets.

---

**This file is authoritative. Any architectural change must update this document.**
````

## File: src/app/(disputes)/assign-dispute/page.tsx
````typescript
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAssignDispute } from "@/hooks/actions/useAssignDispute";
import { Shuffle, Loader2, AlertCircle } from "lucide-react";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";

export default function AssignDisputePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "50";

  const { drawDispute, isLoading, isReady } = useAssignDispute();
  const [hasDrafted, setHasDrafted] = useState(false);
  const [draftFailed, setDraftFailed] = useState(false);
  const initialized = useRef(false);

  // Auto-trigger the draft process when page loads and wallet is ready
  useEffect(() => {
    if (!isReady || initialized.current || hasDrafted) return;

    const runDraft = async () => {
      initialized.current = true; // Prevent double-fire
      setDraftFailed(false);

      const disputeId = await drawDispute(amount);

      if (disputeId) {
        setHasDrafted(true);
        // Redirect to the success/details page for that specific dispute
        router.replace(`/join-dispute/${disputeId}`);
      } else {
        // Handle failure (stay on page to allow retry)
        setDraftFailed(true);
        initialized.current = false;
      }
    };

    runDraft();
  }, [isReady, drawDispute, amount, router, hasDrafted]);

  const handleRetry = () => {
    setDraftFailed(false);
    initialized.current = false;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-4">
      <DisputeOverviewHeader onBack={() => router.back()} />

      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        {draftFailed ? (
          /* STATE: DRAFT FAILED */
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-2">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-lg font-bold text-[#1b1c23]">
              Draft Unsuccessful
            </h2>
            <p className="text-gray-500 max-w-[260px]">
              We couldn&apos;t assign you to a dispute. There may be no open
              cases, or the transaction was rejected.
            </p>
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-[#1b1c23] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        ) : isLoading || !hasDrafted ? (
          /* STATE: DRAFTING ANIMATION */
          <>
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-4 mx-auto relative overflow-hidden">
              {/* Cool shuffling animation */}
              <div className="absolute inset-0 bg-indigo-500/10 animate-[spin_3s_linear_infinite]" />
              <Shuffle className="w-10 h-10 text-indigo-600 animate-pulse relative z-10" />
            </div>
            <h2 className="text-xl font-bold text-[#1b1c23]">
              {isReady
                ? "Entering the Jury Pool..."
                : "Connecting to Network..."}
            </h2>
            <p className="text-gray-500 px-8 max-w-[300px]">
              {isReady ? (
                <>
                  We are randomly selecting a case for you based on your stake
                  of <b>{amount} USDC</b>.
                </>
              ) : (
                "Establishing secure connection to the protocol..."
              )}
            </p>
          </>
        ) : (
          /* STATE: SUCCESS (Ideally we redirect fast enough to not see this much) */
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        )}
      </div>
    </div>
  );
}
````

## File: src/app/(disputes)/create/page.tsx
````typescript
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  UploadCloud,
  User,
  Gavel,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

import { useCreateDisputeForm } from "@/hooks/forms/useCreateDisputeForm";
import { Button } from "@/components/ui/button";

// Import Modular Components
import {
  WizardProgress,
  StepBasics,
  StepParties,
  StepEvidence,
  StepReview,
} from "@/components/create";
import type {
  StepDefinition,
} from "@/components/create";

// --- STEPS DEFINITION ---
const STEPS: StepDefinition[] = [
  { id: 1, title: "Protocol Settings", icon: <Gavel className="w-4 h-4" /> },
  { id: 2, title: "The Parties", icon: <User className="w-4 h-4" /> },
  { id: 3, title: "Evidence", icon: <UploadCloud className="w-4 h-4" /> },
  { id: 4, title: "Review", icon: <ShieldAlert className="w-4 h-4" /> },
];

export default function CreateDisputePage() {
  const router = useRouter();

  // --- CUSTOM HOOK ---
  const {
    formData,
    updateField,
    files,
    setFiles,
    submit,
    isProcessing
  } = useCreateDisputeForm();

  // --- WIZARD STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [showDefenderOptions, setShowDefenderOptions] = useState(false);

  // --- HANDLERS ---
  const handleNext = () => {
    // Basic Validation per step
    if (currentStep === 1 && !formData.title)
      return toast.error("Title is required");
    if (currentStep === 2 && !formData.defenderAddress)
      return toast.error("Defender address is required");
    if (currentStep === 3 && !formData.description)
      return toast.error("Description is required");

    if (currentStep < 4) setCurrentStep((c) => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((c) => c - 1);
    else router.back();
  };

  // --- RENDER CURRENT STEP ---
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasics data={formData} updateField={updateField} />;
      case 2:
        return <StepParties data={formData} updateField={updateField} />;
      case 3:
        return (
          <StepEvidence
            data={formData}
            updateField={updateField}
            files={files}
            setFiles={setFiles}
          />
        );
      case 4:
        return (
          <StepReview
            data={formData}
            updateField={updateField}
            files={files}
            setFiles={setFiles}
            showDefenderOptions={showDefenderOptions}
            setShowDefenderOptions={setShowDefenderOptions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] overflow-hidden relative">
      {/* --- HEADER --- */}
      <div className="pt-8 px-6 pb-4 bg-white shadow-sm z-20 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={isProcessing}
          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-[#1b1c23]" />
        </button>
        {/* Progress Dots */}
        <WizardProgress currentStep={currentStep} totalSteps={STEPS.length} />
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-extrabold text-[#1b1c23] tracking-tight">
            {STEPS[currentStep - 1].title}
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Step {currentStep} of {STEPS.length}
          </p>
        </div>

        {renderStep()}
      </div>

      {/* --- FLOATING FOOTER --- */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-30">
        <Button
          onClick={currentStep === 4 ? submit : handleNext}
          disabled={isProcessing}
          className={`
            w-full py-6 rounded-2xl font-manrope font-bold text-base shadow-xl
            flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]
            ${isProcessing ? "bg-gray-200 text-gray-400" : "bg-[#1b1c23] text-white"}
          `}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : currentStep === 4 ? (
            <>
              Create Dispute <CheckCircle2 className="w-5 h-5" />
            </>
          ) : (
            <>
              Continue <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
````

## File: src/app/(disputes)/join-dispute/[id]/page.tsx
````typescript
"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetDispute } from "@/hooks/disputes/useGetDispute";
import {
  Loader2,
  ShieldCheck,
  ArrowRight,
  Target,
  Coins,
  Scale,
  CheckCircle2,
} from "lucide-react";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";

export default function JoinDisputePage() {
  const router = useRouter();
  const params = useParams();
  const disputeId = Number(params?.id);

  // Fetch dispute details
  const { dispute, loading: isLoadingDispute } = useGetDispute(
    disputeId.toString(),
  );

  // Helper to format the stake (already formatted in DisputeUI)
  const stakeDisplay = React.useMemo(() => {
    return dispute?.stake || null;
  }, [dispute]);

  if (isLoadingDispute) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FC]">
        <Loader2 className="w-8 h-8 animate-spin text-[#8c8fff]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] relative overflow-hidden">
      {/* --- Ambient Background Glow (Purple) --- */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8c8fff]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="px-4 z-10">
        <DisputeOverviewHeader onBack={() => router.back()} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 animate-in fade-in zoom-in-95 duration-500 pb-20">
        {/* Main Card */}
        <div className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(27,28,35,0.08)] border border-white relative">
          {/* Status Badge - Now shows "Drafted" */}
          <div className="absolute top-6 right-6">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-wide border border-green-100">
              <CheckCircle2 className="w-3 h-3" />
              Drafted
            </span>
          </div>

          {/* Hero Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-[#F8F9FC] rounded-full flex items-center justify-center relative group">
              <div className="absolute inset-0 border border-[#8c8fff]/20 rounded-full scale-100 group-hover:scale-110 transition-transform duration-500" />
              <div className="w-20 h-20 bg-[#8c8fff] rounded-full flex items-center justify-center shadow-lg shadow-[#8c8fff]/30">
                <Scale className="w-10 h-10 text-white" />
              </div>

              {/* Floating Checkmark Badge */}
              <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-manrope font-extrabold text-[#1b1c23] mb-2 tracking-tight">
              You have been drafted!
            </h2>
            <p className="text-base text-gray-500 font-medium leading-relaxed max-w-[260px] mx-auto">
              You are now a juror for{" "}
              <span className="text-[#1b1c23] font-bold">
                Dispute #{disputeId}
              </span>
              .
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {/* Category Box */}
            <div className="bg-[#F8F9FC] border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 hover:border-[#8c8fff]/30 transition-colors">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <Target className="w-3 h-3" /> Area
              </span>
              <span className="text-sm font-bold text-gray-800 text-center">
                {dispute?.category || "General"}
              </span>
            </div>

            {/* Role Box */}
            <div className="bg-[#F8F9FC] border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 hover:border-[#8c8fff]/30 transition-colors">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Role
              </span>
              <span className="text-sm font-bold text-gray-800">Juror</span>
            </div>
          </div>

          {/* Stake Section - Confirmation of what was staked */}
          <div className="border-t border-dashed border-gray-200 pt-6 mb-8 text-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center gap-1.5 mb-2">
              <Coins className="w-3.5 h-3.5" /> Your Stake
            </span>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-4xl font-manrope font-black text-[#8c8fff] tracking-tighter drop-shadow-sm">
                {stakeDisplay || "0"}
              </span>
              <span className="text-xl font-bold text-gray-600">USDC</span>
            </div>
          </div>

          {/* Action Button - Now just navigates to the case file */}
          <button
            onClick={() => router.push(`/disputes/${disputeId}`)}
            className="w-full py-4 bg-[#1b1c23] text-white rounded-2xl font-manrope font-bold text-base tracking-wide hover:bg-[#2c2d33] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-gray-200"
          >
            Open Case File
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Footer */}
        <p className="mt-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-3 h-3" /> Secured by Slice Protocol
        </p>
      </div>
    </div>
  );
}
````

## File: src/app/(settings)/debug/page.tsx
````typescript
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  RefreshCw,
  Terminal,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { formatUnits } from "viem";
import { useSliceVoting } from "@/hooks/voting/useSliceVoting";
import { usePayDispute } from "@/hooks/actions/usePayDispute";
import { getVoteData } from "@/util/votingStorage";
import { useExecuteRuling } from "@/hooks/actions/useExecuteRuling";
import { usePublicClient, useAccount, useWriteContract } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { GlobalStateCard } from "@/components/debug/GlobalStateCard";
import { DisputeInspector } from "@/components/debug/DisputeInspector";
import { DebugToggle } from "@/components/debug/DebugToggle";

export default function DebugPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { sliceContract } = useContracts();

  const publicClient = usePublicClient();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const {
    commitVote,
    revealVote,
    isProcessing: isVoting,
    logs,
  } = useSliceVoting();
  const { payDispute, isPaying } = usePayDispute();
  const { executeRuling } = useExecuteRuling();

  // State
  const [targetId, setTargetId] = useState("1");
  const [contractInfo, setContractInfo] = useState<any>(null);
  const [rawDisputeData, setRawDisputeData] = useState<any>(null);
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [myPartyDisputes, setMyPartyDisputes] = useState<string[]>([]);
  const [myJurorDisputes, setMyJurorDisputes] = useState<string[]>([]);

  // Toggle for advanced/low-level tools
  const [showAdvanced, setShowAdvanced] = useState(false);

  // --- 1. Global & Context Fetching ---
  const refreshGlobalState = useCallback(async () => {
    if (!publicClient || !address || !sliceContract) return;
    try {
      const count = (await publicClient.readContract({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "disputeCount",
      })) as bigint;

      const userDisputeIds = (await publicClient.readContract({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "getUserDisputes",
        args: [address as `0x${string}`],
      })) as bigint[];

      const jurorDisputeIds = (await publicClient.readContract({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "getJurorDisputes",
        args: [address as `0x${string}`],
      })) as bigint[];

      setMyPartyDisputes(userDisputeIds.map((id) => id.toString()));
      setMyJurorDisputes(jurorDisputeIds.map((id) => id.toString()));
      setContractInfo({ count: count.toString() });
    } catch (e) {
      console.error(e);
      // Fail silently for smoother UX on partial loads
    }
  }, [publicClient, address, sliceContract]);

  useEffect(() => {
    refreshGlobalState();
  }, [refreshGlobalState]);

  // --- 2. Dispute Inspector Fetcher ---
  const fetchRawDispute = async () => {
    if (!publicClient || !targetId || !sliceContract) return;
    setIsLoadingData(true);
    try {
      const d = (await publicClient.readContract({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "disputes",
        args: [BigInt(targetId)],
      })) as any;

      const statusLabels = ["Created", "Commit", "Reveal", "Executed"];
      const isClaimer = d.claimer.toLowerCase() === address?.toLowerCase();
      const isDefender = d.defender.toLowerCase() === address?.toLowerCase();

      let hasRevealed = false;
      try {
        if (address) {
          hasRevealed = (await publicClient.readContract({
            address: sliceContract,
            abi: SLICE_ABI,
            functionName: "hasRevealed",
            args: [BigInt(targetId), address as `0x${string}`],
          })) as boolean;
        }
      } catch (e) {
        console.error("hasRevealed check failed", e);
        toast.warning?.(
          "Unable to load on-chain reveal status. Displaying status as not revealed.",
        );
      }

      setRawDisputeData({
        id: targetId,
        statusIndex: Number(d.status),
        status: statusLabels[Number(d.status)] || "Unknown",
        claimer: d.claimer,
        defender: d.defender,
        category: d.category,
        jurorsRequired: d.jurorsRequired.toString(),
        requiredStake: formatUnits(d.requiredStake, 6) + " USDC",
        payDeadline: new Date(Number(d.payDeadline) * 1000).toLocaleString(),
        commitDeadline: new Date(
          Number(d.commitDeadline) * 1000,
        ).toLocaleString(),
        revealDeadline: new Date(
          Number(d.revealDeadline) * 1000,
        ).toLocaleString(),
        ipfsHash: d.ipfsHash || "None",
        winner:
          d.winner === "0x0000000000000000000000000000000000000000"
            ? "Pending/None"
            : d.winner,
        userRole: isClaimer
          ? "Claimer"
          : isDefender
            ? "Defender"
            : "None/Juror",
        hasRevealedOnChain: hasRevealed,
      });

      if (address && sliceContract) {
        const stored = getVoteData(sliceContract, targetId, address);
        setLocalStorageData(stored);
      }
    } catch (e) {
      console.error(e);
      toast.error(`Dispute #${targetId} not found`);
      setRawDisputeData(null);
    } finally {
      setIsLoadingData(false);
    }
  };

  // --- 3. Action Handlers ---
  const handleQuickCreate = async () => {
    if (!address) return toast.error("Connect wallet");
    if (!sliceContract) return toast.error("Contract address missing");

    try {
      toast.info("Sending custom createDispute tx...");

      const hash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "createDispute",
        account: address, // Explicitly pass the account
        args: [
          {
            // Use different addresses to ensure msg.sender != defender
            claimer: "0x3AE66a6DB20fCC27F3DB3DE5Fe74C108A52d6F29", // Bob
            defender: "0x58609c13942F56e17d36bcB926C413EBbD10e477", // Alice
            category: "General",
            ipfsHash:
              "bafkreiamcbxmdxau7daffssq4zcpaplfg3wtfwftsmwrvl6rhcesugirvi",
            jurorsRequired: BigInt(1),
            paySeconds: BigInt(86400),
            evidenceSeconds: BigInt(86400),
            commitSeconds: BigInt(86400),
            revealSeconds: BigInt(86400),
          },
        ],
      });

      toast.success("Transaction sent!");

      if (publicClient) {
        toast.info("Waiting for confirmation...");
        await publicClient.waitForTransactionReceipt({ hash });
        toast.success("Dispute created successfully!");
        refreshGlobalState();
      }
    } catch (e: any) {
      console.error(e);
      toast.error(`Create failed: ${e.shortMessage || e.message}`);
    }
  };

  const handleJoin = async () => {
    toast.info(
      "Please use the main UI to join (Code migrated to useAssignDispute)",
    );
  };

  const handleExecute = async () => {
    await executeRuling(targetId);
    setTimeout(() => {
      fetchRawDispute();
      refreshGlobalState();
    }, 2000);
  };

  const handleSelectId = (id: string) => {
    setTargetId(id);
    setTimeout(() => {
      const btn = document.getElementById("btn-fetch");
      if (btn) btn.click();
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-manrope pb-20">
      {/* Header */}
      <div className="pt-8 px-6 pb-4 bg-white shadow-sm sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-[#1b1c23]" />
          </button>
          <h1 className="text-xl font-extrabold text-[#1b1c23] flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#8c8fff]" /> Debug Console
          </h1>
        </div>
        <button
          onClick={refreshGlobalState}
          className="w-10 h-10 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-[#1b1c23] flex items-center justify-center"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-6 overflow-y-auto">
        <GlobalStateCard
          contractInfo={contractInfo}
          isCreating={isWriting}
          onCreate={handleQuickCreate}
          myPartyDisputes={myPartyDisputes}
          myJurorDisputes={myJurorDisputes}
          targetId={targetId}
          onSelectId={handleSelectId}
        />

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-[18px] border border-gray-100 shadow-sm flex items-center gap-2 sticky top-[80px] z-10">
          <div className="pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            placeholder="Enter Dispute ID..."
            className="flex-1 p-2 outline-none text-[#1b1c23] font-bold bg-transparent font-mono"
          />
          <button
            id="btn-fetch"
            onClick={fetchRawDispute}
            disabled={isLoadingData}
            className="bg-[#f5f6f9] text-[#1b1c23] px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors min-w-[80px]"
          >
            {isLoadingData ? "..." : "Fetch"}
          </button>
        </div>

        <DisputeInspector
          data={rawDisputeData}
          localStorageData={localStorageData}
          onJoin={handleJoin}
          onPay={() =>
            payDispute(targetId, "1.0").then(() => fetchRawDispute())
          }
          onVote={(val) => commitVote(targetId, val)}
          onReveal={() => revealVote(targetId)}
          onExecute={handleExecute}
          isPaying={isPaying}
          isVoting={isVoting}
          logs={logs}
        />
      </div>

      {/* Bottom Right toggle*/}
      <DebugToggle />
    </div>
  );
}
````

## File: src/app/page.tsx
````typescript
"use client";

import { useEffect } from "react";
// import { redirect } from "next/navigation";
import { sdk } from "@farcaster/miniapp-sdk";
import { DisputesHeader } from "@/components/disputes/DisputesHeader";
import { BalanceCard } from "@/components/disputes/BalanceCard";
import { DisputesList } from "@/components/disputes/DisputesList";

export default function DisputesPage() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  // redirect("/disputes");
  return (
    <div className="flex flex-col h-full w-full">
      <DisputesHeader />
      <BalanceCard />
      <DisputesList />
    </div>
  );
}
````

## File: src/config/contracts.ts
````typescript
import { SUPPORTED_CHAINS, DEFAULT_CHAIN } from "./chains";

export const getContractsForChain = (chainId: number) => {
  const config = SUPPORTED_CHAINS.find((c) => c.chain.id === chainId);

  if (!config) {
    console.warn(`Chain ID ${chainId} not found in config, using default.`);
    return {
      sliceContract: DEFAULT_CHAIN.contracts.slice as `0x${string}`,
      usdcToken: DEFAULT_CHAIN.contracts.usdc as `0x${string}`,
    };
  }

  return {
    sliceContract: config.contracts.slice as `0x${string}`,
    usdcToken: config.contracts.usdc as `0x${string}`,
  };
};

import { sliceAbi } from "@/contracts/slice-abi";
export const SLICE_ABI = sliceAbi;
````

## File: src/hooks/disputes/useDisputeList.ts
````typescript
import { useReadContract, useReadContracts } from "wagmi";
import { DISPUTE_STATUS } from "@/config/app";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { transformDisputeData, type DisputeUI } from "@/util/disputeAdapter";
import { useMemo, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useStakingToken } from "../core/useStakingToken";

// "juror" = disputes where I am a juror
// "mine"  = disputes where I am a juror OR a party (Claimer/Defender)
// "all"   = all disputes (admin/explorer view)
type ListType = "juror" | "mine" | "all";

export type Dispute = DisputeUI;

export function useDisputeList(
  listType: ListType,
  options?: { activeOnly?: boolean },
) {
  const { address } = useAccount();
  const { decimals } = useStakingToken();
  const { sliceContract } = useContracts();

  // 1. Fetch Juror Disputes
  const { data: jurorDisputeIds } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "getJurorDisputes",
    args: address ? [address] : undefined,
    query: {
      enabled: (listType === "juror" || listType === "mine") && !!address,
    },
  });

  // 2. Fetch User Disputes (Only for "mine")
  const { data: userDisputeIds } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "getUserDisputes",
    args: address ? [address] : undefined,
    query: {
      enabled: listType === "mine" && !!address,
    },
  });

  const { data: totalCount } = useReadContract({
    address: sliceContract,
    abi: SLICE_ABI,
    functionName: "disputeCount",
    query: { enabled: listType === "all" },
  });

  // 3. Prepare Calls
  const calls = useMemo(() => {
    const contracts = [];
    let idsToFetch: bigint[] = [];

    // REMOVED: Redundant 'if (listType === "juror")' block that was causing duplicates.
    // We only keep the logic for "all" here because it relies on a count/range
    // rather than a specific ID list which is handled below.

    if (listType === "all" && totalCount) {
      const total = Number(totalCount);

      const start = total;
      const end = Math.max(1, total - 20 + 1); // Ensure we stop at 1, and get max 20 items

      for (let i = start; i >= end; i--) {
        contracts.push({
          address: sliceContract,
          abi: SLICE_ABI,
          functionName: "disputes",
          args: [BigInt(i)],
        });
      }
    }

    // "juror" mode: Strictly juror IDs
    if (listType === "juror" && jurorDisputeIds) {
      idsToFetch = [...(jurorDisputeIds as bigint[])];
    }
    // "mine" mode: Juror + Party IDs
    else if (listType === "mine") {
      const jIds = (jurorDisputeIds as bigint[]) || [];
      const uIds = (userDisputeIds as bigint[]) || [];
      const uniqueIds = new Set([...jIds, ...uIds].map((id) => id.toString()));
      idsToFetch = Array.from(uniqueIds).map((id) => BigInt(id));
    }

    // Sort descending
    idsToFetch.sort((a, b) => Number(b) - Number(a));

    for (const id of idsToFetch) {
      contracts.push({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "disputes",
        args: [id],
      });
    }

    return contracts;
  }, [listType, jurorDisputeIds, userDisputeIds, totalCount, sliceContract]);

  // 4. Fetch Data
  const {
    data: results,
    isLoading: isMulticallLoading,
    refetch,
  } = useReadContracts({
    contracts: calls,
    query: { enabled: calls.length > 0 },
  });

  const [disputes, setDisputes] = useState<DisputeUI[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  // 5. Process & Filter
  useEffect(() => {
    async function process() {
      if (!results || results.length === 0) {
        if (!isMulticallLoading) {
          setDisputes([]);
          setIsProcessing(false);
        }
        return;
      }

      setIsProcessing(true);
      const processed = await Promise.all(
        results.map(async (result) => {
          if (result.status !== "success") return null;
          return await transformDisputeData(result.result, decimals);
        }),
      );

      let finalDisputes = processed.filter((d): d is DisputeUI => d !== null);

      // --- Filter out Finished disputes if activeOnly is true ---
      if (options?.activeOnly) {
        // Status 3 = Finished/Resolved
        finalDisputes = finalDisputes.filter(
          (d) => d.status !== DISPUTE_STATUS.RESOLVED,
        );
      }

      setDisputes(finalDisputes);
      setIsProcessing(false);
    }

    process();
  }, [results, isMulticallLoading, options?.activeOnly, decimals]);

  return { disputes, isLoading: isMulticallLoading || isProcessing, refetch };
}
````

## File: minikit.config.ts
````typescript
const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  accountAssociation: {
    header:
      "eyJmaWQiOjE1NTkwMDQsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg2RTdiNWZBNjFBOTFDN2E5NDY5NkVkQ0I2QTQwQWRGMWY5RTYxMzk3In0",
    payload: "eyJkb21haW4iOiJiYXNlLnNsaWNlaHViLnh5eiJ9",
    signature:
      "VaFpDdWVDRRhaTpPV72VGnBn+qsEcpD8QWDuWLa2oUUaGmvJpnWERVFPCkF8u8NVi/opvS3pq4hQTcihCCNMtxw=",
  },
  baseBuilder: {
    ownerAddress: "",
  },
  miniapp: {
    version: "1",
    name: "base-miniapp",
    subtitle: "",
    description: "",
    screenshotUrls: [],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "utility",
    tags: ["example"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;
````

## File: contracts/contracts/slice/Slice.sol
````solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Slice Protocol
 * @notice Decentralized dispute resolution via random juror drafting.
 */
contract Slice {
    // ============================================
    // DATA STRUCTURES
    // ============================================

    enum DisputeStatus {
        Created,
        Commit,
        Reveal,
        Finished
    }

    struct DisputeConfig {
        address claimer;
        address defender;
        string category;
        string ipfsHash;
        uint256 jurorsRequired;
        uint256 paySeconds;
        uint256 evidenceSeconds;
        uint256 commitSeconds;
        uint256 revealSeconds;
    }

    struct Dispute {
        uint256 id;
        address claimer;
        address defender;
        string category;
        uint256 requiredStake;
        uint256 jurorsRequired;
        string ipfsHash;
        uint256 commitsCount;
        uint256 revealsCount;
        DisputeStatus status;
        bool claimerPaid;
        bool defenderPaid;
        address winner;
        uint256 payDeadline;
        uint256 evidenceDeadline;
        uint256 commitDeadline;
        uint256 revealDeadline;
    }

    struct JurorStats {
        uint256 totalDisputes;
        uint256 coherentVotes;
        uint256 totalEarnings;
    }

    // ============================================
    // STATE VARIABLES
    // ============================================

    uint256 public disputeCount;
    IERC20 public immutable stakingToken;

    // Limits: 1 USDC min, 100 USDC max
    uint256 public constant MIN_STAKE = 1000000;
    uint256 public constant MAX_STAKE = 100000000;

    // Draft Queue: List of open disputes waiting for jurors
    uint256[] public openDisputeIds;
    mapping(uint256 => uint256) public idToQueueIndex;

    // ============================================
    // MAPPINGS
    // ============================================

    mapping(uint256 => Dispute) internal disputeStore;
    mapping(uint256 => address[]) public disputeJurors;

    // Voting State
    mapping(uint256 => mapping(address => bytes32)) public commitments;
    mapping(uint256 => mapping(address => uint256)) public revealedVotes;
    mapping(uint256 => mapping(address => bool)) public hasRevealed;

    // Financials
    mapping(uint256 => mapping(address => uint256)) public jurorStakes;
    mapping(address => uint256) public balances;
    mapping(address => JurorStats) public jurorStats;

    // User Indexing
    mapping(address => uint256[]) private jurorDisputes;
    mapping(address => uint256[]) private userDisputes;

    // ============================================
    // EVENTS
    // ============================================

    event DisputeCreated(uint256 indexed id, address claimer, address defender);
    event FundsDeposited(uint256 indexed id, address role, uint256 amount);
    event EvidenceSubmitted(uint256 indexed id, address indexed party, string ipfsHash);
    event JurorJoined(uint256 indexed id, address juror);
    event StatusChanged(uint256 indexed id, DisputeStatus newStatus);
    event VoteCommitted(uint256 indexed id, address juror);
    event VoteRevealed(uint256 indexed id, address juror, uint256 vote);
    event RulingExecuted(uint256 indexed id, address winner);
    event FundsWithdrawn(address indexed user, uint256 amount);

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    // ============================================
    // 1. DISPUTE CREATION
    // ============================================

    function createDispute(DisputeConfig calldata _config) external returns (uint256) {
        require(msg.sender != _config.defender, "Self-dispute not allowed");
        require(_config.claimer != _config.defender, "Claimer cannot be Defender");

        disputeCount++;
        uint256 id = disputeCount;

        Dispute storage d = disputeStore[id];
        d.id = id;
        d.claimer = _config.claimer;
        d.defender = _config.defender;
        d.category = _config.category;
        d.requiredStake = 1000000; // Fixed 1 USDC per juror slot
        d.jurorsRequired = _config.jurorsRequired;
        d.ipfsHash = _config.ipfsHash;
        d.status = DisputeStatus.Created;

        // Set deadlines relative to now
        d.payDeadline = block.timestamp + _config.paySeconds;
        d.evidenceDeadline = d.payDeadline + _config.evidenceSeconds;
        d.commitDeadline = d.payDeadline + _config.commitSeconds;
        d.revealDeadline = d.commitDeadline + _config.revealSeconds;

        userDisputes[_config.claimer].push(id);
        userDisputes[_config.defender].push(id);

        // Add to Draft Queue so jurors can be assigned
        _addToQueue(id);

        emit DisputeCreated(id, _config.claimer, _config.defender);
        return id;
    }

    function payDispute(uint256 _id) external {
        Dispute storage d = disputeStore[_id];
        require(d.status == DisputeStatus.Created, "Payment closed");
        require(block.timestamp <= d.payDeadline, "Deadline passed");

        if (msg.sender == d.claimer) {
            require(!d.claimerPaid, "Already paid");
            d.claimerPaid = true;
        } else if (msg.sender == d.defender) {
            require(!d.defenderPaid, "Already paid");
            d.defenderPaid = true;
        } else {
            revert("Only disputants can pay");
        }

        bool success = stakingToken.transferFrom(msg.sender, address(this), d.requiredStake);
        require(success, "Transfer failed");

        emit FundsDeposited(_id, msg.sender, d.requiredStake);

        // Advance to Commit phase only when both sides have paid
        if (d.claimerPaid && d.defenderPaid) {
            d.status = DisputeStatus.Commit;
            emit StatusChanged(_id, DisputeStatus.Commit);
        }
    }

    function submitEvidence(uint256 _id, string calldata _ipfsHash) external {
        Dispute storage d = disputeStore[_id];
        require(d.status != DisputeStatus.Finished, "Dispute finished");
        require(d.status != DisputeStatus.Reveal, "Evidence closed");
        require(block.timestamp <= d.evidenceDeadline, "Deadline passed");
        require(msg.sender == d.claimer || msg.sender == d.defender, "Only parties can submit");

        emit EvidenceSubmitted(_id, msg.sender, _ipfsHash);
    }

    // ============================================
    // 2. MATCHMAKING (RANDOM DRAFT)
    // ============================================

    /**
     * @notice Jurors stake tokens to be randomly assigned a valid dispute.
     * @dev Uses block.prevrandao + sender address for uniqueness.
     */
    function drawDispute(uint256 _amount) external {
        require(openDisputeIds.length > 0, "No disputes available");
        require(_amount >= MIN_STAKE, "Stake too low");
        require(_amount <= MAX_STAKE, "Stake too high");

        // 1. Random Selection
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));
        uint256 index = seed % openDisputeIds.length;
        uint256 id = openDisputeIds[index];

        Dispute storage d = disputeStore[id];

        // 2. Safety Checks (Expired, Finished, or Conflict of Interest)
        require(block.timestamp < d.commitDeadline, "Dispute expired");
        require(d.status != DisputeStatus.Finished, "Dispute finished");
        require(msg.sender != d.claimer && msg.sender != d.defender, "Conflict: Party cannot be juror");
        require(!_isJuror(id, msg.sender), "Already a juror");

        // 3. Stake Transfer
        bool success = stakingToken.transferFrom(msg.sender, address(this), _amount);
        require(success, "Transfer failed");

        // 4. Assign Juror
        disputeJurors[id].push(msg.sender);
        jurorStakes[id][msg.sender] = _amount;
        jurorDisputes[msg.sender].push(id);

        emit JurorJoined(id, msg.sender);

        // 5. If full, remove from draft queue
        if (disputeJurors[id].length >= d.jurorsRequired) {
            _removeFromQueue(index);
        }
    }

    // ============================================
    // 3. VOTING (COMMIT / REVEAL)
    // ============================================

    function commitVote(uint256 _id, bytes32 _commitment) external {
        Dispute storage d = disputeStore[_id];
        require(d.status == DisputeStatus.Commit, "Not voting phase");
        require(block.timestamp <= d.commitDeadline, "Voting ended");
        require(_isJuror(_id, msg.sender), "Not a juror");
        require(commitments[_id][msg.sender] == bytes32(0), "Already committed");

        commitments[_id][msg.sender] = _commitment;
        d.commitsCount++;
        emit VoteCommitted(_id, msg.sender);

        // Auto-advance if everyone voted
        if (disputeJurors[_id].length == d.jurorsRequired && d.commitsCount == d.jurorsRequired) {
            d.status = DisputeStatus.Reveal;
            emit StatusChanged(_id, DisputeStatus.Reveal);
        }
    }

    function revealVote(uint256 _id, uint256 _vote, uint256 _salt) external {
        Dispute storage d = disputeStore[_id];

        // Graceful rollover if deadline passed but status didn't update
        if (d.status == DisputeStatus.Commit && block.timestamp > d.commitDeadline) {
            d.status = DisputeStatus.Reveal;
        }

        require(d.status == DisputeStatus.Reveal, "Not reveal phase");
        require(_isJuror(_id, msg.sender), "Not a juror");
        require(!hasRevealed[_id][msg.sender], "Already revealed");

        // Verify Hash: keccak256(vote + salt) == stored_commitment
        bytes32 verify = keccak256(abi.encodePacked(_vote, _salt));
        require(verify == commitments[_id][msg.sender], "Hash mismatch");

        revealedVotes[_id][msg.sender] = _vote;
        hasRevealed[_id][msg.sender] = true;
        d.revealsCount++;

        emit VoteRevealed(_id, msg.sender, _vote);
    }

    // ============================================
    // 4. RULING & REWARDS
    // ============================================

    function executeRuling(uint256 _id) external {
        Dispute storage d = disputeStore[_id];

        if (d.status == DisputeStatus.Commit && block.timestamp > d.commitDeadline) {
            d.status = DisputeStatus.Reveal;
        }

        bool timePassed = block.timestamp > d.revealDeadline;
        bool allRevealed = (d.commitsCount > 0 && d.commitsCount == d.revealsCount);

        require(d.status == DisputeStatus.Reveal, "Wrong phase");
        require(timePassed || allRevealed, "Cannot execute yet");

        uint256 winningChoice = _determineWinner(_id);
        address winnerAddr = winningChoice == 1 ? d.claimer : d.defender;

        d.winner = winnerAddr;
        d.status = DisputeStatus.Finished;

        // Winner gets 2x required stake (Principal + Opponent's stake)
        balances[winnerAddr] += d.requiredStake * 2;

        // Jurors who voted correctly get paid from the losing jurors' pool
        _distributeRewards(_id, winningChoice);

        emit RulingExecuted(_id, winnerAddr);
    }

    function withdraw(address _token) external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No funds");
        require(_token == address(stakingToken), "Wrong token");

        balances[msg.sender] = 0; // Check-Effects-Interactions pattern
        bool success = stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer failed");

        emit FundsWithdrawn(msg.sender, amount);
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    function disputes(uint256 _id) external view returns (Dispute memory) {
        return disputeStore[_id];
    }

    function getJurorDisputes(address _user) external view returns (uint256[] memory) {
        return jurorDisputes[_user];
    }

    function getUserDisputes(address _user) external view returns (uint256[] memory) {
        return userDisputes[_user];
    }

    function disputeCountView() external view returns (uint256) {
        return disputeCount;
    }

    // ============================================
    // INTERNAL HELPERS
    // ============================================

    function _isJuror(uint256 _id, address _user) internal view returns (bool) {
        address[] memory jurors = disputeJurors[_id];
        for (uint i = 0; i < jurors.length; i++) {
            if (jurors[i] == _user) return true;
        }
        return false;
    }

    // --- Queue: Swap & Pop (O(1) removal) ---
    function _addToQueue(uint256 _id) internal {
        openDisputeIds.push(_id);
        idToQueueIndex[_id] = openDisputeIds.length - 1;
    }

    function _removeFromQueue(uint256 _index) internal {
        require(_index < openDisputeIds.length, "Index out of bounds");

        uint256 idToRemove = openDisputeIds[_index];
        uint256 lastId = openDisputeIds[openDisputeIds.length - 1];

        // Swap last element into empty spot
        if (_index != openDisputeIds.length - 1) {
            openDisputeIds[_index] = lastId;
            idToQueueIndex[lastId] = _index;
        }

        openDisputeIds.pop();
        delete idToQueueIndex[idToRemove];
    }

    // Simple majority check: weights sum of votes for 0 vs 1
    function _determineWinner(uint256 _id) internal view returns (uint256) {
        uint256 votesFor0 = 0;
        uint256 votesFor1 = 0;
        address[] memory jurors = disputeJurors[_id];

        for (uint i = 0; i < jurors.length; i++) {
            address j = jurors[i];
            if (hasRevealed[_id][j]) {
                uint256 v = revealedVotes[_id][j];
                uint256 weight = jurorStakes[_id][j];

                if (v == 0) votesFor0 += weight;
                else if (v == 1) votesFor1 += weight;
            }
        }
        return votesFor1 > votesFor0 ? 1 : 0;
    }

    // Proportional Reward Distribution
    // Winners share the losing pool based on their stake weight
    function _distributeRewards(uint256 _id, uint256 winningChoice) internal {
        address[] memory jurors = disputeJurors[_id];
        uint256 totalWinningStake = 0;
        uint256 totalLosingStake = 0;

        // 1. Calculate Pools
        for (uint i = 0; i < jurors.length; i++) {
            address j = jurors[i];
            uint256 s = jurorStakes[_id][j];

            if (hasRevealed[_id][j] && revealedVotes[_id][j] == winningChoice) {
                totalWinningStake += s;
            } else {
                totalLosingStake += s;
            }
        }

        // 2. Distribute
        for (uint i = 0; i < jurors.length; i++) {
            address j = jurors[i];
            jurorStats[j].totalDisputes++;

            bool isWinner = hasRevealed[_id][j] && revealedVotes[_id][j] == winningChoice;

            if (isWinner) {
                jurorStats[j].coherentVotes++;
                uint256 myStake = jurorStakes[_id][j];

                if (totalWinningStake > 0) {
                    // Reward = Stake + (Stake/TotalWinningStake * LosingPool)
                    uint256 myShare = (myStake * totalLosingStake) / totalWinningStake;
                    jurorStats[j].totalEarnings += myShare;
                    balances[j] += (myStake + myShare);
                } else {
                    // Edge case: Return principal only
                    balances[j] += myStake;
                }
            }
        }
    }
}
````

## File: contracts/README.md
````markdown
# Slice Protocol ⚖️

**The Neutral, On-Chain Dispute Resolution Protocol.**

Slice is an oracle for justice. It produces reliable rulings for external contracts through a trustless mechanism of random juror selection, commit-reveal voting, and crypto-economic staking.

This repository contains the **Hardhat** development environment for the Slice smart contracts.

---

## Protocol Roadmap & Versioning

We are currently on **Slice V1.1**. The codebase is evolving through strict architectural stages to ensure security and scalability.

### Current: Slice V1.1 ("The Active Draft")
* **Mechanism:** Jurors manually "draw" disputes from an open queue.
* **Matchmaking:** `prevrandao`-based random assignment.
* **Staking:** Per-dispute staking (Jurors lock funds only when they join a specific case).
* **Tech:** Solidity, Open Queue (Swap-and-Pop), Commit-Reveal.

### Next Up: Slice V1.2 ("The High-Stakes Lottery")
* **Mechanism:** Passive Global Staking. Jurors stake into a global pool once.
* **Economic Security:** **High Assurance Model.** If selected, the juror's *entire* staked balance moves to the dispute to maximize skin-in-the-game.
* **Probability:** Linear weighting (Higher stake = Higher selection chance).
* **Exit:** Rapid exit mechanism with short cooldowns (e.g., 4 hours).

### Future: Slice V1.3 ("True Randomness")
* **Entropy:** Integration of **Chainlink VRF** to replace `prevrandao`.
* **UX:** Event-driven architecture. Jurors are notified off-chain when selected.

### Long-Term: FHE Privacy (Zama Integration)
* **Goal:** Fully private voting and evidence handling using Fully Homomorphic Encryption (FHE).
* **Template:** This project is initialized using the **Zama FHEVM template** to ensure our foundation is ready for this future privacy layer when the time comes.

---

## Prerequisites

* **Node.js**: Version 20 or higher
* **pnpm**: Package manager

```bash
npm install -g pnpm
```

---

## Installation & Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env` file or set variables via the CLI:

```bash
pnpm hardhat vars set MNEMONIC
pnpm hardhat vars set INFURA_API_KEY
pnpm hardhat vars set ETHERSCAN_API_KEY # Optional: for verification
```

### 3. Compile Contracts

```bash
pnpm run compile
```

### 4. Run Tests

```bash
pnpm run test
```

---

## ⛓ Deployment

### Local Network (Hardhat Network)

```bash
# Start the node
pnpm hardhat node

# Deploy (in a separate terminal)
pnpm hardhat deploy --network localhost
```

### Testnet (Sepolia)

```bash
# Deploy
pnpm hardhat deploy --network sepolia

# Verify
pnpm hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

---

## 📁 Project Structure

```
slice-protocol/
├── contracts/           # Core Protocol Logic
│   ├── Slice.sol        # Main V1.1 Contract (Draft/Queue System)
│   └── interfaces/      # Shared interfaces
├── deploy/              # Hardhat deploy scripts
├── test/                # Mocha/Chai tests
├── tasks/               # Custom Hardhat tasks
└── hardhat.config.ts    # Network & Compiler config
```

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `pnpm run compile` | Compiles Solidity contracts |
| `pnpm run test` | Runs the full test suite |
| `pnpm run coverage` | Generates code coverage report |
| `pnpm run lint` | Runs Solhint and ESLint |
| `pnpm run clean` | Removes artifacts and cache |

---

## 📄 License

This project is licensed under the MIT License.

**Built for Justice.**
````

## File: src/app/(disputes)/disputes/[id]/page.tsx
````typescript
"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";
import { PaginationDots } from "@/components/dispute-overview/PaginationDots";
import { useGetDispute } from "@/hooks/disputes/useGetDispute";
import { usePageSwipe } from "@/hooks/ui/usePageSwipe";
import { shortenAddress } from "@/util/wallet";
import { DISPUTE_STATUS } from "@/config/app";
import {
  Loader2,
  Clock,
  FileText,
  ArrowRight,
  Scale,
  Gavel,
  Coins,
} from "lucide-react";

export default function DisputeOverviewPage() {
  const router = useRouter();
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  const { dispute, loading: isLoading } = useGetDispute(disputeId);

  const handleBack = () => router.back();
  const handleStartReview = () =>
    router.push(`/claimant-evidence/${disputeId}`);

  const bindSwipe = usePageSwipe({
    onSwipeLeft: handleStartReview,
  });

  // Calculate winner logic
  const isFinished = dispute?.status === DISPUTE_STATUS.RESOLVED;
  const winnerAddress = dispute?.winner?.toLowerCase();

  // Helper to get formatted data
  const statusLabels: Record<number, string> = {
    [DISPUTE_STATUS.CREATED]: "Created",
    [DISPUTE_STATUS.COMMIT]: "Commit",
    [DISPUTE_STATUS.REVEAL]: "Reveal",
    [DISPUTE_STATUS.RESOLVED]: "Executed",
  };

  const displayDispute = dispute
    ? {
        id: dispute.id.toString(),
        title: dispute.title || `Dispute #${dispute.id}`,
        category: dispute.category,
        status: statusLabels[dispute.status] || "Unknown",
        claimer: {
          name: dispute.claimerName || dispute.claimer,
          // Pass the final string to shortenAddress.
          // It will detect if it's an address and shorten it, or leave it alone if it's a real name.
          shortName: shortenAddress(dispute.claimerName || dispute.claimer),
          avatar: "/images/profiles-mockup/profile-1.jpg",
          isWinner:
            isFinished && winnerAddress === dispute.claimer.toLowerCase(),
        },
        defender: {
          name: dispute.defenderName || dispute.defender,
          // Same here for defender
          shortName: shortenAddress(dispute.defenderName || dispute.defender),
          avatar: "/images/profiles-mockup/profile-2.jpg",
          isWinner:
            isFinished && winnerAddress === dispute.defender.toLowerCase(),
        },
        description: dispute.description || "No description provided.",
        deadlineLabel: dispute.deadlineLabel,
        stake: dispute.stake,
      }
    : null;

  if (isLoading || !displayDispute) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FC]">
        <Loader2 className="animate-spin text-[#8c8fff] w-8 h-8" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-screen bg-[#F8F9FC] relative overflow-hidden touch-none"
      {...bindSwipe()}
    >
      {/* Background Decorative blob */}
      <div className="absolute top-[-150px] left-[-100px] w-[300px] h-[300px] bg-[#8c8fff]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* 1. Header & Title Section */}
      <div className="px-6 pt-4 pb-2 z-10">
        <DisputeOverviewHeader onBack={handleBack} />

        <div className="mt-6 flex flex-col gap-3">
          {/* Badges Row */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#8c8fff] text-white text-[10px] font-extrabold uppercase tracking-wide shadow-sm shadow-[#8c8fff]/20">
              {displayDispute.category}
            </span>
            <div className="flex items-center gap-1.5 text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#8c8fff]" />
              <span className="text-[10px] font-bold uppercase tracking-wide">
                {displayDispute.deadlineLabel}
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-manrope font-extrabold text-[#1b1c23] leading-tight tracking-tight">
            {displayDispute.title}
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32 flex flex-col gap-6 z-10 scrollbar-hide">
        {/* 2. Versus Card */}
        <div className="mt-2">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#8c8fff]" /> Parties Involved
            </h3>
          </div>

          <div className="bg-white rounded-[24px] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white relative">
            <div className="flex items-stretch min-h-[120px]">
              {/* Claimer (Left) */}
              <div className="flex-1 bg-[#F8F9FC] rounded-l-[18px] rounded-r-[4px] p-4 flex flex-col items-center justify-center gap-2 text-center border border-transparent hover:border-blue-100 transition-colors">
                {/* Avatar with Ring */}
                <div className="w-14 h-14 rounded-full border-[3px] border-white shadow-md overflow-hidden mb-1">
                  <img
                    src={displayDispute.claimer.avatar}
                    alt="Claimer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
                    Claimer
                  </span>
                  {/* Added max-w and truncate to prevent overflow */}
                  <div className="max-w-[100px] sm:max-w-none mx-auto">
                    <span className="inline-block text-base font-bold text-[#1b1c23] bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm truncate w-full">
                      {displayDispute.claimer.shortName}
                    </span>
                  </div>
                </div>
              </div>

              {/* VS Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-[#1b1c23] w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-[4px] border-white text-white">
                  <span className="text-[10px] font-black italic pr-[1px]">
                    VS
                  </span>
                </div>
              </div>

              {/* Defender (Right) */}
              <div className="flex-1 bg-[#F8F9FC] rounded-r-[18px] rounded-l-[4px] p-4 flex flex-col items-center justify-center gap-2 text-center border border-transparent hover:border-gray-200 transition-colors">
                {/* Avatar with Ring */}
                <div className="w-14 h-14 rounded-full border-[3px] border-white shadow-md overflow-hidden mb-1">
                  <img
                    src={displayDispute.defender.avatar}
                    alt="Defender"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                    Defender
                  </span>
                  {/* Added max-w and truncate to prevent overflow */}
                  <div className="max-w-[100px] sm:max-w-none mx-auto">
                    <span className="inline-block text-base font-bold text-[#1b1c23] bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm truncate w-full">
                      {displayDispute.defender.shortName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Case Context */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#8c8fff]" /> Case Brief
            </h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8c8fff]/20 to-transparent" />

            <p className="text-base text-gray-600 leading-relaxed font-medium">
              {displayDispute.description}
            </p>

            <div className="mt-8 pt-5 border-t border-dashed border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8c8fff]/10 flex items-center justify-center text-[#8c8fff]">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                    Juror Stake
                  </span>
                  <span className="text-base font-black text-[#1b1c23]">
                    {displayDispute.stake} USDC
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                <span className="text-xs font-mono font-bold text-gray-500">
                  ID: #{displayDispute.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sticky Footer CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-20">
        <button
          onClick={handleStartReview}
          className="group w-full py-4 bg-[#1b1c23] text-white rounded-[20px] font-manrope font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-gray-200 hover:bg-[#2c2d33] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <Gavel className="w-5 h-5 fill-white/50" />
          Review Evidence
          <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-4">
          <PaginationDots currentIndex={0} total={4} />
        </div>
      </div>
    </div>
  );
}
````

## File: .env.example
````
NEXT_PUBLIC_APP_ENV=development

# PINATA
NEXT_PUBLIC_PINATA_API_KEY=
NEXT_PUBLIC_PINATA_API_SECRET=
NEXT_PUBLIC_PINATA_GATEWAY_URL=
NEXT_PUBLIC_PINATA_JWT=
NEXT_PUBLIC_PINATA_GROUP_ID=

# PRIVY
NEXT_PUBLIC_PRIVY_APP_ID=
NEXT_PUBLIC_PRIVY_CLIENT_ID=
NEXT_PUBLIC_PRIVY_JWKS_ENDPOINT=
NEXT_PRIVY_SECRET=

# PIMLICO
NEXT_PUBLIC_PIMLICO_API_KEY=
NEXT_PUBLIC_PIMLICO_BASE_RPC=
NEXT_PUBLIC_PIMLICO_BUNDLER_URL=
NEXT_PUBLIC_PIMLICO_PAYMASTER_URL=

# CONTRACTS
NEXT_PUBLIC_APP_ENV="development" # development | production
NEXT_PUBLIC_BASE_SLICE_CONTRACT=
NEXT_PUBLIC_BASE_USDC_CONTRACT=
NEXT_PUBLIC_BASE_SEPOLIA_SLICE_CONTRACT=""
NEXT_PUBLIC_BASE_SEPOLIA_USDC_CONTRACT=""
````

## File: contracts/hardhat.config.ts
````typescript
// import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "solidity-coverage";

import "./tasks/accounts";
// import "./tasks/FHECounter";

// Run 'pnpm hardhat vars setup' to see the list of variables that need to be set

const MNEMONIC: string = vars.get("MNEMONIC", "test test test test test test test test test test test junk");
const INFURA_API_KEY: string = vars.get("INFURA_API_KEY", "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

// Base network configuration
const DEPLOYER_PRIVATE_KEY: string = vars.get("DEPLOYER_PRIVATE_KEY", "");
const DEFENDER_PRIVATE_KEY: string = vars.get("DEFENDER_PRIVATE_KEY", "");
const BASE_SEPOLIA_RPC_URL: string = vars.get("BASE_SEPOLIA_RPC_URL", "https://sepolia.base.org");
const BASE_MAINNET_RPC_URL: string = vars.get("BASE_MAINNET_RPC_URL", "https://mainnet.base.org");
const BASESCAN_API_KEY: string = vars.get("BASESCAN_API_KEY", "");

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      sepolia: vars.get("ETHERSCAN_API_KEY", ""),
      baseSepolia: BASESCAN_API_KEY,
      base: BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31337,
    },
    anvil: {
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 31337,
      url: "http://localhost:8545",
    },
    sepolia: {
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0/",
        count: 10,
      },
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY, DEFENDER_PRIVATE_KEY].filter(Boolean),
      chainId: 84532,
    },
    base: {
      url: BASE_MAINNET_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY, DEFENDER_PRIVATE_KEY].filter(Boolean),
      chainId: 8453,
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.27",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: "cancun",
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
````

## File: contracts/package.json
````json
{
  "name": "fhevm-hardhat-template",
  "description": "Hardhat-based template for developing FHEVM Solidity smart contracts",
  "version": "0.3.0-3",
  "engines": {
    "node": ">=20",
    "npm": ">=7.0.0"
  },
  "license": "BSD-3-Clause-Clear",
  "homepage": "https://github.com/zama-ai/fhevm-hardhat-template/README.md",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/zama-ai/fhevm-hardhat-template.git"
  },
  "keywords": [
    "fhevm",
    "zama",
    "eth",
    "ethereum",
    "dapps",
    "wallet",
    "web3",
    "typescript",
    "hardhat"
  ],
  "dependencies": {
    "@fhevm/solidity": "^0.10.0",
    "@openzeppelin/contracts": "^5.4.0",
    "encrypted-types": "^0.0.4"
  },
  "devDependencies": {
    "@fhevm/hardhat-plugin": "^0.3.0-3",
    "@nomicfoundation/hardhat-chai-matchers": "^2.1.0",
    "@nomicfoundation/hardhat-ethers": "^3.1.0",
    "@nomicfoundation/hardhat-network-helpers": "^1.1.0",
    "@nomicfoundation/hardhat-verify": "^2.1.0",
    "@typechain/ethers-v6": "^0.5.1",
    "@typechain/hardhat": "^9.1.0",
    "@types/chai": "^4.3.20",
    "@types/mocha": "^10.0.10",
    "@types/node": "^20.19.8",
    "@typescript-eslint/eslint-plugin": "^8.37.0",
    "@typescript-eslint/parser": "^8.37.0",
    "@zama-fhe/relayer-sdk": "^0.3.0-6",
    "chai": "^4.5.0",
    "chai-as-promised": "^8.0.1",
    "cross-env": "^7.0.3",
    "eslint": "^8.57.1",
    "eslint-config-prettier": "^9.1.0",
    "ethers": "^6.15.0",
    "hardhat": "^2.26.0",
    "hardhat-deploy": "^0.11.45",
    "hardhat-gas-reporter": "^2.3.0",
    "mocha": "^11.7.1",
    "prettier": "^3.6.2",
    "prettier-plugin-solidity": "^2.1.0",
    "rimraf": "^6.0.1",
    "solhint": "^6.0.0",
    "solidity-coverage": "^0.8.16",
    "ts-generator": "^0.1.1",
    "ts-node": "^10.9.2",
    "typechain": "^8.3.2",
    "typescript": "^5.8.3"
  },
  "files": [
    "contracts"
  ],
  "scripts": {
    "clean": "rimraf ./fhevmTemp ./artifacts ./cache ./coverage ./types ./coverage.json ./dist && npm run typechain",
    "compile": "cross-env TS_NODE_TRANSPILE_ONLY=true hardhat compile",
    "coverage": "cross-env SOLIDITY_COVERAGE=true hardhat coverage --solcoverjs ./.solcover.js --temp artifacts --testfiles \"test/**/*.ts\" && npm run typechain",
    "lint": "npm run lint:sol && npm run lint:ts && npm run prettier:check",
    "lint:sol": "solhint --max-warnings 0 \"contracts/**/*.sol\"",
    "lint:ts": "eslint --ignore-path ./.eslintignore --ext .js,.ts .",
    "postcompile": "npm run typechain",
    "prettier:check": "prettier --check \"**/*.{js,json,md,sol,ts,yml}\"",
    "prettier:write": "prettier --write \"**/*.{js,json,md,sol,ts,yml}\"",
    "test": "hardhat test",
    "test:sepolia": "hardhat test --network sepolia",
    "build:ts": "tsc --project tsconfig.json",
    "typechain": "cross-env TS_NODE_TRANSPILE_ONLY=true hardhat typechain",
    "chain": "hardhat node --network hardhat --no-deploy",
    "deploy:localhost": "hardhat deploy --network localhost",
    "deploy:sepolia": "hardhat deploy --network sepolia",
    "verify:sepolia": "hardhat verify --network sepolia"
  },
  "overrides": {
    "ws@>=7.0.0 <7.5.10": ">=7.5.10",
    "axios@>=1.3.2 <=1.7.3": ">=1.7.4",
    "elliptic@>=4.0.0 <=6.5.6": ">=6.5.7",
    "elliptic@>=2.0.0 <=6.5.6": ">=6.5.7",
    "elliptic@>=5.2.1 <=6.5.6": ">=6.5.7",
    "micromatch@<4.0.8": ">=4.0.8",
    "elliptic@<6.6.0": ">=6.6.0",
    "elliptic@<6.5.6": ">=6.5.6",
    "undici@>=6.0.0 <6.21.1": ">=6.21.1 <7.0.0",
    "undici@>=4.5.0 <5.28.5": ">=5.28.5 <6.0.0",
    "elliptic@<=6.6.0": ">=6.6.1",
    "tar-fs@>=2.0.0 <2.1.2": ">=2.1.2",
    "axios@>=1.0.0 <1.8.2": ">=1.8.2",
    "axios@<0.29.1": ">=0.29.1",
    "cookie@<0.7.0": ">=0.7.0",
    "minimatch": "^3.1.2"
  }
}
````

## File: src/util/disputeAdapter.ts
````typescript
import { formatUnits } from "viem";
import { fetchJSONFromIPFS } from "@/util/ipfs";
import { DISPUTE_STATUS } from "@/config/app";

export interface DisputeUI {
  id: string;
  title: string;
  category: string;
  status: number;
  phase: "VOTE" | "REVEAL" | "WITHDRAW" | "CLOSED";
  deadlineLabel: string;
  isUrgent: boolean;
  stake: string;
  jurorsRequired: number;
  revealDeadline: number;
  evidenceDeadline?: number;
  description: string;
  evidence: string[];
  claimer: string;
  defender: string;
  winner?: string;

  // Payment Status Fields
  claimerPaid: boolean;
  defenderPaid: boolean;

  // Real Data Fields
  claimerName?: string;
  defenderName?: string;
  audioEvidence?: string | null;
  carouselEvidence?: string[];

  // Defender Specific Fields
  defenderDescription?: string;
  defenderAudioEvidence?: string | null;
  defenderCarouselEvidence?: string[];
}

/**
 * Safely extracts a value from contract data that may be returned as an object (struct)
 * or as an array, depending on the ABI configuration and Viem version.
 */
function getField<T>(
  data: any,
  fieldName: string,
  arrayIndex: number,
  defaultValue: T,
): T {
  if (data === null || data === undefined) return defaultValue;

  // Try object property access first (preferred for named structs)
  if (data[fieldName] !== undefined) {
    return data[fieldName] as T;
  }

  // Fallback to array index access (for unnamed/tuple returns)
  if (Array.isArray(data) && data[arrayIndex] !== undefined) {
    return data[arrayIndex] as T;
  }

  // If data is an object with numeric keys (array-like object from Viem)
  if (typeof data === "object" && data[arrayIndex] !== undefined) {
    return data[arrayIndex] as T;
  }

  return defaultValue;
}

export async function transformDisputeData(
  contractData: any,
  decimals: number = 6,
): Promise<DisputeUI> {
  // Extract fields using safe accessor with fallbacks
  // Struct field order based on Solidity Dispute struct:
  // 0: id, 1: claimer, 2: defender, 3: category, 4: requiredStake,
  // 5: jurorsRequired, 6: ipfsHash, 7: commitsCount, 8: revealsCount,
  // 9: status, 10: claimerPaid, 11: defenderPaid, 12: winner,
  // 13: payDeadline, 14: evidenceDeadline, 15: commitDeadline, 16: revealDeadline

  const id = (
    getField(contractData, "id", 0, BigInt(0)) ?? contractData.id
  ).toString();
  const claimer = getField<string>(
    contractData,
    "claimer",
    1,
    "0x0000000000000000000000000000000000000000",
  );
  const defender = getField<string>(
    contractData,
    "defender",
    2,
    "0x0000000000000000000000000000000000000000",
  );
  const categoryRaw = getField<string>(contractData, "category", 3, "General");
  const requiredStake = getField<bigint>(
    contractData,
    "requiredStake",
    4,
    BigInt(0),
  );
  const jurorsRequired = Number(
    getField<bigint>(contractData, "jurorsRequired", 5, BigInt(3)),
  );
  const ipfsHash = getField<string>(contractData, "ipfsHash", 6, "");
  const status = Number(getField<number>(contractData, "status", 9, 0));
  const claimerPaid = getField<boolean>(contractData, "claimerPaid", 10, false);
  const defenderPaid = getField<boolean>(
    contractData,
    "defenderPaid",
    11,
    false,
  );
  const winnerRaw = getField<string>(
    contractData,
    "winner",
    12,
    "0x0000000000000000000000000000000000000000",
  );
  // Treat zero address as no winner
  const winner =
    winnerRaw === "0x0000000000000000000000000000000000000000"
      ? undefined
      : winnerRaw;
  const evidenceDeadline = Number(
    getField<bigint>(contractData, "evidenceDeadline", 14, BigInt(0)),
  );
  const commitDeadline = Number(
    getField<bigint>(contractData, "commitDeadline", 15, BigInt(0)),
  );
  const revealDeadline = Number(
    getField<bigint>(contractData, "revealDeadline", 16, BigInt(0)),
  );

  const now = Math.floor(Date.now() / 1000);

  // Defaults
  let title = `Dispute #${id}`;
  let description = "No description provided.";
  let defenderDescription = undefined;
  let category = categoryRaw || "General";
  let evidence: string[] = [];

  // Containers for metadata
  let audioEvidence: string | null = null;
  let carouselEvidence: string[] = [];

  // New Containers
  let defenderAudioEvidence: string | null = null;
  let defenderCarouselEvidence: string[] = [];

  let aliases = { claimer: null, defender: null };

  // Fetch IPFS Metadata
  if (ipfsHash) {
    const meta = await fetchJSONFromIPFS(ipfsHash);
    if (meta) {
      title = meta.title || title;
      description = meta.description || description;
      if (meta.category) category = meta.category;
      evidence = meta.evidence || [];

      // Capture extra fields
      audioEvidence = meta.audioEvidence || null;
      carouselEvidence = meta.carouselEvidence || [];

      // Map Defender Data
      defenderDescription = meta.defenderDescription;
      defenderAudioEvidence = meta.defenderAudioEvidence || null;
      defenderCarouselEvidence = meta.defenderCarouselEvidence || [];

      if (meta.aliases) aliases = meta.aliases;
    }
  }

  // Phase Logic
  let phase: DisputeUI["phase"] = "CLOSED";
  let deadline = 0;

  if (status === DISPUTE_STATUS.COMMIT) {
    phase = "VOTE";
    deadline = commitDeadline;
  } else if (status === DISPUTE_STATUS.REVEAL) {
    phase = "REVEAL";
    deadline = revealDeadline;
    if (now > deadline) phase = "WITHDRAW";
  } else if (status === DISPUTE_STATUS.RESOLVED) {
    phase = "CLOSED";
  }

  // Time Logic
  const diff = deadline - now;
  const isUrgent = diff < 86400 && diff > 0;
  const hours = Math.ceil(diff / 3600);
  const deadlineLabel =
    status < DISPUTE_STATUS.RESOLVED
      ? diff > 0
        ? `${hours}h left`
        : "Ended"
      : "Resolved";

  return {
    id,
    title,
    category,
    status,
    phase,
    deadlineLabel,
    isUrgent,
    stake: requiredStake ? formatUnits(requiredStake, decimals) : "0",
    jurorsRequired,
    revealDeadline,
    evidenceDeadline,
    description,
    evidence,
    claimer,
    defender,
    winner,
    claimerPaid,
    defenderPaid,

    // Map new fields using the aliases found in IPFS
    claimerName: aliases.claimer || claimer,
    defenderName: aliases.defender || defender,
    audioEvidence,
    carouselEvidence,
    defenderDescription,
    defenderAudioEvidence,
    defenderCarouselEvidence,
  };
}
````

## File: README.md
````markdown
# ⚖️ Slice Protocol Application

This project is the frontend implementation for **Slice**, a **Real-Time Dispute Resolution Protocol** built on Next.js. It features a **multi-tenant architecture** capable of running as a standalone PWA or as an embedded MiniApp across various wallet ecosystems (Base, Beexo).

**🔗 Live Demo**: [Testnet](https://dev.slicehub.xyz) | [Mainnet](https://app.slicehub.xyz)

---

## ⚡ What is Slice?

**Slice** is a **decentralized, real-time dispute resolution protocol**. It acts as a **neutral truth oracle** that resolves disputes quickly and trustlessly through **randomly selected jurors** and **economic incentives**.

We are building the **"Uber for Justice"**:
* **Decentralized & Trustless:** No central authority controls the outcome.
* **Fast & Scalable:** Designed for real-time applications, offering quick rulings compared to traditional courts.
* **Gamified Justice:** Jurors enter the Dispute Resolution Market via an **intuitive and entertaining App/MiniApp**.
* **Earn by Ruling:** Users stake tokens to become jurors and **earn money** by correctly reviewing evidence and voting on disputes.

---

## 🏗️ Architecture: Multi-Tenant & Strategy Pattern

This application uses a **Strategy Pattern** to manage wallet connections and SDK interactions. Instead of a single monolithic connection logic, we use an abstraction layer that selects the appropriate **Adapter** based on the runtime environment (detected via subdomains and SDK presence).

### 1. Connection Strategies

We support two active connection strategies (with Lemon planned):

| Strategy | Description | Used By |
|----------|-------------|---------|
| **Wagmi SW** | Uses Smart Wallets (Coinbase/Safe) via Privy & Wagmi. | **PWA**, **Base** |
| **Wagmi EOA** | Uses standard Injected (EOA) connectors. | **Beexo** |
| *(Planned)* Lemon SDK | Native `@lemoncash/mini-app-sdk`. | Lemon |

### 2. Supported MiniApps & Environments

The application behaves differently depending on the access point (Subdomain) and injected providers.

| Platform | Subdomain | Connection Strategy | Auth Type |
|----------|-----------|---------------------|-----------|
| **Standard PWA** | `app.` | **Wagmi SW** | Social / Email / Wallet |
| **Base MiniApp** | `base.` | **Wagmi SW** | Coinbase Smart Wallet |
| **Beexo** | `beexo.` | **Wagmi EOA** | Injected Provider (Beexo) |
| **Lemon (planned)** | `lemon.` | Lemon SDK | Native Lemon Auth |

---

## 🚀 Try Slice Now

Experience the future of decentralized justice on **Base**:

* **Testnet Demo**: [dev.slicehub.xyz](https://dev.slicehub.xyz) – (Base Sepolia)
* **Mainnet App**: [app.slicehub.xyz](https://app.slicehub.xyz) – (Base)

---

## ⚖️ How It Works (The Juror Flow)

1. **Enter the Market:** Users open the Slice App or MiniApp and **stake USDC** to join the juror pool.
2. **Get Drafted:** When a dispute arises, jurors are randomly selected (Drafted) to review the case.
3. **Review & Vote:** Jurors analyze the evidence provided by both parties and vote privately on the outcome.
4. **Earn Rewards:** If their vote aligns with the majority consensus, they **earn fees** from the losing party.
5. **Justice Served:** The protocol aggregates the votes and executes the ruling on-chain instantly.

---

## 🔌 Integration Guide (For Developers)

Integrating Slice into your protocol is as simple as 1-2-3:

### 1. Create a Dispute
Call `slice.createDispute(defender, category, ipfsHash, jurorsRequired)` from your contract.

### 2. Wait for Ruling
Slice handles the juror selection, voting, and consensus off-chain and on-chain.

### 3. Read the Verdict
Once the dispute status is `Executed`, read the `winner` address from the `disputes` mapping and execute your logic.

---

## 📍 Deployed Contracts

| Network | Slice Core | USDC Token |
|---------|------------|------------|
| **Base Sepolia** | `0xD8A10bD25e0E5dAD717372fA0C66d3a59a425e4D` | `0x5dEaC602762362FE5f135FA5904351916053cF70` |
| **Base Mainnet** | `0xD8A10bD25e0E5dAD717372fA0C66d3a59a425e4D` | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

---

## 🚀 Getting Started

### 1. Configure Environment

Rename `.env.example` to `.env.local` and add your keys.

```bash
NEXT_PUBLIC_APP_ENV="development" # or 'production'

# Pinata / IPFS Config
NEXT_PUBLIC_PINATA_JWT="your_pinata_jwt"
NEXT_PUBLIC_PINATA_GATEWAY_URL="your_gateway_url"

# Privy Config (For PWA / Base)
NEXT_PUBLIC_PRIVY_APP_ID="your_privy_app_id"
NEXT_PUBLIC_PRIVY_CLIENT_ID="your_privy_client_id"

# Contracts
NEXT_PUBLIC_BASE_SLICE_CONTRACT="0x..."
NEXT_PUBLIC_BASE_USDC_CONTRACT="0x..."
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Development Server

```bash
pnpm run dev
```

* **PWA Mode:** `http://localhost:3000`
* **MiniApp Mode:** Use the native testing environment provided by the wallet SDK.

---

## ⚙️ Application Configuration

The `src/config/` and `src/adapters/` directories manage the multi-environment logic.

### Abstraction Layer (`src/adapters/`)

We abstract wallet interactions behind a common interface:

* **`useWalletAdapter`** – Selects the active strategy based on environment.
* **`WagmiAdapter`** – Wraps Wagmi hooks (Smart Wallets or EOA).
* *(Planned)* **`LemonAdapter`** – Will wrap `@lemoncash/mini-app-sdk`.

### Chain Configuration (`src/config/chains.ts`)

* Exports `SUPPORTED_CHAINS` mapping Wagmi `Chain` objects to contract addresses.
* Defaults based on `NEXT_PUBLIC_APP_ENV`.

---

## 🔧 Smart Contract Development

The `contracts/` directory contains the Solidity smart contracts using **Hardhat** and **Viem**.

### Commands

```bash
pnpm hardhat compile
pnpm hardhat test
pnpm hardhat run scripts/deploy.ts --network baseSepolia
```

---

## 🗺️ Roadmap

* [x] Phase 1 – Foundation (Core Protocol, Web UI)
* [x] Phase 2 – Architecture Overhaul (Strategy Pattern, Multi-Tenant SDKs)
* [ ] Phase 3 – MiniApp Expansion (Live integration with Lemon, Beexo)
* [ ] Phase 4 – **Slice V1.2 High-Stakes Lottery** (Global Passive Staking)
* [ ] Phase 5 – Specialized Courts & DAO Governance
````

## File: src/app/layout.tsx
````typescript
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import React from "react";
import ContextProvider from "./providers";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ConsoleOverlay } from "@/components/debug/ConsoleOverlay";
import { getTenantFromHost, Tenant } from "@/config/tenant";
import { beexoConfig } from "@/adapters/beexo";
import { webConfig } from "@/adapters/web";
import { cookieToInitialState } from "wagmi";

export const metadata: Metadata = {
  title: "Slice",
  description: "Get paid for doing justice",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/slice-logo-light.svg",
    apple: "/icons/icon.png",
  },
  other: {
    "base:app_id": "6966f2640c770beef0486121",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Server-Side Detection
  const headersList = await headers();
  const host = headersList.get("host"); // e.g. "beexo.slicehub.xyz"
  const tenant = getTenantFromHost(host);

  // Use headersList, not headersData
  const cookies = headersList.get("cookie");

  // Ensure Tenant is imported so Tenant.BEEXO works
  const initialState = cookieToInitialState(
    tenant === Tenant.BEEXO ? beexoConfig : webConfig,
    cookies,
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center min-h-screen bg-gray-100`}
      >
        {/* Pass initialState, NOT cookies */}
        <ContextProvider tenant={tenant} initialState={initialState}>
          <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl relative flex flex-col">
            <div className="flex-1 flex flex-col pb-[70px]">{children}</div>

            <BottomNavigation />
            <ConsoleOverlay />
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
````

## File: src/app/providers.tsx
````typescript
"use client";

import { ReactNode } from "react";
import { Tenant } from "@/config/tenant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider as PrivyWagmiProvider } from "@privy-io/wagmi";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { TimerProvider } from "@/contexts/TimerContext";
import { beexoConfig } from "@/adapters/beexo";
import { webConfig } from "@/adapters/web";
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from "@/config/app";
import { activeChains, defaultChain } from "@/config/chains";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
  tenant: Tenant;
  initialState?: any;
}

export default function ContextProvider({
  children,
  tenant,
  initialState,
}: Props) {
  // STRATEGY: BEEXO (Pure Wagmi)
  if (tenant === Tenant.BEEXO) {
    return (
      <WagmiProvider config={beexoConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <TimerProvider>{children}</TimerProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // STRATEGY: WEB (Privy + Wagmi)
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        defaultChain: defaultChain,
        supportedChains: activeChains,
        appearance: {
          theme: "light",
          accentColor: "#1b1c23",
          logo: "/images/slice-logo-light.svg",
        },
        embeddedWallets: {
          ethereum: { createOnLogin: "users-without-wallets" },
        },
        loginMethods: ["email", "wallet"],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <PrivyWagmiProvider config={webConfig} initialState={initialState}>
          <SmartWalletsProvider>
            <TimerProvider>{children}</TimerProvider>
          </SmartWalletsProvider>
        </PrivyWagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
````

## File: src/config/chains.ts
````typescript
import { baseSepolia, base } from "wagmi/chains";
import type { Chain } from "viem";

export type ChainConfig = {
  chain: Chain;
  contracts: {
    slice: string;
    usdc: string;
  };
};

// 1. Define configurations
const SEPOLIA_CONFIG: ChainConfig = {
  chain: baseSepolia,
  contracts: {
    slice: process.env.NEXT_PUBLIC_BASE_SEPOLIA_SLICE_CONTRACT!,
    usdc: process.env.NEXT_PUBLIC_BASE_SEPOLIA_USDC_CONTRACT!,
  },
};

const MAINNET_CONFIG: ChainConfig = {
  chain: base,
  contracts: {
    slice: process.env.NEXT_PUBLIC_BASE_SLICE_CONTRACT!,
    usdc: process.env.NEXT_PUBLIC_BASE_USDC_CONTRACT!,
  },
};

// 2. Determine Environment
const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

// 3. Dynamic Export: Target chain is ALWAYS first
export const SUPPORTED_CHAINS: ChainConfig[] = isProd
  ? [MAINNET_CONFIG, SEPOLIA_CONFIG] // Prod: Base First
  : [SEPOLIA_CONFIG, MAINNET_CONFIG]; // Dev: Sepolia First

export const DEFAULT_CHAIN_CONFIG = SUPPORTED_CHAINS[0];
export const defaultChain = DEFAULT_CHAIN_CONFIG.chain;
export const DEFAULT_CHAIN = DEFAULT_CHAIN_CONFIG;

// 4. Export plain chain objects for Wagmi
export const activeChains = SUPPORTED_CHAINS.map((c) => c.chain) as [
  Chain,
  ...Chain[],
];
````

## File: package.json
````json
{
  "name": "slice-app",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "tsc && eslint .",
    "format": "npx prettier --write ."
  },
  "dependencies": {
    "@base-org/account": "^2.5.1",
    "@base-org/account-ui": "^1.0.1",
    "@coinbase/onchainkit": "^1.1.2",
    "@ducanh2912/next-pwa": "^10.2.9",
    "@farcaster/miniapp-sdk": "^0.2.1",
    "@farcaster/quick-auth": "^0.0.8",
    "@privy-io/react-auth": "^3.9.1",
    "@privy-io/wagmi": "^2.1.2",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@tanstack/react-query": "^5.59.20",
    "@use-gesture/react": "^10.3.1",
    "@yudiel/react-qr-scanner": "^2.5.0",
    "axios": "^1.13.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lottie-react": "^2.4.1",
    "lucide-react": "^0.556.0",
    "motion": "^12.23.26",
    "next": "16.1.1",
    "next-themes": "^0.4.6",
    "permissionless": "^0.2.57",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "viem": "^2.31.3",
    "wagmi": "^2.12.31",
    "xo-connect": "^2.1.3"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.3",
    "@eslint/js": "^9.39.2",
    "@next/eslint-plugin-next": "^16.1.3",
    "@nomicfoundation/hardhat-ignition": "^3.0.6",
    "@nomicfoundation/hardhat-toolbox-viem": "^5.0.1",
    "@tailwindcss/postcss": "^4.1.17",
    "@types/node": "^22.8.5",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@typescript-eslint/eslint-plugin": "^8.53.0",
    "@typescript-eslint/parser": "^8.53.0",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.0.1",
    "forge-std": "github:foundry-rs/forge-std#v1.9.4",
    "globals": "^17.0.0",
    "hardhat": "^3.1.0",
    "knip": "^5.77.2",
    "tailwindcss": "^4.1.17",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5.8.3"
  },
  "ignoreScripts": [
    "sharp",
    "unrs-resolver"
  ],
  "trustedDependencies": [
    "sharp",
    "unrs-resolver"
  ]
}
````
