const BigNumber = web3.BigNumber;

require('chai').use(require('chai-as-promised')).use(require('chai-bignumber')(BigNumber)).should();

const ThivaToken = artifacts.require("ThivaToken");
const ThivaTokenCrowdsale = artifacts.require('ThivaTokenCrowdsale');

contract('ThivaTokenCrowdsale', accounts => {

    beforeEach(async() => {

        this.thivaToken = await ThivaToken.new(100000000);

        this.rate = 500;
        this.wallet = accounts[0];

        this.thivaTokenCrowdsale = await ThivaTokenCrowdsale.new(this.rate, this.wallet, this.thivaToken.address);

        //await this.thivaToken.transferOwnership(this.thivaTokenCrowdsale.address);

    });

    describe("ThivaTokenCrowdsale", () => {

        it('tracks the token', async() => {

            const token = await this.thivaTokenCrowdsale.token();
            token.should.equal(this.thivaToken.address);

        });  

        it('track the rate', async() => {

            const rate = await this.thivaTokenCrowdsale.rate();
            assert.equal(this.rate, rate);

        });

        it('track the wallet', async() => {
            const wallet = await this.thivaTokenCrowdsale.wallet();
            wallet.should.equal(this.wallet);
        });

    });

    describe('accepting payments', () => {

        it('mints tokens after purchase', async() => {

            const value = web3.utils.toWei('1', 'ether');

            const originalSuppy = await this.thivaToken.totalSupply();
            console.log('originalSuppy :'+originalSuppy);
            await this.thivaTokenCrowdsale.sendTransaction({value: value, from: accounts[1]});
            const newTotalSupply = await this.thivaToken.totalSupply();

            
            console.log('newTotalSupply :'+newTotalSupply);

            assert.isTrue(newTotalSupply > originalSuppy);

        });

        it('should accept payment', async() => {

            const value = web3.utils.toWei('1', 'ether');
            console.log(accounts[2]);
            await this.thivaTokenCrowdsale.sendTransaction({value: value, from: accounts[1]}).should.be.fulfilled;
            await this.thivaTokenCrowdsale.buyTokens(accounts[2], {value: value, from: accounts[1]}).should.be.fulfilled;

        });

    });

});