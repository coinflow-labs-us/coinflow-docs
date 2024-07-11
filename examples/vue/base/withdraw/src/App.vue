<script setup lang="ts">
import { ref } from "vue";
import { CoinflowWithdraw } from "@coinflowlabs/vue";
import { ethers } from "ethers";

const privateKey = '0xbec62fbaa8d00ac585746d1a753d5077f844581f46c9edd5a7f2500110328112';

const height = ref(500);
const handleHeightChange = (newHeight: string) => {
  height.value = Number(newHeight);
};

const provider = new ethers.providers.JsonRpcProvider('https://base-sepolia-rpc.publicnode.com');
const wallet = new ethers.Wallet(privateKey, provider);

const sendTransaction = async (tx: ethers.providers.TransactionRequest) => {
  try {
    const transactionResponse = await wallet.sendTransaction(tx);
    await transactionResponse.wait();
    return transactionResponse;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
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
        blockchain: 'base',
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
