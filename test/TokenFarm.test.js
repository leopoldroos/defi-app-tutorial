const { assert } = require('chai');
const web3 = require('web3');

const DappToken = artifacts.require('DappToken');
const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai').use(require('chai-as-promised')).should();

const tokens = n => web3.utils.toWei(n.toString(), 'Ether');

// sicne we get array of accounts... accounts[0] is owner
contract('TokenFarm', ([owner, investor]) => {
    let daiToken, dappToken, tokenFarm;
    before(async () => {
        // Load contracts
        daiToken = await DaiToken.new();
        dappToken = await DappToken.new();
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

        // Transfer all Dapp tokens to farm (1 million)
        await dappToken.transfer(tokenFarm.address, tokens(1000000));

        // Send tokens to investor:
        await daiToken.transfer(investor, tokens(100), { from: owner });
    });

    describe('Mock Dai deployment', async () => {
        it('has a name', async () => {
            assert.equal(await daiToken.name(), 'Mock DAI Token');
        });
    });

    describe('DAPP deployment', async () => {
        it('has a name', async () => {
            assert.equal(await dappToken.name(), 'DApp Token');
        });
    });

    describe('Token Farm deployment', async () => {
        it('has a name', async () => {
            assert.equal(await tokenFarm.name(), 'Dapp Token Farm');
        });

        it('has tokens', async () => {
            assert.equal(
                await dappToken.balanceOf(tokenFarm.address),
                tokens(1000000)
            );
        });
    });

    describe('Farming tokens', async () => {
        it('rewards investors for staking in Dai tokens', async () => {
            assert.equal(
                await daiToken.balanceOf(investor),
                tokens(100),
                'investor Mock DAI wallet correct before staking'
            );

            await daiToken.approve(tokenFarm.address, tokens(100), {
                from: investor
            });

            await tokenFarm.stakeTokens(tokens(100), { from: investor });
            assert.equal(
                await daiToken.balanceOf(investor),
                tokens(0),
                'investor Mock DAI balance correct after staking'
            );
            assert.equal(
                await daiToken.balanceOf(tokenFarm.address),
                tokens(100),
                'token Farm Mock DAI balance correct after staking'
            );
            assert.equal(
                await tokenFarm.stakingBalance(investor),
                tokens(100),
                'investor staking balance correct after staking'
            );
            assert.equal(
                await tokenFarm.isStaking(investor),
                true,
                'investor staking isStaking status correct after staking'
            );
            assert.equal(
                await tokenFarm.hasStaked(investor),
                true,
                'investor staking hasStaked status correct after staking'
            );

            await tokenFarm.issueTokens({ from: owner });
            assert.equal(
                await dappToken.balanceOf(investor),
                tokens(100),
                'investor DApp Token wallet balance correct after issuing'
            );
            await tokenFarm.issueTokens({ from: owner });
            assert.equal(
                await dappToken.balanceOf(investor),
                tokens(200),
                'investor DApp Token wallet balance correct after issuing'
            );
            await tokenFarm.issueTokens({ from: investor }).should.be.rejected;

            await tokenFarm.unstakeTokens({ from: investor });
            assert.equal(
                await daiToken.balanceOf(investor),
                tokens(100),
                'investor Mock DAI balance correct after unstaking'
            );
            assert.equal(
                await daiToken.balanceOf(tokenFarm.address),
                tokens(0),
                'token Farm Mock DAI balance correct after unstaking'
            );
            assert.equal(
                await tokenFarm.isStaking(investor),
                false,
                'investor staking isStaking status correct after staking'
            );
        });
    });
});
