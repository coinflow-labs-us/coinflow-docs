import React, {ReactNode, useMemo} from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import {
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  FractalWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {Transaction, VersionedTransaction} from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

export function Wallet({children}: {children: ReactNode}) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new Coin98WalletAdapter(),
      new CoinbaseWalletAdapter(),
      new FractalWalletAdapter(),
      new TrustWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useSolanaWallet() {
  const wallet = useWallet();
  const {connection} = useConnection();

  const sendTransaction = async (
    tx: Transaction | VersionedTransaction
  ): Promise<string> => {
    if (!wallet.signTransaction) {
      throw new Error('Wallet does not support transaction signing');
    }

    const signedTx = await wallet.signTransaction(tx);
    return connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
    });
  };

  return {
    ...wallet,
    sendTransaction,
  };
}
