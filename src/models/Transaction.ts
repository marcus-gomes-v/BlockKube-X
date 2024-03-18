// models/Transaction.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  from: string;
  to: string;
  value: string;
  hash: string;
  gas: string;
  gasPrice: string;
  nonce: string;
  blockHash: string;
  blockNumber: string;
  transactionIndex: string;
  gasUsed?: string;
}

const TransactionSchema: Schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
  gas: { type: String, required: true },
  gasPrice: { type: String, required: true },
  nonce: { type: String, required: true },
  blockHash: { type: String, required: true },
  blockNumber: { type: String, required: true },
  transactionIndex: { type: String, required: true },
});

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
