<script setup lang="ts">
  import { Connection, Keypair, Transaction, PublicKey } from "@solana/web3.js";
  import { sign } from "tweetnacl";
  import { ref, onMounted } from "vue";
  import { CoinflowPurchase } from "@coinflowlabs/vue";
  import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
  import {Buffer} from "buffer";


  window.Buffer = buffer.Buffer;

  const height = ref(500);
  const handleHeightChange = (newHeight: string) => {
    height.value = Number(newHeight);
  };

  const merchantId = process.env.VITE_MERCHANT_ID as string;
  const solanaRpcUrl = process.env.VITE_SOLANA_RPC_CONNECTION as string;
  const connection = new Connection(solanaRpcUrl);
  const keypair = Keypair.fromSecretKey(
    Uint8Array.from([
      56, 14, 246, 208, 184, 212, 110, 37, 164, 242, 149, 110, 238, 115, 65,
      243, 91, 159, 62, 192, 243, 4, 84, 48, 19, 210, 63, 37, 208, 36, 158, 61,
      242, 18, 206, 253, 243, 8, 213, 146, 146, 126, 125, 217, 207, 28, 77, 218,
      206, 8, 210, 3, 70, 26, 82, 213, 209, 139, 197, 120, 5, 103, 102, 171,
    ])
  );

  const sendTransaction = (tx: Transaction) => {
    tx.partialSign(keypair);
    return connection.sendRawTransaction(tx.serialize(), {skipPreflight: true});
  };

  const signMessage = (message: Uint8Array) => {
    return Promise.resolve(sign.detached(message, keypair.secretKey));
  };

  const transaction = ref<Transaction | null>(null);
  const usdcContractAddress = process.env.VITE_CONTRACT_ADDRESS as string;
  const USDC_MINT_ADDRESS = new PublicKey(usdcContractAddress);
  const recipientAddress = new PublicKey("4Nd1mTXkwwYNEFLCYYZr8AtHdkCf94Y3V8TZ6FL5A3Mq"); // Dummy address

  const initializeTx = async () => {
    const fromTokenAccount = await connection.getParsedTokenAccountsByOwner(keypair.publicKey, { mint: USDC_MINT_ADDRESS });
    const toTokenAccount = await connection.getParsedTokenAccountsByOwner(recipientAddress, { mint: USDC_MINT_ADDRESS });

    if (!fromTokenAccount.value.length || !toTokenAccount.value.length) {
      console.error("Token accounts not found for the specified addresses.");
      return;
    }

    const fromTokenAccountAddress = fromTokenAccount.value[0].pubkey;
    const toTokenAccountAddress = toTokenAccount.value[0].pubkey;

    const amount = 1000000; // 1 USDC (USDC has 6 decimal places)

    const tx = new Transaction().add(
      createTransferInstruction(
        fromTokenAccountAddress,
        toTokenAccountAddress,
        keypair.publicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    transaction.value = tx;
  };

  onMounted(initializeTx);
</script>

<template>
  <div v-if="transaction" :style="{width: '100%', height: `${height}px`}">
    <CoinflowPurchase :args="{
        wallet: {
          publicKey: keypair.publicKey.toBase58(),
          sendTransaction,
          signMessage,
        },
        env: 'sandbox',
        blockchain: 'solana',
        merchantId: merchantId,
        connection: connection,
        transaction: transaction.value,
        handleHeightChange,
        amount: 1
      }"
    />
  </div>
</template>

<style scoped>
div {
  width: 100%;
}
</style>
