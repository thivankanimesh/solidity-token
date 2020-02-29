pragma solidity >=0.4.21 <0.7.0;

import "../node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ThivaTokenCrowdsale is Crowdsale, MintedCrowdsale {

    constructor(uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) public {

    }

}