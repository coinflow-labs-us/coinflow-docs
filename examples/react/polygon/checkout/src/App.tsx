import React, {useEffect, useState} from 'react';
import {
  CoinflowEnvs,
  CoinflowPurchase,
  EvmTransactionData,
} from '@coinflowlabs/react';
import {usePolygonWallet, Wallet} from './Wallet';
import {Web3Button} from '@web3modal/react';
import {NftMinting__factory} from './generated';
import {providers} from 'ethers';

function CoinflowContent() {
  const wallet = usePolygonWallet();
  const [tx, setTx] = useState<EvmTransactionData | undefined>(undefined);

  const amount = 1; // $1 USDC

  useEffect(() => {
    async function initializeTx() {
      if (!wallet.address) return;

      const provider = new providers.JsonRpcProvider(
        process.env.REACT_APP_POLYGON_RPC_URL as string
      );
      const NftMintingContractAddress =
        '0x4f74612412984b938D57be6e817AE17edEb5ef82';
      const contract = NftMinting__factory.connect(
        NftMintingContractAddress,
        provider
      );
      const tx: {to: string; data: string} =
        (await contract.populateTransaction.mintUsingUsdcWithSafeMint()) as {
          to: string;
          data: string;
        };
      setTx({
        type: 'safeMint',
        transaction: tx,
      });
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
      blockchain={'polygon'}
      transaction={tx}
      amount={1}
    />
  );
}

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

export default App;
