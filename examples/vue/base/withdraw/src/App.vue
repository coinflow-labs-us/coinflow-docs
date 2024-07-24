<script setup lang="ts">
import { ref } from "vue";
import { CoinflowWithdraw } from "@coinflowlabs/vue";
import { ethers } from "ethers";

const height = ref(500);
const handleHeightChange = (newHeight: string) => {
  height.value = Number(newHeight);
};

const merchantId = import.meta.env.VITE_MERCHANT_ID as string;
const privateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY as string;
const rpcUrl = import.meta.env.VITE_RPC_URL as string;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

console.log("Base wallet address:", wallet.address);

const sendTransaction = async (transaction: ethers.providers.TransactionRequest & { to: string }): Promise<{hash: string}> => {
  const signedTransaction = await wallet.signTransaction(transaction);
    const txResponse = await provider.sendTransaction(signedTransaction);
    const {hash} = txResponse;
    return {hash};
};

 const signMessage = async (message: string): Promise<string> => {
    return await wallet.signMessage(message);
  };
</script>

<template>
  <div :style="{width: '100%', height: `${height}px`}">
    <CoinflowWithdraw :args="{
        wallet: {
          address: wallet.address,
          sendTransaction,
          signMessage,
        },
        env: 'sandbox',
        blockchain: 'base',
        merchantId: merchantId,
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
