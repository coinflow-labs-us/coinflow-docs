import React from 'react';
import {CoinflowWithdraw} from '@coinflowlabs/react';
import {useWallet} from './wallet/Wallet';

export function CoinflowForm() {
  const wallet = useWallet();
  if (!wallet.connection) return null;

  return (
    <div className={'w-4/5 mx-auto px-8 flex-col h-full'}>
      <CoinflowWithdraw
        wallet={wallet}
        merchantId={'nft-example'}
        env={'sandbox'}
        connection={wallet.connection}
        onSuccess={() => {
          console.log('SUCCESS');
        }}
        blockchain={'solana'}
      />
    </div>
  );
}
