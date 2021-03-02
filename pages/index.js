import React, { useEffect, useState } from 'react';
import DaiToken from '../contracts-build/DaiToken.json';
import DappToken from '../contracts-build/DappToken.json';
import TokenFarm from '../contracts-build/TokenFarm.json';
import Head from 'next/head';
import Navbar from '../components/navbar';
import StakingTable from '../components/staking-table';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import useWeb3 from '../hooks/use-web3';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState();
    const [daiToken, setDaiToken] = useState();
    const [daiTokenBalance, setDaiTokenBalance] = useState();
    const [dappToken, setDappToken] = useState();
    const [dappTokenBalance, setDappTokenBalance] = useState();
    const [tokenFarm, setTokenFarm] = useState();
    const [stakingBalance, setStakingBalance] = useState();

    const { isWeb3Loaded, setWeb3Loaded, loadWeb3 } = useWeb3();

    useEffect(async () => {
        if (!isWeb3Loaded) {
            loadWeb3();
        } else {
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            console.log({ accounts });
            setAccount(accounts[0]);
        }
    }, [isWeb3Loaded]);

    useEffect(() => {
        if (account) {
            loadBlockchainData();
        }
    }, [account]);

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();

        // Load DaiToken
        const daiTokenData = DaiToken.networks[networkId];
        if (daiTokenData) {
            const daiToken = new web3.eth.Contract(
                DaiToken.abi,
                daiTokenData.address
            );
            setDaiToken(daiToken);

            let daiTokenBalance = await daiToken.methods
                .balanceOf(account)
                .call();
            setDaiTokenBalance(daiTokenBalance.toString());
        } else {
            window.alert('DaiToken contract not deployed to detected network.');
        }

        // Load DappToken
        const dappTokenData = DappToken.networks[networkId];
        if (dappTokenData) {
            const dappToken = new web3.eth.Contract(
                DappToken.abi,
                dappTokenData.address
            );
            setDappToken(dappToken);
            let dappTokenBalance = await dappToken.methods
                .balanceOf(account)
                .call();
            setDappTokenBalance(dappTokenBalance.toString());
        } else {
            window.alert(
                'DappToken contract not deployed to detected network.'
            );
        }

        // Load TokenFarm
        const tokenFarmData = TokenFarm.networks[networkId];
        if (tokenFarmData) {
            const tokenFarm = new web3.eth.Contract(
                TokenFarm.abi,
                tokenFarmData.address
            );
            setTokenFarm(tokenFarm);
            let stakingBalance = await tokenFarm.methods
                .stakingBalance(account)
                .call();
            setStakingBalance(stakingBalance.toString());
        } else {
            window.alert(
                'TokenFarm contract not deployed to detected network.'
            );
        }

        setLoading(false);
    };

    const stakeTokens = amount => {
        setLoading(true);
        daiToken.methods
            .approve(tokenFarm._address, amount)
            .send({ from: account })
            .on('transactionHash', hash => {
                tokenFarm.methods
                    .stakeTokens(amount)
                    .send({ from: account })
                    .on('transactionHash', hash => {
                        setLoading(false);
                    });
            });
    };

    const unstakeTokens = amount => {
        setLoading(true);
        tokenFarm.methods
            .unstakeTokens()
            .send({ from: account })
            .on('transactionHash', hash => {
                setLoading(false);
            });
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>DeFi App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {!loading && <Navbar account={account} />}
            <main className={styles.main}>
                <h1 className={styles.title}>
                    following DeFi App{' '}
                    <a href="https://www.youtube.com/watch?v=CgXQC4dbGUE">
                        tutorial
                    </a>
                </h1>
                {!loading && (
                    <StakingTable
                        daiTokenBalance={daiTokenBalance}
                        dappTokenBalance={dappTokenBalance}
                        stakingBalance={stakingBalance}
                        onStakeTokens={stakeTokens}
                        onUnstakeTokens={unstakeTokens}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
}
