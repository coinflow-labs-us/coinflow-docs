import {ReactNode, useCallback} from 'react';
import {polygonMumbai} from 'wagmi/chains';
import {
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
  useSignTypedData,
  useSignMessage,
} from 'wagmi';
import {sendTransaction, prepareSendTransaction} from '@wagmi/core';
import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum';
import {Web3Modal} from '@web3modal/react';
import {providers} from 'ethers';

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

export function useEthWallet() {
  const {address} = useAccount();
  const {signTypedDataAsync} = useSignTypedData();
  const {signMessageAsync} = useSignMessage();

  const sendTransactionWallet = useCallback(
    async (request: providers.TransactionRequest & {to: string}) => {
      const config = await prepareSendTransaction({request});
      const {hash} = await sendTransaction(config);
      return {hash};
    },
    []
  );

  const signMessageWallet = useCallback(
    async (message: string) => {
      try {
        console.log('signMessageWallet', {message});
        const signedTypeData = JSON.parse(message);
        console.log('Parsed message:', {signedTypeData});

        const {types, domain, message: msg} = signedTypeData;
        if (!types || !domain || !msg) {
          throw new Error('Incomplete EIP-712 data');
        }

        return await signTypedDataAsync({
          domain,
          types,
          value: msg,
        }).catch(e => {
          console.error('signTypedData error', e);
          throw e;
        });
      } catch (e) {
        console.error('Error during signTypedDataAsync', e);
        return await signMessageAsync({message}).catch(e => {
          console.error('signMessageAsync error', e);
          throw e;
        });
      }
    },
    [signMessageAsync, signTypedDataAsync]
  );

  return {
    address,
    signMessage: signMessageWallet,
    sendTransaction: sendTransactionWallet,
  };
}
