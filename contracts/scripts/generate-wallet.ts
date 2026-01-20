import { generateMnemonic, english, mnemonicToAccount } from "viem/accounts";
import { toHex } from "viem";

async function main() {
  console.log("🎲 Generating new wallet credentials...\n");

  // 1. Generate a standard 12-word mnemonic
  const mnemonic = generateMnemonic(english);

  // 2. Derive the account from the seed phrase
  const account = mnemonicToAccount(mnemonic, { accountIndex: 0 });

  // 3. Extract the private key using getHdKey()
  // The private key is a Uint8Array, so we convert it to a Hex string
  const hdKey = account.getHdKey();
  const privateKey = hdKey.privateKey ? toHex(hdKey.privateKey) : "ERROR_NO_KEY";

  console.log("====================================================");
  console.log("📝 MNEMONIC PHRASE (SAVE THIS SECURELY):");
  console.log(mnemonic);
  console.log("====================================================\n");

  console.log("🔑 PRIVATE KEY (For Hardhat Vars):");
  console.log(privateKey); // This will print the 0x... string you need
  console.log("\n👛 DEPLOYER ADDRESS:");
  console.log(account.address);
  console.log("====================================================");
}

main().catch(console.error);
