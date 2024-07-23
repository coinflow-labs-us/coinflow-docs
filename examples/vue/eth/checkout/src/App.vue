<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { CoinflowPurchase } from "@coinflowlabs/vue";
  import { ethers } from "ethers";

  const height = ref(500);
  const handleHeightChange = (newHeight: string) => {
    height.value = Number(newHeight);
  };

  const merchantId = process.env.VITE_MERCHANT_ID as string;
  const ethRpcUrl = process.env.VITE_ETH_RPC_CONNECTION as string;

  const wallet = ethers.Wallet.createRandom();
  const provider = new ethers.providers.JsonRpcProvider(ethRpcUrl);
  const connectedWallet = wallet.connect(provider);

  const sendTransaction = async (tx: ethers.providers.TransactionRequest) => {
    const signedTransaction = await connectedWallet.signTransaction(tx);
    return provider.sendTransaction(signedTransaction);
  };

  const signMessage = async (message: string) => {
    return connectedWallet.signMessage(message);
  };

  const usdcAbi = [
    "function transfer(address to, uint256 amount) public returns (bool)"
  ];
  const usdcContractAddress = process.env.VITE_CONTRACT_ADDRESS as string;
  const usdcContract = new ethers.Contract(usdcContractAddress, usdcAbi, connectedWallet);
  const transaction = ref<{ to: string; data: string } | null>(null);

  // Replace with your own transaction logic here
  const initializeTx = async () => {
    if (!connectedWallet.address) return;

    const recipientAddress = "0x0000000000000000000000000000000000000001"; // Dummy address
    const amount = ethers.utils.parseUnits("1", 6);
    const rawTx = await usdcContract.populateTransaction.transfer(recipientAddress, amount);

    transaction.value = {
      to: rawTx.to!,
      data: rawTx.data!
    };
  };

  onMounted(initializeTx);
</script>

<template>
  <div v-if="transaction" :style="{width: '100%', height: `${height}px`}">
    <CoinflowPurchase :args="{
        wallet: {
          publicKey: connectedWallet.address,
          sendTransaction,
          signMessage,
        },
        env: 'sandbox',
        blockchain: 'eth',
        merchantId: merchantId,
        connection: provider,
        transaction: transaction.value,
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
