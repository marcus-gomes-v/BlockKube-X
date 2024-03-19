
'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import TransactionDetail from '@/app/components/details/tx/transaction-detail';
const ETH_NODE_URL = process.env.ETH_NODE_URL!;

export default function TransactionPage({ params }: { params: { hash: string } }) {
  const [transaction, setTransaction] = useState<any>(null);
  const { hash } = params; 
  const web3 = new Web3(ETH_NODE_URL);
  const router = useRouter();

  useEffect(() => {
    if (!hash) return; // Exit if the hash is not yet available
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(`/api/transaction/${hash}`);
        if (!response.ok) {
          console.error('Failed to fetch transactions data');
          return;
        }
        let txData = await response.json();
        setTransaction(txData);
      } catch (error) {
        router.push(`/block/${hash}`);
      }
    };
    fetchTransactionData();
  }, [hash]); // Re-run the effect if the hash changes

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
      <TransactionDetail tx={transaction} />
  );
};
