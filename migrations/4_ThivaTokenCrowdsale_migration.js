const ThivaToken = artifacts.require("./ThivaToken");
const ThivaTokenCrowdsale = artifacts.require("./ThivaTokenCrowdsale");

module.exports = async function(deployer, networks, accounts) {
  const thivaToken = await ThivaToken.deployed();
  deployer.deploy(ThivaTokenCrowdsale, 100, accounts[0], thivaToken.address, 100);
};