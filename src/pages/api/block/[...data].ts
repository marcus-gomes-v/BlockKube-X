import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Block from '@/models/Block';

const MONGODB_URI = process.env.MONGODB_URI!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(MONGODB_URI);

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

  const blocks = await Block.findOne(searchCriteria)
    .collation({ locale: 'en', strength: 2 });

  res.json(blocks);
}
