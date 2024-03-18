
'use client';

import WalletDetail from '@/app/components/details/wallet/wallet-detail';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
const ETH_NODE_URL = process.env.ETH_NODE_URL!;

export default function TransactionPage({ params }: { params: { address: string } }) {
  const [addressDetail, setAddressDetail] = useState<any>(null);
  const { address } = params; 
  const web3 = new Web3(ETH_NODE_URL);

  useEffect(() => {
    if (!address) return; // Exit if the hash is not yet available
    const fetchWalletData = async () => {
      if (typeof address === 'string') { // Ensure hash is a string
        const walletBalanceWei = await web3.eth.getBalance(address);
        const walletBalanceEther = await web3.utils.fromWei(walletBalanceWei, 'ether');
        const response = await fetch(`/api/transactions/${address}`);
        if (!response.ok) {
          console.error('Failed to fetch transactions data');
          return;
        }
        const transactions = await response.json();
        setAddressDetail({
          address: address,
          balance: Number(walletBalanceEther),
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
    <WalletDetail wallet={addressDetail} />
  );
};
