const ThivaTokenCrowdsale = artifacts.require("./ThivaTokenCrowdsale");
const ThivaToken = artifacts.require("ThivaToken");

module.exports = function(deployer, accounts) {
  deployer.deploy(ThivaTokenCrowdsale, 100, accounts[0], ThivaToken);
};