import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css'
import sendEther from '../utils/common';
import React, { useState } from 'react';

export default function Faucet() {
    const address = useAddress();
    const [transactionResult, setTransactionResult] = useState(null);

    const handleSendEther = async () => {
        console.log("Start faucet")
        try {
            const result = await sendEther(address);
            setTransactionResult(result);
            console.log("Success!")
        } catch (error) {
            console.error('Error sending Ether:', error);
        }
    };
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>RAX faucet</h1>
                <p>Get RAX and explore CHUND rollapp!</p>
                <button className={styles.button} onClick={handleSendEther}>Faucet</button>
                {transactionResult && <p>Result: {transactionResult}</p>}
            </main>
        </div>
    );
}