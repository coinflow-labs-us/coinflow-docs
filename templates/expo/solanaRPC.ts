import { Buffer } from "buffer";
import {
  Connection,
  Keypair,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";

global.Buffer = global.Buffer || Buffer;

const getAccounts = async (key: string) => {
  try {
    const wallet = getKeypair(key);
    return await wallet.publicKey;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const sendTransaction = async (
  key: string,
  transaction: Transaction | VersionedTransaction
) => {
  try {
    const wallet = getKeypair(key);
    if (transaction instanceof Transaction) {
      transaction.partialSign(wallet);
    } else {
      transaction.sign([wallet]);
    }

    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );
    return await connection.sendRawTransaction(transaction.serialize());
  } catch (error) {
    return error;
  }
};

function getKeypair(key: string): Keypair {
  return Keypair.fromSecretKey(new Uint8Array(Buffer.from(key, "hex")));
}

export default {
  getAccounts,
  sendTransaction,
};
