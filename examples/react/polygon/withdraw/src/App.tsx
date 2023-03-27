import React from 'react';
import {CoinflowEnvs, CoinflowWithdraw} from '@coinflowlabs/react';
import {usePolygonWallet, Wallet} from './Wallet';
import {Web3Button} from '@web3modal/react';

function App() {
  return (
    <Wallet>
      <div className="App">
        <Web3Button />
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
  const wallet = usePolygonWallet();

  return (
    <CoinflowWithdraw
      wallet={wallet}
      merchantId={process.env.REACT_APP_MERCHANT_ID as string}
      env={process.env.REACT_APP_ENV as CoinflowEnvs}
      onSuccess={() => console.log('Withdraw Success')}
      blockchain={'polygon'}
    />
  );
}

export default App;
