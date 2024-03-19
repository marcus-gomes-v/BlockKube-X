import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import Web3 from 'web3';
import Block, { IBlock } from '@/models/Block';


const ETH_NODE_URL = process.env.ETH_NODE_URL!;
const MONGODB_URI = process.env.MONGODB_URI!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const web3 = new Web3(ETH_NODE_URL);
  await mongoose.connect(MONGODB_URI);
 
  const latestBlockNumber = Number(await web3.eth.getBlockNumber());
  const blocksToFetch: Number[] = [
    Number(latestBlockNumber),
    Number(latestBlockNumber) - 1,
    Number(latestBlockNumber) - 2,
    Number(latestBlockNumber) - 3,
    Number(latestBlockNumber) - 4,
    Number(latestBlockNumber) - 5,
    Number(latestBlockNumber) - 6,
    Number(latestBlockNumber) - 7,
  ];
  const blocksData: IBlock[] = await Promise.all(
    blocksToFetch.map(async (blockNumber) => {
      const block = await web3.eth.getBlock(blockNumber.toString(), true); // Fetch detailed transactions

      // Check if the block has transactions and process accordingly
      const transactionHashes = block.transactions && Array.isArray(block.transactions)
        ? block.transactions.map(tx => typeof tx === 'string' ? tx : tx.hash) // Extract hashes from transaction objects
        : []; // Handle blocks without transactions

      const blockData: IBlock = {
        difficulty: String(block.difficulty),
        extraData: block.extraData,
        gasLimit: Number(block.gasLimit),
        gasUsed: Number(block.gasUsed),
        hash: block.hash || '',
        logsBloom: String(block.logsBloom),
        miner: block.miner,
        nonce: String(block.nonce),
        parentHash: block.parentHash,
        sha3Uncles: block.sha3Uncles,
        size: Number(block.size),
        stateRoot: block.stateRoot,
        totalDifficulty: String(block.totalDifficulty),
        transactionsRoot: block.transactionsRoot,
        number: Number(block.number), // Ensure consistency with Block interface
        timestamp: Number(block.timestamp), // Convert timestamp to string if necessary
        transactions: transactionHashes, // Use the processed transaction hashes
      } as IBlock

      Block.create(blockData).catch((error) => {
        console.warn('Failed to save block data');
      });

      return blockData;
    })
  );

  res.status(200).json(blocksData);
}