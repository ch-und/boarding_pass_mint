// pages/sendEther.js
import React, { useState } from 'react';
import sendEther from '../utils/common';
import { useAddress } from '@thirdweb-dev/react';

const FaucetButton = () => {
  const [transactionHash, setTransactionHash] = useState(null);

  const handleSendEther = async () => {
    const toAddress = useAddress();

    try {
      const hash = await sendEther(toAddress);
    //   setTransactionHash(hash);
    } catch (error) {
      console.error('Error sending Ether:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSendEther}>Faucet</button>
    </div>
  );
};

export default FaucetButton;
