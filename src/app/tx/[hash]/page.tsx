
'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function TransactionPage({ params }: { params: { hash: string } }) {
  const [transaction, setTransaction] = useState<any>(null);
  const { hash } = params; 
  const web3 = new Web3('http://localhost:8545');

  useEffect(() => {
    if (!hash) return; // Exit if the hash is not yet available
    const fetchTransactionData = async () => {
      const tx = await web3.eth.getTransaction(hash as string);
      const receipt = await web3.eth.getTransactionReceipt(hash as string);
      setTransaction({ ...tx, gasUsed: receipt.gasUsed });
    };
    fetchTransactionData();
  }, [hash]); // Re-run the effect if the hash changes

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <h3>Transaction Information</h3>
        {/* Display transaction details similar to what you've done in the Search component */}
        <p><strong>Hash:</strong> {transaction.hash}</p>
        {/* <p><strong>Hash:</strong> {transaction.content.hash}</p> */}
        <p><strong>Block Number:</strong> {transaction.blockNumber}</p>
        <p><strong>From:</strong> {transaction.from}</p>
        <p><strong>To:</strong> {transaction.to}</p>
        <p><strong>Value:</strong> {web3.utils.fromWei(transaction.value, 'ether')} ETH</p>
        <p><strong>Gas Used:</strong> {transaction.gasUsed}</p>
        <p><strong>Gas Price:</strong> {web3.utils.fromWei(transaction.gasPrice, 'gwei')} Gwei</p>
        {/* Add more transaction details here */}
      </div>
  );
};
