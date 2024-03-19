import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Transaction from '@/models/Transaction'; // Adjust the path as necessary
import Web3 from 'web3';

const MONGODB_URI = process.env.MONGODB_URI!;
const ETH_NODE_URL = process.env.ETH_NODE_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const web3 = new Web3(ETH_NODE_URL);
  await mongoose.connect(MONGODB_URI);

  const { hash } = req.query;

  if (typeof hash !== 'string') {
    return res.status(400).json({ error: 'Hash must be a string.' });
  }

  let transaction = await Transaction.findOne({ hash })
    .collation({ locale: 'en', strength: 2 });
  
  if (!transaction) {
    const tx = await web3.eth.getTransaction(hash);
    const receipt = await web3.eth.getTransactionReceipt(hash);
    if (!tx || !receipt) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }
    transaction = new Transaction({
      hash: tx.hash,
      blockHash: tx.blockHash,
      blockNumber: tx.blockNumber,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      gas: tx.gas,
      gasPrice: tx.gasPrice,
      input: tx.input,
      nonce: tx.nonce,
      transactionIndex: tx.transactionIndex,
      v: tx.v,
      r: tx.r,
      s: tx.s,
      status: receipt.status,
      gasUsed: receipt.gasUsed,
      contractAddress: receipt.contractAddress,
      logs: receipt.logs,
    });
    transaction.save().catch(() => {
      console.warn('Failed to save transaction data');
    });
  }

  res.json(transaction);
}