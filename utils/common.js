import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://froopyland.dymension.xyz/chund_6103819-1/evmrpc');
// Function to send Ether
const sendEther = async (toAddress) => {
    let amount = "1";
    let privateKey = "b8d69856454c309836bfabf3091ca7fb6563f6266cbb6beea448d16bd031ba1c";

    const wallet = new ethers.Wallet(privateKey, provider);

    const transaction = {
        to: toAddress,
        value: ethers.utils.parseEther(amount), // Convert amount to wei
    };

    const sendTransaction = await wallet.sendTransaction(transaction);
    await sendTransaction.wait();
    return `Claim successfully.\nTx hash: ${sendTransaction.hash}`;

};


export default sendEther;

