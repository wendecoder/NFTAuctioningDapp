import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
import { NFTAuction, NFTAuction__factory } from "../typechain-types";

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
  // const accounts = await ethers.getSigners()
  const NFTAuctionFactory = new NFTAuction__factory(wallet);
  const NFTAuctionContract = await NFTAuctionFactory.deploy(
    process.env.AuATokenContract ?? "",
    process.env.AuANFTContractAddress ?? ""
  )

  // const NFTAuctionContract = NFTAuctionFactory.attach(
  //   process.env.NFTAuctionContractAddress ?? ""
  // ) as NFTAuction;
  await NFTAuctionContract.waitForDeployment();
  console.log(`Contract deployed to ${NFTAuctionContract.target}`);

  const mintNft2 = await NFTAuctionContract.mintNFT();
  mintNft2.wait();
  console.log(`Minted successfully ${mintNft2.hash}`)
  const tokenId1 = await NFTAuctionContract.innerAddress();

  console.log(`the token id is ${tokenId1}`);
  // const getUserNFTS = await NFTAuctionContract.getUserNFTs();
  // console.log(`User history ${getUserNFTS}`);
  // const metadata = await NFTAuctionContract.getNFTMetadata(tokenId);
  // // Decode base64 string
  // const decodedMetadata = atob(metadata.split(",")[1]);

  // // Parse JSON data
  // const parsedMetadata = JSON.parse(decodedMetadata);

  // Log the parsed metadata to the console
  // console.log(parsedMetadata);
}

deploy().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
