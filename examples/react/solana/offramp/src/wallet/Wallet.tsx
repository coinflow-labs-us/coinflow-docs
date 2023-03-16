import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Connection, PublicKey, Transaction} from '@solana/web3.js';
import RPC from '../solanaRpc';
import {Web3Auth} from '@web3auth/modal';
import {CHAIN_NAMESPACES, SafeEventEmitterProvider} from '@web3auth/base';

export interface WalletContextProps {
  wallet: null;
  connected: boolean;
  publicKey: PublicKey | null;
  connection: Connection | null;
  sendTransaction: (transaction: Transaction) => Promise<string>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signMessage: (message: string) => Promise<Uint8Array>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps>({
  wallet: null,
  connected: false,
  publicKey: null,
  connection: null,
  sendTransaction: () => Promise.reject(new Error('')),
  signTransaction: () => Promise.reject(new Error('')),
  signMessage: () => Promise.reject(new Error('')),
  connect: () => Promise.reject(new Error('')),
  disconnect: () => Promise.reject(new Error('')),
});

export function WalletContextProvider({children}: {children: ReactNode}) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  const connected = useMemo(() => !!publicKey, [publicKey]);

  const connection = useMemo(() => {
    const rpcUrl = web3auth?.options.chainConfig.rpcTarget;
    if (!rpcUrl) return null;
    return new Connection(rpcUrl, 'confirmed');
  }, [web3auth?.options.chainConfig.rpcTarget]);

  const sendTransaction = useCallback(
    async (transaction: Transaction) => {
      if (!provider) {
        throw new Error('provider not initialized yet');
      }
      await connection?.simulateTransaction(transaction).then((res) => console.log("Simulation successful", {res})).catch(e => console.error(e));
      const rpc = new RPC(provider);
      return await rpc.sendTransaction(transaction);
    },
    [connection, provider]
  );

  const signTransaction = useCallback(
    async (transaction: Transaction) => {
      if (!provider) {
        throw new Error('provider not initialized yet');
      }
      const rpc = new RPC(provider);
      return await rpc.signTransaction(transaction);
    },
    [provider]
  );

  const signMessage = useCallback(
    async (message: string) => {
      if (!provider) {
        throw new Error('provider not initialized yet');
      }
      const rpc = new RPC(provider);
      return await rpc.signMessage(message);
    },
    [provider]
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId:
            'BKPNPUxXPoDfsjTw6AF1dfMJdyzYeXMskYWmObAcicEdSYS91NVb_cMeIVZIi_M55jF-i3wiNRaVblr5347Clss',
          web3AuthNetwork: 'testnet', // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.SOLANA,
            chainId: '0x3', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
            rpcTarget:
              'https://rpc-devnet.helius.xyz/?api-key=2f915565-3608-4451-9150-4e72f50f10c2', // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const connect = async () => {
    if (!web3auth) {
      throw new Error('web3auth not initialized yet');
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  useEffect(() => {
    const getAccounts = async () => {
      if (!provider) {
        throw new Error('provider not initialized yet');
      }
      const rpc = new RPC(provider);
      return await rpc.getAccounts();
    };

    if (!provider) {
      setPublicKey(null);
      return;
    }

    getAccounts().then(([account]) => {
      setPublicKey(new PublicKey(account));
    });
  }, [provider]);

  const disconnect = async () => {
    if (!web3auth) {
      throw new Error('web3auth not initialized yet');
    }
    await web3auth.logout();
    setProvider(null);
  };

  return (
    <WalletContext.Provider
      value={{
        wallet: null,
        connected,
        publicKey,
        sendTransaction,
        signMessage,
        connect,
        disconnect,
        connection,
        signTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
