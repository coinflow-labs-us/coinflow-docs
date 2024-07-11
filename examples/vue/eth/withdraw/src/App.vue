<script setup lang="ts">
import { ref } from "vue";
import { CoinflowWithdraw } from "@coinflowlabs/vue";
import { ethers } from "ethers";

const height = ref(500);
const handleHeightChange = (newHeight: string) => {
  height.value = Number(newHeight);
};


const privateKey = "0x4c0883a69102937d6231471b5dbb6204fe512961708279987bab1fbd6f5eecf8";
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_sepolia');
const wallet = new ethers.Wallet(privateKey, provider);

console.log("Ethereum wallet address:", wallet.address);

const sendTransaction = async (tx: ethers.providers.TransactionRequest) => {
  const signedTransaction = await wallet.signTransaction(tx);
  return provider.sendTransaction(signedTransaction);
};

const signMessage = async (message: string) => {
  return wallet.signMessage(message);
};
</script>

<template>
  <div :style="{width: '100%', height: `${height}px`}">
    <CoinflowWithdraw :args="{
        wallet: {
          publicKey: wallet.address,
          sendTransaction,
          signMessage,
        },
        env: 'sandbox',
        blockchain: 'eth',
        merchantId: 'testtest',
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
