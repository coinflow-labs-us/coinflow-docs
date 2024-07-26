import React, {useEffect, useState} from 'react';
import {Wallet, useSolanaWallet} from './Wallet';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {CoinflowPurchase} from '@coinflowlabs/react';
import {useConnection} from '@solana/wallet-adapter-react';
import {PublicKey, Transaction} from '@solana/web3.js';
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';

function CoinflowContent() {
  const {connection} = useConnection();
  const wallet = useSolanaWallet();
  const [transaction, setTransaction] = useState<Transaction | undefined>(
    undefined
  );
  const amount = 1;
  console.log(wallet);

  useEffect(() => {
    // Create a transaction that mints usdc
    async function createTx() {
      if (!wallet.publicKey) return;

      const usdcMint = new PublicKey(
        '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
      );
      const decimals = 6;

      const senderAta = getAssociatedTokenAddressSync(
        usdcMint,
        wallet.publicKey,
        true
      );
      const receiver = new PublicKey(
        '63zH5fKvSubyforhkAJEWwaeEUoLe8R864bETRLMrX1t'
      );
      const receiverAta = getAssociatedTokenAddressSync(
        usdcMint,
        receiver,
        true
      );

      const transferAmount = Number(amount) * Math.pow(10, decimals);
      const transferIx = createTransferCheckedInstruction(
        senderAta,
        usdcMint,
        receiverAta,
        wallet.publicKey,
        transferAmount,
        decimals
      );
      const tx = new Transaction();
      tx.add(transferIx);
      tx.feePayer = wallet.publicKey;
      const {blockhash} = await connection.getLatestBlockhash('finalized');
      tx.recentBlockhash = blockhash;
      setTransaction(tx);
    }

    createTx();
  }, [amount, wallet.publicKey]);

  return (
    <CoinflowPurchase
      wallet={wallet}
      merchantId={'testtest'} // process.env.REACT_APP_MERCHANT_ID as string
      env={'sandbox'} // process.env.REACT_APP_ENV as CoinflowEnvs
      connection={connection}
      transaction={transaction}
      amount={amount}
      blockchain={'solana'}
      onSuccess={() => {
        console.log('Purchase Success');
      }}
      email={'user-email@email.com'}
      webhookInfo={{item: 'sword'}}
    />
  );
}

function App() {
  return (
    <Wallet>
      <div className="App">
        <WalletMultiButton />
        <div style={{height: '100vh'}}>
          <CoinflowContent />
        </div>
      </div>
    </Wallet>
  );
}

export default App;
