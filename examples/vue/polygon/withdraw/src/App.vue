<script setup lang="ts">
import { ref } from "vue";
import { CoinflowWithdraw } from "@coinflowlabs/vue";
import { ethers } from "ethers";

const height = ref(500);
const handleHeightChange = (newHeight: string) => {
  height.value = Number(newHeight);
};

const merchantId = process.env.VITE_MERCHANT_ID as string;
const privateKey = process.env.VITE_WALLET_PRIVATE_KEY as string;
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/polygon_amoy');
const wallet = new ethers.Wallet(privateKey, provider);

console.log("Ethereum wallet address:", wallet.address);

const sendTransaction = async (tx: ethers.providers.TransactionRequest) => {
  const signedTransaction = await wallet.signTransaction(tx);
  return provider.sendTransaction(signedTransaction);
};

const signMessage = async (message: string) => {
  try {
    const { domain, message: value } = JSON.parse(message);
    const types = {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ]
    };

    const signature = await wallet._signTypedData(domain, types, value);
    return signature;
  } catch (error) {
    console.error("Error signing typed data:", error);
    throw error;
  }
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
        blockchain: 'polygon',
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
