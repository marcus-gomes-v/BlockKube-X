"use client";

import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import Web3 from 'web3';
import { Label } from './ui/label';
import { Input } from './ui/input';

const Search: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const web3 = new Web3('http://localhost:8545');

  const handleSearch = async () => {
    if (/^0x[a-fA-F0-9]{64}$/.test(input)) { // Transaction Hash
      fetchTransactionData(input);
    } else if (/^0x[a-fA-F0-9]{40}$/.test(input)) { // Wallet Address
      fetchWalletData(input);
    } else {
      alert("Invalid input");
    }
  };

  const fetchBlockData = async (blockNumber: number) => {
    const block = await web3.eth.getBlock(blockNumber);
    setResult({ type: 'block', content: block });
  };

  const fetchTransactionData = async (txHash: string) => {
    const tx = await web3.eth.getTransaction(txHash);
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    setResult({ type: 'transaction', content: { ...tx, gasUsed: receipt.gasUsed } });
  };

  const fetchWalletData = async (address: string) => {
    const balance = await web3.eth.getBalance(address);
    // Further implementation needed for fetching transactions by address
    setResult({ type: 'wallet', content: { balance } });
  };

  // Simplified rendering logic
  return (
    <div>
      <LabelInputContainer>
        <Label htmlFor="lastname">Enter a transaction hash or wallet address</Label>
        <div className='flex'>
          <Input id="lastname" placeholder="Enter a transaction hash or wallet address" type="text" value={input} onChange={(e) => setInput(e.target.value)}  className='w-[400px]'/>
          <a onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </a>
        </div>
      </LabelInputContainer>
      {result && (
        <div>
          {result.type === 'block' && (
            <div>
              <h3>Block Information</h3>
              <p><strong>Number:</strong> {result.content.number}</p>
              <p><strong>Timestamp:</strong> {new Date(result.content.timestamp * 1000).toLocaleString()}</p>
              <p><strong>Miner:</strong> {result.content.miner}</p>
              <p><strong>Transactions Count:</strong> {result.content.transactions.length}</p>
              {/* More details as needed */}
            </div>
          )}
          {result.type === 'transaction' && (
            <div>
              <h3>Transaction Information</h3>
              <p><strong>Hash:</strong> {result.content.hash}</p>
              <p><strong>Block Number:</strong> {result.content.blockNumber}</p>
              <p><strong>From:</strong> {result.content.from}</p>
              <p><strong>To:</strong> {result.content.to}</p>
              <p><strong>Value:</strong> {web3.utils.fromWei(result.content.value, 'ether')} ETH</p>
              <p><strong>Gas Used:</strong> {result.content.gasUsed}</p>
              <p><strong>Gas Price:</strong> {web3.utils.fromWei(result.content.gasPrice, 'gwei')} Gwei</p>
              {/* More details as needed */}
            </div>
          )}
          {result.type === 'wallet' && (
            <div>
              <h3>Wallet Information</h3>
              <p><strong>Balance:</strong> {web3.utils.fromWei(result.content.balance, 'ether')} ETH</p>
              {/* Implement transaction listing if available */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};