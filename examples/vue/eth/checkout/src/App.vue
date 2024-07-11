<script setup lang="ts">
import { ref } from "vue";
import { CoinflowPurchase } from "@coinflowlabs/vue";
import { ethers } from "ethers";

const height = ref(500);
const handleHeightChange = (newHeight: string) => {
  height.value = Number(newHeight);
};


const wallet = ethers.Wallet.createRandom();
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_sepolia');
const connectedWallet = wallet.connect(provider);

const sendTransaction = async (tx: ethers.providers.TransactionRequest) => {
  const signedTransaction = await connectedWallet.signTransaction(tx);
  return provider.sendTransaction(signedTransaction);
};

const signMessage = async (message: string) => {
  return connectedWallet.signMessage(message);
};
</script>

<template>
  <div :style="{width: '100%', height: `${height}px`}">
    <CoinflowPurchase :args="{
        wallet: {
          publicKey: connectedWallet.address,
          sendTransaction,
          signMessage,
        },
        env: 'sandbox',
        blockchain: 'eth',
        merchantId: 'testtest',
        connection: provider,
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
