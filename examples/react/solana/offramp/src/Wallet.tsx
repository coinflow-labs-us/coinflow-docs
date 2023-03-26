import React, {ReactNode, useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {
  BackpackWalletAdapter,
  BraveWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  FractalWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

export function Wallet({children}: {children: ReactNode}) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter(),
      new GlowWalletAdapter(),
      new TorusWalletAdapter(),
      new BackpackWalletAdapter(),
      new Coin98WalletAdapter(),
      new CoinbaseWalletAdapter(),
      new BraveWalletAdapter(),
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
