
'use client';

import BlockDetail from '@/app/components/details/block/block-detail';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
const ETH_NODE_URL = process.env.ETH_NODE_URL!;

export default function TransactionPage({ params }: { params: { data: string } }) {
  const [block, setBlock] = useState<any>(null);
  const { data } = params; 
  const web3 = new Web3(ETH_NODE_URL);

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
      console.log('Block Data:', blockData);
      setBlock(blockData);
    };
    fetchBlockData();
  }, [data]); // Re-run the effect if the hash changes

  if (!block) {
    return <div>Loading...</div>;
  }

  return (
    <BlockDetail block={block} />
  );
};
