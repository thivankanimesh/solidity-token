const web3 = require('web3');
const { duration, latest, increase, increaseTo } = require('../node_modules/@openzeppelin/test-helpers/src/time.js');

const BigNumber = web3.BigNumber;
const BN = web3.utils.BN;

require('chai').use(require('chai-as-promised')).use(require('chai-bignumber')(BigNumber)).should();

const ThivaToken = artifacts.require("ThivaToken");
const ThivaTokenCrowdsale = artifacts.require('ThivaTokenCrowdsale');

contract('ThivaTokenCrowdsale', accounts => {

    beforeEach(async() => {

        this.rate = 500;
        this.wallet = accounts[0];
        this.cap = await web3.utils.toWei('100', 'ether');
        this.investerMinCap = 2;
        this.investerMaxCap = 5000;
        this.openingTime = Number(Number(await latest()) + Number(duration.weeks(1)));
        this.closingTime = Number(Number(this.openingTime) + Number(duration.weeks(1)));

        this.thivaToken = await ThivaToken.new(100000000, { from: accounts[0] });
        this.thivaTokenCrowdsale = await ThivaTokenCrowdsale.new(this.rate, this.wallet, this.thivaToken.address, this.cap, this.openingTime, this.closingTime, {from: accounts[0]});

        //await this.thivaToken.transferOwnership(this.thivaTokenCrowdsale.address);

        await this.thivaToken.addMinter(this.thivaTokenCrowdsale.address, { from: accounts[0] });
        await this.thivaToken.renounceMinter({ from: accounts[0] });

        // Advance time to crowdsale start
        await increaseTo(Number(new BN(this.openingTime).add(new BN(1))));

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

    describe('capped crowdsale', async() => {

        it('has the correct hard cap', async() => {

            const cap = await this.thivaTokenCrowdsale.cap();
            assert.equal(cap, this.cap);
            //cap.should.be.bignumber.equal(this.cap);

        });

    });

    describe('buyToken()', () => {

        describe('when the contribution is less than the minimun cap', () => {

            it('rejects the transaction', async() => {

                const value = this.investerMinCap -1;
                await this.thivaTokenCrowdsale.buyTokens(accounts[1], { value: value, from: accounts[1] }).should.be.rejectedWith('revert');

            });

        });

        describe('when the invester already met the minimum cap', () => {

            it('allows the invest below the min cap', async() => {
                
                const value1 = 2;
                await this.thivaTokenCrowdsale.buyTokens(accounts[1], { value: value1, from: accounts[1] });

                const value2 = 1;
                await this.thivaTokenCrowdsale.buyTokens(accounts[1], { value: value2, from: accounts[1] }).should.be.fulfilled;

            });

        });

        describe('when the contribution is within the valid range', async() => {

            const value = 30;

            it('succeeds and update the contribution amount', async() => {

                await this.thivaTokenCrowdsale.buyTokens(accounts[1], { value: value, from: accounts[1] }).should.be.fulfilled;
                const contribution = await this.thivaTokenCrowdsale.getUserContribution(accounts[1]);
                assert.equal(value, contribution);

            });

        });

    });

    describe('timedcrowdsale', () => {

        it('is open', async() => {

            const isClosed = await this.thivaTokenCrowdsale.hasClosed();
            isClosed.should.be.false;

        });

    });

});