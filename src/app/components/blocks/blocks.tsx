// src/app/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Kube } from './kube';
import { PinContainer } from '../ui/3d-pin';

interface Block {
  parentHash: string;
  sha3Uncles: string;
  miner: string;
  stateRoot: string;
  transactionsRoot: string;
  receiptsRoot: string;
  logsBloom?: string;
  number: bigint;
  timestamp: string | number;
  transactions: string[]; // Array to store transaction hashes
}

const ETH_NODE_URL = process.env.ETH_NODE_URL!;

const Blocks: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const web3 = new Web3(ETH_NODE_URL);

  const fetchBlocks = async () => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const blocksToFetch: bigint[] = [
      BigInt(latestBlockNumber),
      BigInt(latestBlockNumber) - BigInt(1),
      BigInt(latestBlockNumber) - BigInt(2),
      BigInt(latestBlockNumber) - BigInt(3),
      BigInt(latestBlockNumber) - BigInt(4),
      BigInt(latestBlockNumber) - BigInt(5),
      BigInt(latestBlockNumber) - BigInt(6),
      BigInt(latestBlockNumber) - BigInt(7),
    ];
    const blocksData: Block[] = await Promise.all(
      blocksToFetch.map(async (blockNumber) => {
        const block = await web3.eth.getBlock(blockNumber.toString(), true); // Fetch detailed transactions

        // Check if the block has transactions and process accordingly
        const transactionHashes = block.transactions && Array.isArray(block.transactions) 
          ? block.transactions.map(tx => typeof tx === 'string' ? tx : tx.hash) // Extract hashes from transaction objects
          : []; // Handle blocks without transactions

        return {
          ...block,
          number: BigInt(block.number), // Ensure consistency with Block interface
          timestamp: block.timestamp.toString(), // Convert timestamp to string if necessary
          transactions: transactionHashes, // Use the processed transaction hashes
        };
      })
    );

    setBlocks(blocksData);
  };

  // Set up the interval
  useEffect(() => {
    fetchBlocks(); // Call it immediately on component mount
    const interval = setInterval(fetchBlocks, 6000); // Then every 6 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);


  return (
    <div>

      {/* Display transactions and blocks here */}
      <div>
        <h1 className='text-2xl'>
          Blocks 
          <button onClick={fetchBlocks} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-3 animate-spin">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </h1>
        <div className='grid grid-cols-4'>
          {blocks.map((block, index) => {
            // Determine if the block is the last in the array
            const isFirstBlock = index === 0;
            const isLastBlock = index === blocks.length - 1;
            const fadeInClass = 'animate-fade-in'; // Make sure this class is defined in your CSS
            const fadeOutClass = 'animate-fade-out'; // Ensure this class is defined to handle fade out
            const animationClass = isFirstBlock ? fadeInClass : isLastBlock ? fadeOutClass : '';

            return (
              <div key={block.number.toString()} className={`${animationClass}`}>
                <PinContainer
                  title={`View Block ${block.number}`}
                  href={`/block/${block.number}`}
                >
                  <div className="tracking-tight text-slate-100/50 w-[18rem] h-[12rem]">
                    <Kube
                      title={`${block.number}`}
                      description={`Timestamp: ${block.timestamp}, Transactions: ${block.transactions.length}`}
                      className='hover:cursor-pointer hover:shadow-md hover:shadow-sky-500 hover:dark:shadow-sky-300 transition-shadow duration-300 ease-in-out'
                    />
                  </div>
                </PinContainer>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blocks;
