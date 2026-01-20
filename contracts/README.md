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
