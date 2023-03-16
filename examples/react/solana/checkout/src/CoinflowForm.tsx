import React, {useContext} from 'react';
import {CoinflowPurchase} from '@coinflowlabs/react';
import {coinflowEnv, ShopCoinflowContext} from './context/ShopCoinflowContext';
import {useWallet} from './wallet/Wallet';

export function CoinflowForm() {
  const wallet = useWallet();

  const {transaction, amount} = useContext(ShopCoinflowContext);

  if (!transaction) return null;
  if (!wallet.connection) return null;

  return (
    <div className={'w-4/5 mx-auto px-8 flex-col h-full'}>
      <CoinflowPurchase
        wallet={wallet}
        merchantId={'nft-example'}
        env={coinflowEnv}
        connection={wallet.connection}
        onSuccess={() => {
          console.log('SUCCESS');
        }}
        transaction={transaction}
        amount={amount}
        blockchain={'solana'}
      />
    </div>
  );
}
