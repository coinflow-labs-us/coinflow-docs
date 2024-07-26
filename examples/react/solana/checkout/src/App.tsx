import React, {useEffect, useMemo, useState} from 'react';
import {Wallet} from './Wallet';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {CoinflowEnvs, CoinflowPurchase} from '@coinflowlabs/react';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {
  PublicKey,
  Transaction,
  type VersionedTransaction,
} from '@solana/web3.js';
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';

function CoinflowContent() {
  const {connection} = useConnection();
  const adapterWallet = useWallet();

  const {publicKey, sendTransaction, signMessage} = adapterWallet;

  const wallet = useMemo(
    () => ({
      publicKey,
      sendTransaction: <T extends Transaction | VersionedTransaction>(
        transaction: T
      ): Promise<string> => {
        return sendTransaction(transaction, connection);
      },
      signMessage,
    }),
    [publicKey, sendTransaction, signMessage]
  );

  const [transaction, setTransaction] = useState<Transaction | undefined>(
    undefined
  );

  const amount = 1; // 1 usdc

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

  if (!wallet.publicKey) return null;

  return (
    <CoinflowPurchase
      wallet={wallet}
      merchantId={process.env.REACT_APP_MERCHANT_ID as string}
      env={process.env.REACT_APP_ENV as CoinflowEnvs}
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
