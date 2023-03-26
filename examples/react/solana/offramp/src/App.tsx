import {CoinflowEnvs, CoinflowWithdraw} from '@coinflowlabs/react';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import React from 'react';
import {Wallet} from './Wallet';

function App() {
  return (
    <Wallet>
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
    </Wallet>
  );
}

function CoinflowContent() {
  const {connection} = useConnection();
  const wallet = useWallet();

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
