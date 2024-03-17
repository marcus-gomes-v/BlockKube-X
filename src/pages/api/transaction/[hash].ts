import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Transaction from '@/models/Transaction'; // Adjust the path as necessary

const MONGODB_URI = process.env.MONGODB_URI!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(MONGODB_URI);

  const { hash } = req.query;

  if (typeof hash !== 'string') {
    return res.status(400).json({ error: 'Hash must be a string.' });
  }

  const transactions = await Transaction.findOne({ hash })
    .collation({ locale: 'en', strength: 2 });
    

  res.json(transactions);
}