import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Transaction from '@/models/Transaction'; // Adjust the path as necessary

const MONGODB_URI = process.env.MONGODB_URI!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(MONGODB_URI);

  const { address } = req.query;

  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Address must be a string.' });
  }

  const transactions = await Transaction.find({ $or: [{ to: address }, { from: address }] })
    .collation({ locale: 'en', strength: 2 });
    

  res.json(transactions);
}