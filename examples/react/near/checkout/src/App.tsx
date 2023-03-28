import React, {useEffect, useState} from 'react';
import './App.css';
import {
  CoinflowEnvs,
  CoinflowPurchase,
  NearFtTransferCallAction,
} from '@coinflowlabs/react';
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

  const [action, setAction] = useState<NearFtTransferCallAction | undefined>(
    undefined
  );

  const amount = 1;

  useEffect(() => {
    const receiver_id = 'dev-1673621022029-65276443796476';

    const action: NearFtTransferCallAction = {
      methodName: 'ft_transfer_call',
      args: {
        receiver_id,
        amount: Math.trunc(amount * 1e6).toString(),
        msg: 'buy_wusdc',
      },
      gas: Number(100_000_000_000_000).toString(),
      deposit: '1',
    };

    setAction(action);
  }, [amount]);

  if (!wallet) return null;

  return (
    <CoinflowPurchase
      wallet={wallet}
      merchantId={process.env.REACT_APP_MERCHANT_ID as string}
      env={process.env.REACT_APP_ENV as CoinflowEnvs}
      onSuccess={() => console.log('Purchase Success')}
      blockchain={'near'}
      email={'user-email@email.com'}
      amount={amount}
      action={action}
    />
  );
}

export default App;
