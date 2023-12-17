import { ethers } from "hardhat";
import { expect } from "chai";
import { AuA, AuA__factory, NFTAuction, NFTAuction__factory, AuANFT, AuANFT__factory } from "../typechain-types";


describe("NFTAuction", function () {

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    const AuATokenFactory = new AuANFT__factory(accounts[0]);
    const AuATokenContract = await AuATokenFactory.deploy();
    await AuATokenContract.waitForDeployment();
    const AuANFTFactory = new AuANFT__factory(accounts[0]);
    const AuANFTContract = await AuANFTFactory.deploy();
    await AuANFTContract.waitForDeployment();
    const NFTAuctionFactory = new NFTAuction__factory(accounts[0]);
    const NFTAuction = await NFTAuctionFactory.deploy(
      AuATokenContract.target,
      AuANFTContract.target
    );
    NFTAuction.waitForDeployment;
  });

  it("Should list NFT for auction", async function () {
    // Mock token contract

    // Set listing fee
    await nftAuction.setListingFee(parseUnits("1", 18));

    // List NFT for auction
    await expect(
      nftAuction
        .connect(await ethers.provider.getSigner(0))
        .listNFTForAuction(token.address, 1, parseUnits("0.1", 18), Math.floor(Date.now() / 1000) + 3600, 3600, token.address, parseUnits("1", 18))
    ).to.emit(nftAuction, "NFTListed");

    const auction = await nftAuction.auctions(1);
    expect(auction.tokenId).to.equal(1);
  });

  it("Should place a bid", async function () {
    // Mock token contract
    const MockToken = await ethers.getContractFactory("MockToken");
    const token = await MockToken.deploy();

    // Set listing fee
    await nftAuction.setListingFee(parseUnits("1", 18));

    // List NFT for auction
    await nftAuction
      .connect(await ethers.provider.getSigner(0))
      .listNFTForAuction(token.address, 1, parseUnits("0.1", 18), Math.floor(Date.now() / 1000) + 3600, 3600, token.address, parseUnits("1", 18));

    // Place a bid
    await token.connect(await ethers.provider.getSigner(1)).approve(nftAuction.address, parseUnits("0.2", 18));

    await expect(nftAuction.connect(await ethers.provider.getSigner(1)).placeBid(1, parseUnits("0.2", 18), token.address)).to.emit(
      nftAuction,
      "BidPlaced"
    );

    const auction = await nftAuction.auctions(1);
    expect(auction.highestBidder).to.equal(await ethers.provider.getSigner(1).getAddress());
  });

  it("Should end the auction", async function () {
    // Mock token contract
    const MockToken = await ethers.getContractFactory("MockToken");
    const token = await MockToken.deploy();

    // Set listing fee
    await nftAuction.setListingFee(parseUnits("1", 18));

    // List NFT for auction
    await nftAuction
      .connect(await ethers.provider.getSigner(0))
      .listNFTForAuction(token.address, 1, parseUnits("0.1", 18), Math.floor(Date.now() / 1000) + 3600, 3600, token.address, parseUnits("1", 18));

    // Place a bid
    await token.connect(await ethers.provider.getSigner(1)).approve(nftAuction.address, parseUnits("0.2", 18));
    await nftAuction.connect(await ethers.provider.getSigner(1)).placeBid(1, parseUnits("0.2", 18), token.address);

    // Fast-forward time to end the auction
    await ethers.provider.send("evm_increaseTime", [3601]);
    await ethers.provider.send("evm_mine", []);

    // End the auction
    await expect(nftAuction.connect(await ethers.provider.getSigner(0)).endAuction(1)).to.emit(nftAuction, "AuctionEnded");

    const auction = await nftAuction.auctions(1);
    expect(auction.ended).to.equal(true);
  });
});
