import React, { useState } from 'react';
import { weiFromEther } from '../../helpers/wei-ether-converter';

const StakingTable = ({
    stakingBalance,
    daiTokenBalance,
    dappTokenBalance,
    onStakeTokens,
    onUnstakeTokens
}) => {
    const [amount, setAmount] = useState(0);

    return (
        <div
            style={{
                width: '100%'
            }}>
            <div
                style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '50% 50%',
                    textAlign: 'center',
                    marginBottom: 10
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <span style={{}}>Staking Balance</span>
                    <span>{weiFromEther(stakingBalance)} mDAI</span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <span style={{}}>Reward Balance</span>
                    <span>{weiFromEther(dappTokenBalance)} DAPP</span>
                </div>
            </div>
            <div style={{ border: '1px solid grey', padding: 10 }}>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <span>
                        <b>Stake Tokens</b>
                    </span>
                    <span>Balance: {weiFromEther(daiTokenBalance)}</span>
                </div>
                <form style={{ width: '100%' }}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            marginBottom: 10
                        }}>
                        <input
                            style={{ width: 'inherit' }}
                            type="text"
                            ref={updatedAmount =>
                                setAmount(
                                    updatedAmount ? updatedAmount.value : 0
                                )
                            }
                            placeholder="0"
                            required
                        />
                        <div
                            style={{
                                backgroundColor: 'grey',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                paddingRight: 10
                            }}>
                            <img
                                src="/dai.png"
                                height="32"
                                alt=""
                                style={{ margin: 4 }}
                            />
                            mDAI
                        </div>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: 'blue',
                            border: '1px solid grey',
                            color: 'white',
                            padding: 10
                        }}>
                        STAKE!
                    </button>
                </form>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <button
                        type="submit"
                        className="btn btn-link btn-block btn-sm"
                        onClick={event => {
                            event.preventDefault();
                            onUnstakeTokens();
                        }}>
                        UN-STAKE...
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StakingTable;
