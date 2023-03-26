import React from 'react';
import './App.css';
import {CoinflowEnvs, CoinflowWithdraw} from '@coinflowlabs/react';
import {
  NearWalletConnect,
  NearWalletContextProvider,
  useNearWallet,
} from './NearWalletContext';

function App() {
  return (
    <NearWalletContextProvider>
      <div className="App">
        <NearWalletConnect />
        <div
          style={{
            height: '100vh',
          }}
        >
          <CoinflowContent />
        </div>
      </div>
    </NearWalletContextProvider>
  );
}

function CoinflowContent() {
  const wallet = useNearWallet();

  if (!wallet) return null;

  return (
    <CoinflowWithdraw
      // TODO fix this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      wallet={wallet}
      merchantId={process.env.REACT_APP_MERCHANT_ID as string}
      env={process.env.REACT_APP_ENV as CoinflowEnvs}
      onSuccess={() => console.log('Withdraw Success')}
      blockchain={'near'}
      email={'user-email@email.com'}
    />
  );
}

export default App;
