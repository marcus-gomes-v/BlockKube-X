
'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function TransactionPage({ params }: { params: { data: string } }) {
  const [block, setBlock] = useState<any>(null);
  const { data } = params; 
  const web3 = new Web3('http://localhost:8545');

  useEffect(() => {
    if (!data) return; // Exit if the hash is not yet available
    const fetchBlockData = async () => {
      const response = await fetch(`/api/block/${data}`);
      if (!response.ok) {
        console.error('Failed to fetch transactions data');
        return;
      }
      let blockData = await response.json();

      if (!blockData) {
        blockData = await web3.eth.getBlock(data, true);
      }
      setBlock(blockData);
    };
    fetchBlockData();
  }, [data]); // Re-run the effect if the hash changes

  if (!block) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <h3>Block Information</h3>
        {/* Display transaction details similar to what you've done in the Search component */}
        <div>Block Number: {block.number}</div>
        <div>Block Hash: {block.hash}</div>
        <div>Parent Hash: {block.parentHash}</div>
        <div>Nonce: {block.nonce}</div>
        <div>Sha3 Uncles: {block.sha3Uncles}</div>
        <div>Logs Bloom: {block.logsBloom}</div>
        <div>Transactions Root: {block.transactionsRoot}</div>
        <div>State Root: {block.stateRoot}</div>
        <div>Miner: {block.miner}</div>
        <div>Difficulty: {block.difficulty}</div>
        <div>Total Difficulty: {block.totalDifficulty}</div>
        <div>Extra Data: {block.extraData}</div>
        <div>Size: {block.size}</div>
        <div>Gas Limit: {block.gasLimit}</div>
        <div>Gas Used: {block.gasUsed}</div>
        <div>Timestamp: {block.timestamp}</div>
        <div>Transactions: {block.transactions ? block.transactions.join(', ') : ''}</div>
      </div>
  );
};
