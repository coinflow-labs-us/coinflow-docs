<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { CoinflowPurchase } from "@coinflowlabs/vue";
  import type { NormalRedeem } from "@coinflowlabs/vue";
  import { ethers } from "ethers";

  const height = ref(500);
  const handleHeightChange = (newHeight: string) => {
    height.value = Number(newHeight);
  };

  const merchantId = import.meta.env.VITE_MERCHANT_ID as string;
  const ethRpcUrl = import.meta.env.VITE_ETH_RPC_CONNECTION as string;

  const wallet = ethers.Wallet.createRandom();
  const provider = new ethers.providers.JsonRpcProvider(ethRpcUrl);
  const connectedWallet = wallet.connect(provider);

  const sendTransaction = async (transactionRequest: ethers.providers.TransactionRequest & {to: string}): Promise<{hash: string}> => {
    const signedTransaction = await connectedWallet.signTransaction(transactionRequest);
    const txResponse = await provider.sendTransaction(signedTransaction);
    const {hash} = txResponse;
    return {hash};
  };

  const signMessage = async (message: string): Promise<string> => {
    return await connectedWallet.signMessage(message);
  };

  const transaction = ref<NormalRedeem | null>(null);

  // Replace with your own transaction logic here
  const initializeTx = async () => {
    if (!connectedWallet.address) return;

    const recipientAddress = "0x0000000000000000000000000000000000000001"; // Dummy address
    const amount = ethers.utils.parseEther("0.01"); // Sending 0.01 ETH
    const rawTx: ethers.providers.TransactionRequest = {
      to: recipientAddress,
      value: amount
    };

    transaction.value = {
      transaction: {
        to: rawTx.to!,
        data: ethers.utils.hexlify(rawTx.data || "0x")
      }
    };
  };

  onMounted(initializeTx);
</script>

<template>
  <div v-if="transaction" :style="{width: '100%', height: `${height}px`}">
    <CoinflowPurchase :args="{
        wallet: {
          address: connectedWallet.address,
          sendTransaction,
          signMessage,
        },
        env: 'sandbox',
        blockchain: 'eth',
        merchantId: merchantId,
        transaction: transaction,
        handleHeightChange,
        amount: 1,
      }"
    />
  </div>
</template>

<style scoped>
div {
  width: 100%;
}
</style>
