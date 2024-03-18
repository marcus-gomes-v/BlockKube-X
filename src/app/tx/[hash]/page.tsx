
'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import TransactionDetail from '@/app/components/details/tx/transaction-detail';

export default function TransactionPage({ params }: { params: { hash: string } }) {
  const [transaction, setTransaction] = useState<any>(null);
  const { hash } = params; 
  const web3 = new Web3('http://localhost:8545');
  const router = useRouter();

  useEffect(() => {
    if (!hash) return; // Exit if the hash is not yet available
    const fetchTransactionData = async () => {
      try {
        const tx = await web3.eth.getTransaction(hash as string);
        const receipt = await web3.eth.getTransactionReceipt(hash as string);
        if (!tx || !receipt) {
          throw new Error('Failed to fetch transaction data');
        }
        console.log('Transaction Data:', tx, receipt);
        setTransaction({ ...tx, gasUsed: receipt.gasUsed });
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
