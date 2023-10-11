import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import FaucetButton from './FaucetButton';
import sendEther from '../utils/common';

export default function Navbar() {
    const address = useAddress();

    const handleSendEther = async () => {
        try {
            const hash = await sendEther(address);
            // setTransactionHash(hash);
        } catch (error) {
            console.error('Error sending Ether:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link href="/">
                    <p>Mint NFT</p>
                </Link>
                <div className={styles.navLinks}>
                    {address && (
                        <Link href={`profile/${address}`}>
                            <p>My NFTs</p>
                        </Link>
                    )}
                </div>
                <div className={styles.navLinks}>
                    {address && (
                        <Link href="/faucet">
                            <p>Faucet</p>
                        </Link>
                    )}
                </div>
                <ConnectWallet />
            </div>
        </div>
    )
}