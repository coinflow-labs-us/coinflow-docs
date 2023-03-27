import {ReactNode} from 'react';
import {polygonMumbai} from 'wagmi/chains';
import {configureChains, createClient, WagmiConfig} from 'wagmi';
import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum';
import {Web3Modal} from '@web3modal/react';

const WalletConnectProjectId = process.env
  .REACT_APP_WALLET_CONNECT_PROJECT_ID as string;

export function Wallet({children}: {children: ReactNode}) {
  const chains = [polygonMumbai];
  const {provider} = configureChains(chains, [
    w3mProvider({projectId: WalletConnectProjectId}),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
      projectId: WalletConnectProjectId,
      version: 2,
      chains,
    }),
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <div
      className={'flex flex-col items-center justify-center h-screen w-screen'}
    >
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
      <Web3Modal
        projectId={WalletConnectProjectId}
        ethereumClient={ethereumClient}
      />
    </div>
  );
}
