// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// Import necessary ERC-721 interfaces
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

interface IAuANFT {
    function mint(address to) external returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function tokenURI(uint256 tokenId) external view returns (string memory);
    function approve(address to, uint256 tokenId) external;
    function balanceOf(address owner) external view returns (uint256 balance);
}

interface IAuAToken {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}


contract NFTAuction is Ownable {
    // Define auction structure
    struct Auction {
        address owner;
        IAuANFT nftContract;
        uint256 tokenId;
        uint256 startingPrice;
        uint256 startTime; 
        uint256 endTime;
        address highestBidder;
        uint256 highestBid;
        bool ended;
    }
    
    IAuAToken public paymentTokenAddress;
    IAuANFT public NftContractAddress;
    uint256 public innerAddress;

    // Mapping of tokenId to active auctions
    mapping(uint256 => Auction) public auctions;
    // Mapping of address to NFT token IDs
    mapping(address => uint256[]) public userNFTs;

    constructor(IAuAToken _paymentTokenAddress, IAuANFT _NftContractAddress){
        paymentTokenAddress = _paymentTokenAddress;
        NftContractAddress = _NftContractAddress;
    }
    // Function to get the NFT token IDs of a user
    function getUserNFTs() external view returns (uint256[] memory) {
        return userNFTs[msg.sender];
    }

    function mintNFT() public {
        address sender = msg.sender;
        uint256 tokenId = NftContractAddress.mint(sender);
        innerAddress = tokenId;
        userNFTs[msg.sender].push(tokenId);
    }
    
    // Function to list an NFT for auction with scheduling
    function listNFTForAuction(uint256 tokenId, uint256 _startingPrice, uint256 _startTime, uint256 _duration) external {
        // Check if the user has an amount equal to listingFee AuA
        require(paymentTokenAddress.balanceOf(msg.sender) > listingFee, "You don't have enough AuA to cover the listing Fee");
        // Check if the user is indeed the owner of the NFT
        require(NftContractAddress.ownerOf(tokenId) == msg.sender, "The NFT doesn't belong to you");

        // Check if there is no active auction for the NFT
        require(!auctions[tokenId].ended, "NFT is already in an active auction");

        // require(_startTime > block.timestamp, "The starting time should be in the future");
        // Transfer the listing fee from the user to the auction contract
        paymentTokenAddress.transferFrom(msg.sender, address(this), listingFee);

        // Set auction details
        auctions[tokenId] = Auction({
            owner: msg.sender,
            nftContract: NftContractAddress,
            tokenId: tokenId,
            startingPrice: _startingPrice,
            startTime: block.timestamp + _startTime,
            endTime: block.timestamp + _startTime + _duration,
            highestBidder: address(0),
            highestBid: 0,
            ended: false    
        });
        
        NftContractAddress.transferFrom(msg.sender, address(this), tokenId);
        // Emit event signaling the listing
        emit NFTListed(tokenId, msg.sender, listingFee);
    }
    // Event to signal the listing of an NFT
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 listingFee);
    // Function to place a bid in a specific token
    function placeBid(uint256 _tokenId, uint256 _bidAmount) external {
        Auction storage auction = auctions[_tokenId];

        // Check that the auction is ongoing
        require(!auction.ended, "Auction has ended");

        // Check that the bid amount is greater than the current highest bid
        require(_bidAmount > auction.highestBid, "Bid amount must be greater than the current highest bid");

        // Transfer the bid amount in the specified token to the auction contract
        paymentTokenAddress.transferFrom(msg.sender, address(this), _bidAmount);

        // Refund the previous highest bidder (if any)
        if (auction.highestBidder != address(0)) {
            paymentTokenAddress.transfer(auction.highestBidder, auction.highestBid);
        }

        // Update auction details with the new highest bid
        auction.highestBidder = msg.sender;
        auction.highestBid = _bidAmount;

        // Emit event signaling a new bid
        emit BidPlaced(_tokenId, msg.sender, _bidAmount);
    }

    // Event to signal a new bid
    event BidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 bidAmount);

    // Event to singal end of the auction
    event AuctionEnded(uint256 indexed tokenId, address indexed winner, uint256 winningBid);
    // Function to end the auction when the specified end time is reached
    function endAuction(uint256 _tokenId) external {
        Auction storage auction = auctions[_tokenId];

        // Check that the auction has not ended already
        require(!auction.ended, "Auction has already ended");

        // Check that the current time is after the auction end time
        require(block.timestamp >= auction.endTime, "Auction has not ended yet");

        // Mark the auction as ended
        auction.ended = true;

        // Transfer the NFT to the highest bidder
        auction.nftContract.transferFrom(auction.owner, auction.highestBidder, auction.tokenId);

        // Emit event signaling the end of the auction
        emit AuctionEnded(_tokenId, auction.highestBidder, auction.highestBid);
    }
    function emergencyWithdrawETH() external onlyOwner {
        // Transfer all Ether to the contract owner
        payable(owner()).transfer(address(this).balance);

        // Emit an event for the emergency withdrawal
        emit EmergencyWithdrawal(owner(), address(this).balance);
    }
    // Event for emergency withdrawal
    event EmergencyWithdrawal(address indexed owner, uint256 amount);


    uint256 private listingFee;

    function setListingFee(uint256 _listingFee) external onlyOwner {
        listingFee = _listingFee;

        // Emit an event for the listing fee update
        emit ListingFeeUpdated(_listingFee);
    }

    // Event for listing fee update
    event ListingFeeUpdated(uint256 newListingFee);

    // Function to get the current listing fee
    function getListingFee() external view returns (uint256) {
        return listingFee;
    }



    // Function to withdraw ERC-20 tokens, accessible only by the owner
    function emergencyWithdrawERC20(address _token) external onlyOwner {
        // Get the contract's ERC-20 token balance
        uint256 tokenBalance = IERC20(_token).balanceOf(address(this));

        // Transfer the ERC-20 tokens to the contract owner
        require(IERC20(_token).transfer(owner(), tokenBalance), "Token transfer failed");

        // Emit an event for the emergency ERC-20 token withdrawal
        emit EmergencyTokenWithdrawal(_token, owner(), tokenBalance);
    }

    // Event for emergency ERC-20 token withdrawal
    event EmergencyTokenWithdrawal(address indexed token, address indexed owner, uint256 amount);

    // Function to get metadata of an NFT using the NFT contract address and token ID
    function getNFTMetadata(uint256 _tokenId) external view returns (string memory) {
        // Check if the NFT exists
        require(NftContractAddress.ownerOf(_tokenId) != address(0), "NFT does not exist");

        // Call the metadata function of the ERC-721 contract
        string memory metadata = NftContractAddress.tokenURI(_tokenId);

        return metadata;
    }
}