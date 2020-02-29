const ThivaToken = artifacts.require("ThivaToken");

let instance;

beforeEach(async() => {
    instance = await ThivaToken.new(100000000);
});

contract("ThivaToken", async accounts => {

    it("should put 100000000 ThivaToken in the first account", async () => {
        let balance = await instance.balanceOf.call(accounts[0]);
        assert.equal(balance.valueOf(), 100000000);
    });

});