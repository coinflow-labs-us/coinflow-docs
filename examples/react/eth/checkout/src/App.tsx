import React, {useEffect, useState} from 'react';
import {CoinflowEnvs, CoinflowPurchase} from '@coinflowlabs/react';
import {useEthWallet, Wallet} from './Wallet';
import {Web3Button} from '@web3modal/react';
import {providers} from 'ethers';
import {UsdcWrapper__factory} from './generated';

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

  const [tx, setTx] = useState<
    (providers.TransactionRequest & {to: string}) | undefined
  >(undefined);

  const amount = 1;

  useEffect(() => {
    async function initializeTx() {
      if (!wallet.address) return;

      const tx = (await UsdcWrapper__factory.connect(
        '0x27d72459460B925acf25451a255A517a96Cf6899',
        new providers.JsonRpcProvider(
          process.env.REACT_APP_ETH_RPC_URL as string
        )
      ).populateTransaction.buyWusdcModified(amount * 1e6, {
        from: wallet.address,
      })) as providers.TransactionRequest & {to: string};
      setTx(tx);
    }

    initializeTx();
  }, [amount, wallet.address, wallet.sendTransaction]);

  if (!wallet?.address) return null;

  return (
    <CoinflowPurchase
      wallet={wallet}
      merchantId={process.env.REACT_APP_MERCHANT_ID as string}
      env={process.env.REACT_APP_ENV as CoinflowEnvs}
      onSuccess={() => console.log('Withdraw Success')}
      blockchain={'eth'}
      transaction={tx}
      amount={1}
    />
  );
}

export default App;
