import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

async function main() {
  // 1. Generate a random private key
  const privateKey = generatePrivateKey();

  // 2. Derive the account (address) from the private key
  const account = privateKeyToAccount(privateKey);

  console.log("xx------------------------------------------------------xx");
  console.log("🔐 NEW WALLET GENERATED");
  console.log("xx------------------------------------------------------xx");
  console.log("");
  console.log(`📂 Public Address:  ${account.address}`);
  console.log(`🔑 Private Key:     ${privateKey}`);
  console.log("");
  console.log("⚠️  SAVE THIS PRIVATE KEY SECURELY. NEVER COMMIT IT TO GIT.");
  console.log("xx------------------------------------------------------xx");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
