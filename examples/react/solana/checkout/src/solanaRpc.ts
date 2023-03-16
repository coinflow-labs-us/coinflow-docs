import {Connection, PublicKey, Transaction} from '@solana/web3.js';
import {CustomChainConfig, SafeEventEmitterProvider} from '@web3auth/base';
import {SolanaWallet} from '@web3auth/solana-provider';

export default class SolanaRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  getAccounts = async (): Promise<string[]> => {
    try {
      const solanaWallet = new SolanaWallet(this.provider);
      const acc = await solanaWallet.requestAccounts();

      return acc;
    } catch (error) {
      return error as string[];
    }
  };

  getBalance = async (): Promise<string> => {
    try {
      const solanaWallet = new SolanaWallet(this.provider);
      const connectionConfig = await solanaWallet.request<CustomChainConfig>({
        method: 'solana_provider_config',
        params: [],
      });
      const conn = new Connection(connectionConfig.rpcTarget);

      const accounts = await solanaWallet.requestAccounts();
      const balance = await conn.getBalance(new PublicKey(accounts[0]));

      return balance.toString();
    } catch (error) {
      return error as string;
    }
  };

  signMessage = async (message: string): Promise<Uint8Array> => {
    const solanaWallet = new SolanaWallet(this.provider);
    const msg = Buffer.from(message, 'utf8');
    return await solanaWallet.signMessage(msg);
  };

  sendTransaction = async (transaction: Transaction): Promise<string> => {
    const solanaWallet = new SolanaWallet(this.provider);

    const {signature} = await solanaWallet.signAndSendTransaction(transaction);

    return signature;
  };

  signTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const solanaWallet = new SolanaWallet(this.provider);

    return await solanaWallet.signTransaction(transaction);
  };

  getPrivateKey = async (): Promise<string> => {
    const privateKey = await this.provider.request({
      method: 'solanaPrivateKey',
    });

    return privateKey as string;
  };
}
