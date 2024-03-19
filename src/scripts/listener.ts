import Web3 from 'web3';
import mongoose from 'mongoose';
import Block from '../models/Block';
import Transaction, { ITransaction } from '../models/Transaction';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;
const ETH_NODE_URL = process.env.ETH_NODE_URL;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined in MONGODB_URI.');
}
if (!ETH_NODE_URL) {
  throw new Error('Ethereum node RPC URL not defined in ETH_NODE_URL.');
}

console.log('Connecting to Ethereum node at:', ETH_NODE_URL);
const web3 = new Web3(ETH_NODE_URL);

mongoose.connect(MONGODB_URI).then(() => console.log('MongoDB connected')).catch(console.error);

let lastProcessedBlock = 0;

async function processBlock(blockNumber: number) {
  const block = await web3.eth.getBlock(blockNumber, true);
  if (!block) {
    console.error(`Failed to fetch block data for block ${blockNumber}`);
    return;
  }

  // Attempt to save block if it doesn't already exist
  try {
    const newBlock = new Block({
      number: Number(block.number),
      hash: block.hash,
      parentHash: block.parentHash,
      nonce: block.nonce,
      sha3Uncles: block.sha3Uncles,
      logsBloom: block.logsBloom,
      transactionsRoot: block.transactionsRoot,
      stateRoot: block.stateRoot,
      miner: block.miner,
      difficulty: block.difficulty,
      totalDifficulty: block.totalDifficulty,
      extraData: block.extraData,
      size: Number(block.size),
      gasLimit: Number(block.gasLimit),
      gasUsed: Number(block.gasUsed),
      timestamp: Number(block.timestamp),
      transactions: block.transactions && block.transactions.length > 0 ? block.transactions.map((tx: ITransaction | any) => tx.hash) : [],
    });
    await newBlock.save();
    console.log(`Block ${blockNumber} saved.`);
  } catch (error: any) {
    if (error.code === 11000) { // MongoDB duplicate key error
      console.log(`Block ${blockNumber} already exists in DB.`);
    } else {
      console.error(`Error saving block ${blockNumber}:`, error);
    }
  }

  if (block.transactions && block.transactions.length > 0) {
    for (let transaction of block.transactions) {
      const oTransaction = transaction as unknown as ITransaction;
      console.log('Transaction:', oTransaction);
      try {
        console.log('Saving transaction to MongoDB:', oTransaction.hash);
        // Save the transaction to MongoDB
        const newTransaction = new Transaction({
          hash: oTransaction.hash,
          from: oTransaction.from,
          to: oTransaction.to,
          value: oTransaction.value,
          gas: oTransaction.gas,
          gasPrice: oTransaction.gasPrice,
          nonce: oTransaction.nonce,
          blockHash: oTransaction.blockHash,
          blockNumber: oTransaction.blockNumber,
          transactionIndex: oTransaction.transactionIndex,
        });
        await newTransaction.save();
        console.log('Transaction saved:', oTransaction.hash);
      } catch (error: any) {
        if (error.code === 11000) { // MongoDB duplicate key error
          console.log(`Transaction ${oTransaction.hash} already exists in DB.`);
        } else {
          console.error(`Error saving Transaction ${oTransaction.hash}:`, error);
        }
      }
    }
  } else {
    console.log(`Block ${blockNumber} has no transactions.`);
    return;
  }

  
}

async function startPolling() {
  
  console.log('INDEX_PAST_BLOCKS:', process.env.INDEX_PAST_BLOCKS);

  if (process.env.INDEX_PAST_BLOCKS === 'true') {
    let latestBlockNumberAtStart = await web3.eth.getBlockNumber();

    // First, process all blocks up to the current block
    for (let blockNumber = lastProcessedBlock + 1; blockNumber <= latestBlockNumberAtStart; blockNumber++) {
      await processBlock(blockNumber);
    }
    lastProcessedBlock = Number(latestBlockNumberAtStart);

    // Now, catch any blocks that may have arrived during the initial processing
    const latestBlockNumberBeforePolling = await web3.eth.getBlockNumber();
    for (let blockNumber = lastProcessedBlock + 1; blockNumber <= latestBlockNumberBeforePolling; blockNumber++) {
      await processBlock(blockNumber);
    }
    lastProcessedBlock = Number(latestBlockNumberBeforePolling);
  } else {
    lastProcessedBlock = Number(await web3.eth.getBlockNumber());
  }

  // Finally, start polling for new blocks
  setInterval(async () => {
    // Get the current block number
    const currentBlockNumber = await web3.eth.getBlockNumber();
    if (currentBlockNumber > lastProcessedBlock) {
      for (let blockNumber = lastProcessedBlock + 1; blockNumber <= currentBlockNumber; blockNumber++) {
        await processBlock(blockNumber);
      }
      lastProcessedBlock = Number(currentBlockNumber);
    }
  }, 5000); // Adjust the polling interval as needed
}
startPolling().catch(console.error);