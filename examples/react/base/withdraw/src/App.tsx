import React from 'react';
import {CoinflowEnvs, CoinflowWithdraw} from '@coinflowlabs/react';
import {useEthWallet, Wallet} from './Wallet';
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
  const wallet = useEthWallet();

  return (
    <CoinflowWithdraw
      wallet={wallet}
      merchantId={process.env.REACT_APP_MERCHANT_ID as string}
      env={process.env.REACT_APP_ENV as CoinflowEnvs}
      onSuccess={() => console.log('Withdraw Success')}
      blockchain={'base'}
    />
  );
}

export default App;
