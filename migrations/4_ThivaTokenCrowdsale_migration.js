const ThivaToken = artifacts.require("./ThivaToken");
const ThivaTokenCrowdsale = artifacts.require("./ThivaTokenCrowdsale");
const { duration, latest, increase, increaseTo } = require('../node_modules/@openzeppelin/test-helpers/src/time.js');

module.exports = async function(deployer, networks, accounts) {
  const thivaToken = await ThivaToken.deployed();
  deployer.deploy(ThivaTokenCrowdsale, 100, accounts[0], thivaToken.address, 1000000, await latest() + duration.weeks(1), await latest() + duration.weeks(1)+ duration.weeks(1), 500000);
};