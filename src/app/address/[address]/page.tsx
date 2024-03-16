
'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function TransactionPage({ params }: { params: { address: string } }) {
  const [addressDetail, setAddressDetail] = useState<any>(null);
  const { address } = params; 
  const web3 = new Web3('http://localhost:8545');

  useEffect(() => {
    if (!address) return; // Exit if the hash is not yet available
    const fetchWalletData = async () => {
      const balance = await web3.eth.getBalance(address);
      const transactionCount = await web3.eth.getTransactionCount(address);
      console.log(address, transactionCount)
      setAddressDetail({ balance });
    };
    fetchWalletData();
  }, [address]); // Re-run the effect if the hash changes

  if (!addressDetail) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <h3>Address Information</h3>
        {/* Display transaction details similar to what you've done in the Search component */}
        <p><strong>Balance:</strong> {addressDetail.balance}</p>
      </div>
  );
};
