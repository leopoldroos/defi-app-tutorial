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
        <div id="content" className="mt-3">
            <table className="table table-borderless text-muted text-center">
                <thead>
                    <tr>
                        <th scope="col">Staking Balance</th>
                        <th scope="col">Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{weiFromEther(stakingBalance)} mDAI</td>
                        <td>{weiFromEther(dappTokenBalance)} DAPP</td>
                    </tr>
                </tbody>
            </table>

            <div className="card mb-4">
                <div className="card-body">
                    <form
                        className="mb-3"
                        onSubmit={event => {
                            event.preventDefault();
                            onStakeTokens(weiFromEther(amount));
                        }}>
                        <div>
                            <label className="float-left">
                                <b>Stake Tokens</b>
                            </label>
                            <span className="float-right text-muted">
                                Balance: {weiFromEther(daiTokenBalance)}
                            </span>
                        </div>
                        <div className="input-group mb-4">
                            <input
                                type="text"
                                ref={updatedAmount =>
                                    setAmount(
                                        updatedAmount ? updatedAmount.value : 0
                                    )
                                }
                                className="form-control form-control-lg"
                                placeholder="0"
                                required
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <img src="/dai.png" height="32" alt="" />
                                    &nbsp;&nbsp;&nbsp; mDAI
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block btn-lg">
                            STAKE!
                        </button>
                    </form>
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
