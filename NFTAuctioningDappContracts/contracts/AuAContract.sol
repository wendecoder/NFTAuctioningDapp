// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AuA is ERC20 {
    using SafeMath for uint256;

    address public owner;
    uint256 public ethToAuARate;

    event AuAMinted(address indexed recipient, uint256 ethAmount, uint256 auAAmount);
    event AuAConverted(address indexed recipient, uint256 auAAmount, uint256 ethAmount);

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(address(this), initialSupply);
        owner = msg.sender;
        ethToAuARate = 11111; // 1 ETH = 11111 AuA (adjust as needed)
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    receive() external payable {
        convertEthToAuA();
    }

    function convertEthToAuA() public payable {
        require(msg.value > 0, "Must send ETH");
        uint256 auAAmount = msg.value.mul(ethToAuARate);
        _mint(msg.sender, auAAmount);
        emit AuAMinted(msg.sender, msg.value, auAAmount);
    }

    function convertAuAToEth(uint256 auAAmount) external {
        require(auAAmount > 0, "AuA amount must be greater than 0");
        require(balanceOf(msg.sender) >= auAAmount, "Insufficient AuA balance");

        uint256 ethAmount = auAAmount.div(ethToAuARate);
        _burn(msg.sender, auAAmount);
        payable(msg.sender).transfer(ethAmount);

        emit AuAConverted(msg.sender, auAAmount, ethAmount);
    }

    function setEthToAuARate(uint256 newRate) external onlyOwner {
        ethToAuARate = newRate;
    }
}