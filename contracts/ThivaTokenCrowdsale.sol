pragma solidity >=0.4.21 <0.7.0;

import "../node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";

contract ThivaTokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale {

    uint256 public investorMinCap = 2;
    uint256 public investerMaxCap = 5000;

    mapping(address => uint256) public contributors;

    constructor( uint256 rate, address payable wallet, IERC20 token, uint256 _cap, uint256 _openingTime, uint256 _closingTime) Crowdsale(rate, wallet, token) CappedCrowdsale(_cap) TimedCrowdsale(_openingTime, _closingTime) public {

    }

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal view {

        super._preValidatePurchase(_beneficiary, _weiAmount);
        uint256 _existingContribution = contributors[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(_newContribution >= investorMinCap && _newContribution <= investerMaxCap);
    }

    function _updatePurchasingState(address _beneficiary, uint256 _weiAmount) internal {
        
        uint256 _existingContribution = contributors[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        contributors[_beneficiary] = _newContribution;

    }

    function getUserContribution(address _beneficiary) public view returns(uint256) {

        return contributors[_beneficiary];

    }

}