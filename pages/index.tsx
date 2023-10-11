import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
    MediaRenderer,
    Web3Button,
    useActiveClaimConditionForWallet,
    useAddress,
    useClaimIneligibilityReasons,
    useContract,
    useContractMetadata,
    useTotalCirculatingSupply,
    useTotalCount
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
    const address = useAddress();
    const router = useRouter();
    const maxClaimQuantity = 1;
    const claimQuantity = 1;

    const {
        contract
    } = useContract(CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    const {
        data: activeClaimPhase,
        isLoading: isActiveClaimPhaseLoading,
    } = useActiveClaimConditionForWallet(contract, address);

    const {
        data: claimIneligibilityReasons,
        isLoading: isClaimIneligibilityReasonsLoading,
    } = useClaimIneligibilityReasons(
        contract,
        {
            walletAddress: address || "",
            quantity: 1,
        }
    );

    const {
        data: totalSupply,
        isLoading: isTotalSupplyLoading,
    } = useTotalCount(contract);
    const {
        data: totalClaimSupply,
        isLoading: isTotalClaimSupplyLoading,
    } = useTotalCirculatingSupply(contract);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {!address && (
                    <h1>Connect wallet to mint NFT</h1>
                )}
                {!isContractMetadataLoading && (
                    <div className={styles.heroSection}>
                        <div className={styles.collectionImage}>
                            <MediaRenderer
                                src={contractMetadata?.image}
                            />
                        </div>
                        <div>
                            <h1>{contractMetadata?.name}</h1>
                            <p>{contractMetadata?.description}</p>
                            {!isActiveClaimPhaseLoading ? (
                                <div>
                                    <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                                    <p>Price: {ethers.utils.formatUnits(activeClaimPhase?.price!)} RAX</p>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                            {!isTotalSupplyLoading && !isTotalClaimSupplyLoading ? (
                                <p>Claimed: {totalClaimSupply?.toNumber()} / {totalSupply?.toNumber()}</p>
                            ) : (
                                <p>Loading...</p>
                            )}
                            {address ? (
                                !isClaimIneligibilityReasonsLoading ? (
                                    claimIneligibilityReasons?.length! > 0 ? (
                                        claimIneligibilityReasons?.map((reason, index) => (
                                            <p key={index}>{reason}</p>
                                        ))
                                    ) : (
                                        <div>
                                            <p>Eligible to claim</p>
                                            <div className={styles.claimContainer}>
                                                <Web3Button
                                                    contractAddress={CONTRACT_ADDRESS}
                                                    action={(contract) => contract.erc721.claim(claimQuantity)}
                                                    onSuccess={() => router.push(`/profile/${address}`)}
                                                >Claim NFT</Web3Button>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <p>Checking Eligibility...</p>
                                )
                            ) : (
                                <p>Connect Wallet to claim</p>
                            )}
                            <div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
