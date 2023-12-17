import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import { AuANFT__factory } from "../typechain-types";

async function deploy() {
  // Configuring the provider
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ""
  );

  // Configuring the wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  console.log(`Using address ${wallet.address}`);
  const Walletbalance = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(Walletbalance));
  console.log(`Wallet balance ${balance} ETH`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  const NFTFactory = new AuANFT__factory(wallet);
  const NFTContract = await NFTFactory.deploy();
  await NFTContract.waitForDeployment();

  console.log(`Contract deployed to ${NFTContract.target}`);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
