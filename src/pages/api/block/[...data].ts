import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Block from '@/models/Block';
import Web3 from 'web3';

const MONGODB_URI = process.env.MONGODB_URI!;
const ETH_NODE_URL = process.env.ETH_NODE_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(MONGODB_URI);
  const web3 = new Web3(ETH_NODE_URL);

  const data = req.query.data as string[]; // Expected to be an array because of [...data].ts
  const query = data[0]; // Take the first segment as your search query

  // Determine if the query is a block number or hash
  // This is a simplistic approach; adjust according to your needs
  let searchCriteria;
  if (/^\d+$/.test(query)) { // If query is all digits
    searchCriteria = { number: query };
  } else { // Assuming anything else will be treated as a hash
    searchCriteria = { hash: query };
  }

  let blocks = await Block.findOne(searchCriteria)
    .collation({ locale: 'en', strength: 2 });

  if (!blocks) {
    if(searchCriteria.number) {
      const blockNumber = parseInt(searchCriteria.number);
      const blockData = await web3.eth.getBlock(blockNumber);
      if(blockData) {
        blocks = new Block(blockData);
        await blocks.save();
      }
    } else if(searchCriteria.hash){
      const blockData = await web3.eth.getBlock(searchCriteria.hash);
      if(blockData) {
        blocks = new Block(blockData);
        blocks.save().catch(() => {
          console.warn('Failed to save transaction data');
        });
      }
    }else {
      return res.status(404).json({ error: 'Block not found.' });
    }
  }

  res.json(blocks);
}
