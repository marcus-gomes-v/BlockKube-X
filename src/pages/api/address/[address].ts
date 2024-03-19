import type { NextApiRequest, NextApiResponse } from 'next';
import Web3 from 'web3';

const MONGODB_URI = process.env.MONGODB_URI!;
const ETH_NODE_URL = process.env.ETH_NODE_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const web3 = new Web3(ETH_NODE_URL);
  const { address } = req.query;

  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Address must be a string.' });
  }

  const walletBalanceWei = await web3.eth.getBalance(address);
  const walletBalanceEther = await web3.utils.fromWei(walletBalanceWei, 'ether');
  
  res.json({ balance: Number(walletBalanceEther)});
}