const Lottery = artifacts.require("Lottery");

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

let lottery;

contract("Lottery", async accounts => {

    beforeEach(async() => {
        lottery = await Lottery.new({from: accounts[0]});
    });

    it('deploy a contract', () => {
        assert.ok(lottery);
    });

    it('allows one account to enter', async() => {

        await lottery.enter({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });

        const players = await lottery.getPlayers({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);

    });

    it('allows multiple accounts to enter', async() => {

        await lottery.enter({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });

        await lottery.enter({
            from: accounts[1],
            value: web3.utils.toWei('0.02','ether')
        });

        await lottery.enter({
            from: accounts[2],
            value: web3.utils.toWei('0.02','ether')
        });

        const players = await lottery.getPlayers({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);

    });

    it('requires a minimum amount of ether to enter', async() => {
        try{
            await lottery.enter({
                from: accounts[0],
                value: 200
            });
            assert(false);
        }catch(err){
            assert.ok(err);
        }
    });

    it('only manager can call pickWinner', async() => {
        
            try{
                await lottery.pickWinner({
                    from: accounts[1]
                });
                assert(false);
            }catch(err){
                assert.ok(err);
            }        
    });

    it('sends money to ther winner and resets players array', async() => {
        await lottery.enter({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        
    });

});