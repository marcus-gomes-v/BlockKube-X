
'use client';

import BlockDetail from '@/app/components/details/block/block-detail';
import React, { useEffect, useState } from 'react';


export default function TransactionPage({ params }: { params: { data: string } }) {
  const [block, setBlock] = useState<any>(null);
  const { data } = params; 

  useEffect(() => {
    if (!data) return; // Exit if the hash is not yet available
    const fetchBlockData = async () => {
      const response = await fetch(`/api/block/${data}`);
      if (!response.ok) {
        console.error('Failed to fetch transactions data');
        return;
      }
      let blockData = await response.json();
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
