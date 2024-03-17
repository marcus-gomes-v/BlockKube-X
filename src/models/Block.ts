import mongoose, { Schema, Document } from 'mongoose';

export interface IBlock extends Document {
  number: number;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: number;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  transactions: Array<string>; // Array of transaction hashes
}

const BlockSchema: Schema = new Schema({
  number: { type: Number, required: true, unique: true },
  hash: { type: String, required: true, unique: true },
  parentHash: { type: String, required: true },
  nonce: { type: String, required: true },
  sha3Uncles: { type: String, required: true },
  logsBloom: { type: String, required: true },
  transactionsRoot: { type: String, required: true },
  stateRoot: { type: String, required: true },
  miner: { type: String, required: true },
  difficulty: { type: String, required: true },
  totalDifficulty: { type: String, required: true },
  extraData: { type: String, required: true },
  size: { type: Number, required: true },
  gasLimit: { type: Number, required: true },
  gasUsed: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  transactions: [{ type: String }],
});

export default mongoose.models.Block || mongoose.model<IBlock>('Block', BlockSchema);
