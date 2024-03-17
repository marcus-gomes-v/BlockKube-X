
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
      if (typeof address === 'string') { // Ensure hash is a string
        const walletBalanceWei = await web3.eth.getBalance(address);
        const walletBalanceEther = await web3.utils.fromWei(walletBalanceWei, 'ether');
        console.log(walletBalanceEther)
        const response = await fetch(`/api/transactions/${address}`);
        if (!response.ok) {
          console.error('Failed to fetch transactions data');
          return;
        }
        const transactions = await response.json();
        setAddressDetail({
          address: address,
          walletBalance: Number(walletBalanceEther),
          transactions
        });
      }
    };
    fetchWalletData();
  }, [address]); // Re-run the effect if the hash changes

  if (!addressDetail) {
    return <div>Loading...</div>;
  }

  return (
      <div className='border border-red-50 w-full'>
        <h3>Address Information</h3>
        {/* Display transaction details similar to what you've done in the Search component */}
        <div>
          <p><strong>Address:</strong> {addressDetail.address}</p>
          <p><strong>Balance:</strong> {Number(addressDetail.walletBalance).toFixed(4)}</p>
          {addressDetail.transactions.map((transaction: any) => (
            <div key={transaction._id}>
              <p><strong>From:</strong> {transaction.from}</p>
              <p><strong>To:</strong> {transaction.to}</p>
              <p><strong>Value:</strong> {transaction.value}</p>
            </div>
          ))}
        </div>
      </div>
  );
};
