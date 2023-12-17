import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();
import { NFTAuction, NFTAuction__factory } from "../typechain-types";

async function update(){

  const listingFee = "5";
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
  const NFTAuctionFactory = new NFTAuction__factory(wallet);
  const NFTAuctionContract = NFTAuctionFactory.attach(
    process.env.NFTAuctionContractAddress ?? ""
  ) as NFTAuction;
  const updatedListingFee = await NFTAuctionContract.setListingFee(ethers.parseUnits(listingFee));
  console.log(`Listing fee updated to ${listingFee}`);

}

update().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})