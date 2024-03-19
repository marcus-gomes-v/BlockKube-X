
'use client';

import WalletDetail from '@/app/components/details/wallet/wallet-detail';
import React, { useEffect, useState } from 'react';

export default function TransactionPage({ params }: { params: { address: string } }) {
  const [addressDetail, setAddressDetail] = useState<any>(null);
  const { address } = params; 

  useEffect(() => {
    if (!address) return; // Exit if the hash is not yet available
    const fetchWalletData = async () => {
      if (typeof address === 'string') { // Ensure hash is a string
        const balanceRes = await fetch(`/api/address/${address}`);
        const response = await fetch(`/api/transactions/${address}`);
        if (!response.ok || !balanceRes.ok) {
          console.error('Failed to fetch transactions data');
          return;
        }
        const balance = await balanceRes.json();
        const transactions = await response.json();
        setAddressDetail({
          address: address,
          balance: balance.balance,
          transactions
        });
      }
    };
    fetchWalletData();
  }, [address]); // Re-run the effect if the hash changes

  if (!addressDetail) {
    return <div>Loading...</div>;
  }

  return (
    <WalletDetail wallet={addressDetail} />
  );
};
