const ThivaToken = artifacts.require("./ThivaToken");

module.exports = function(deployer) {
  deployer.deploy(ThivaToken,100000000);
};
