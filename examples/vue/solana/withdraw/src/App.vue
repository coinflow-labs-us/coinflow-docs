<script setup lang="ts">
import { Connection, Keypair, Transaction, VersionedTransaction } from "@solana/web3.js";
import { sign } from "tweetnacl";
import { ref } from "vue";
import { CoinflowWithdraw } from "@coinflowlabs/vue";

const height = ref(500);
const handleHeightChange = (newHeight: string) => {
  height.value = Number(newHeight);
};
// HHxJEwJY7NDgrHpnBkX3DTmhG5mMnvGFsp631s1sptRQ
const keypair = Keypair.fromSecretKey(
  Uint8Array.from([
    56, 14, 246, 208, 184, 212, 110, 37, 164, 242, 149, 110, 238, 115, 65,
    243, 91, 159, 62, 192, 243, 4, 84, 48, 19, 210, 63, 37, 208, 36, 158, 61,
    242, 18, 206, 253, 243, 8, 213, 146, 146, 126, 125, 217, 207, 28, 77, 218,
    206, 8, 210, 3, 70, 26, 82, 213, 209, 139, 197, 120, 5, 103, 102, 171,
  ])
);
const sendTransaction = (tx: Transaction | VersionedTransaction) => {
  const connection = new Connection('https://api.devnet.solana.com');
  if ('recentBlockhash' in tx) {
    tx.partialSign(keypair);
  } else {
    (tx as VersionedTransaction).sign([keypair]);
  }
  return connection.sendRawTransaction(tx.serialize(), {skipPreflight: true});
};
const signMessage = (message: Uint8Array) => {
  return Promise.resolve(sign.detached(message, keypair.secretKey));
};
</script>

<template>
  <div :style="{width: '100%', height: `${height}px`}">
    <CoinflowWithdraw :args="{
        wallet: {
          publicKey: keypair.publicKey,
          sendTransaction,
          signMessage,
        },
        env: 'sandbox',
        blockchain: 'solana',
        merchantId: 'testtest',
        connection: new Connection('https://api.devnet.solana.com'),
        handleHeightChange,
      }"
    />
  </div>
</template>

<style scoped>
div {
  width: 100%;
}
</style>
