# 🗳️ BlockVote  
### Secure Voting System using Blockchain based on MACI (Minimal Anti-Collusion Infrastructure)

---

## 📘 Project Overview  

**BlockVote** is a hybrid **web and mobile platform** designed to provide **secure, transparent, and tamper-resistant digital voting**.  
The system leverages **blockchain** for immutable record-keeping and Groth16 k-snarks for voter anonymity and authentication.

Developed as part of the **AASTMT College of Computing and Information Technology – Cybersecurity Graduation Project (2025–2026)**, BlockVote demonstrates how decentralized technologies can ensure **trust**, **integrity**, and **verifiability** in modern digital elections.  

---

## 🎯 Objectives  

- Guarantee **data integrity** and prevent vote tampering through blockchain immutability.  
- Ensure **voter anonymity** and **privacy** using cryptographic techniques.
- Provide a **user-friendly interface** for both web and mobile platforms.

---

## 🧠 Key Features  

✅ Blockchain-based decentralized voting ledger  
✅ Secure voter identity verification with cryptographic keys  
✅ Tamper-proof and transparent result auditing  
✅ Admin dashboard for real-time monitoring  

---

## 🧪 Technology Stack  

Frontend (dApp)
	•	Next.js 14 + React 18 + TypeScript  ￼
	•	Web3 UI/wallet: RainbowKit + wagmi + viem  ￼
	•	Styling: Tailwind CSS + daisyUI  ￼
	•	State/utils: Zustand, Axios, etc.  ￼
	•	ZK-related libs on frontend: snarkjs, circomlib, circomkit, @zk-kit/circuits  ￼

Smart contracts / backend
	•	Hardhat (TypeScript-based setup) + Solidity 0.8.20  ￼
	•	Deploy tooling: hardhat-deploy, hardhat-verify, typechain  ￼
	•	Ethereum libs: ethers v6 (dev), @ethersproject/* (some deps)  ￼
	•	Networks/infra: Alchemy RPC endpoints configured (mainnet, sepolia, L2s, etc.)  ￼

Privacy / ZK voting core
	•	MACI stack: maci-contracts, maci-cli, maci-circuits, maci-crypto, maci-domainobjs, maci-core  ￼
	•	Includes MACI tasks for merge/prove and a script to download zkeys.
---

## 🧑‍💻 Team Members  
- [**Karim Elmasry**](https://github.com/karimelmasry42)
- [**Amer Ashoush**](https://github.com/Mororock6)
- [**Omar Hamdy**](https://github.com/OmarHamdy24)
- [**Yousef Kamal**](https://github.com/YxFarghaly)
- [**Felopater Osama**](https://github.com/Felopater75)

**Supervisor:** Dr. Hesham Dahshan  
*Arab Academy for Science, Technology and Maritime Transport (AASTMT)*  

---

## ⚙️ How to Run (Development Setup)
## Features

- **Voter Registration**: Secure registration process through the MACI contract, enabling eligible voting.
- **Poll Management**: Admins can easily create and manage polls, including question and options setup.
- **Secure Voting**: Leverage MACI's privacy-preserving technology to ensure votes are cast anonymously and securely.
- **Results Display**: Transparent display of poll results after the voting phase concludes.
- **Admin Dashboard**: Comprehensive admin interface for poll oversight, including current status and results analytics.

## Requirements

Ensure you have the following tools installed before you proceed:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

Jumpstart your development with these simple steps:

1. **Clone and Set Up the Project**

```bash
git clone https://github.com/karimelmasry42/blockvote.git
cd blockvote
yarn install
```

2. **Download the zkeys for the maci circuits**

In your first terminal window, run:

```bash
yarn download-zkeys
```

3. **Update the environment variables**

Copy the env example files to env files

```bash
cp packages/hardhat/.env.example packages/hardhat/.env
cp packages/nextjs/.env.example packages/nextjs/.env.local
```

Update the values of the env variables in these new .env files

4. **Start a Local Ethereum Network**

In your first terminal window, run:

```bash
yarn chain
```

This initiates a local Ethereum network via Hardhat for development and testing purposes. Adjust the network settings in `hardhat.config.ts` as needed.

5. **Deploy Contracts**

In a second terminal, deploy your test contract with:

```bash
yarn deploy
```

Find the contract in `packages/hardhat/contracts`. This script deploys your contract to the local network, with customization available in `packages/hardhat/deploy`.

6. **Launch the NextJS Application**

In a third terminal, start the NextJS frontend:

```bash
yarn start
```

7. **Compute Results**

- Update `packages/hardhat/deploy-config.json` file, select the network, and in the `Poll` object, update `coordinatorPubkey` to the coordinator public key in the `packages/hardhat/coordinatorKeyPair.json`, and update `useQuadraticVoting` if you want to compute results for a non quadratic vote.
- Merge the poll, using `yarn hardhat merge --poll {poll id}`
- Generate proof, using `yarn hardhat prove --poll {poll id} --output-dir {proof ouput dir} --coordinator-private-key {coordinator private key} --tally-file {tally output file}`

Navigate to `http://localhost:3000` to interact with your dApp. Modify your app configuration in `packages/nextjs/scaffold.config.ts` and `packages/hardhat/constants.ts` as necessary.

The deployed contracts will be saved to the file `packages/hardhat/contractAddresses.json`, this file is compatible with maci cli.

The coordinator keys will be stored in the file `packages/hardhat/coordinatorKeyPair.json`.

## Usage

After setting up the project, you can:

- **Register**: Use the app's interface to register with the MACI contract and gain voting rights.
- **Create Polls**: As an admin, you can create polls with custom questions and options.
- **Vote**: Registered voters can participate in polls, utilizing MACI's secure voting mechanism.
- **View Results**: Access poll outcomes after the voting phase ends.
- **Admin Dashboard**: Monitor and manage ongoing polls, including viewing detailed poll status.

## Contributing

Your contributions are welcome! Feel free to report issues, submit fixes, or suggest new features to enhance the project.

## License

This project is licensed under the [MIT License](LICENSE).
