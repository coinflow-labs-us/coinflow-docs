import {CoinflowEnvs, CoinflowWithdraw} from '@coinflowlabs/react';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import React, {useMemo} from 'react';
import {Wallet} from './Wallet';
import {Transaction, type VersionedTransaction} from '@solana/web3.js';

function App() {
  return (
    <Wallet>
      <div className="App">
        <WalletMultiButton />
        <div
          style={{
            height: '100vh',
          }}
        >
          <CoinflowContent />
        </div>
      </div>
    </Wallet>
  );
}

function CoinflowContent() {
  const {connection} = useConnection();
  const adapterWallet = useWallet();

  const {publicKey, sendTransaction} = adapterWallet;

  const wallet = useMemo(
    () => ({
      publicKey,
      sendTransaction: <T extends Transaction | VersionedTransaction>(
        transaction: T
      ): Promise<string> => {
        return sendTransaction(transaction, connection);
      },
    }),
    [publicKey, sendTransaction]
  );

  console.log(wallet);

  if (!wallet.publicKey) return null;

  return (
    <CoinflowWithdraw
      wallet={wallet}
      merchantId={process.env.REACT_APP_MERCHANT_ID as string}
      env={process.env.REACT_APP_ENV as CoinflowEnvs}
      connection={connection}
      onSuccess={() => console.log('Withdraw Success')}
      blockchain={'solana'}
      email={'user-email@email.com'}
    />
  );
}

export default App;
