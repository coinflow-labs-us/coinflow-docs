---
sidebar_position: 6
---

# USDC Settlement

Some merchants may want to settle their USDC directly to their crypto wallet. This is most common for merchants who are 
already processing payments with other payment service providers, but want their purchases to settle instantly to USDC,
and who don't currently have a smart contract. This is possible with Coinflow, but it requires a few extra steps.

## 1. Create a USDC Wallet

### Solana

1. This can be any Solana Wallet. You can even create a multi sig on [squads protocol](https://v3.squads.so/).
2. Next you need to send some USDC to the wallet. Sending USDC to the wallet creates an Associated Token Account for the wallet.
3. Copy the ATA address. You will need it later.

### Near

1. This can be any Near Wallet.
2. Next you need to send some USDC to the wallet. Sending USDC to the wallet creates the storage deposit for the wallet.
3. Copy the Wallet address. You will need it later.

### Polygon

1. This can be any Polygon Wallet.
2. Next you need to send some USDC to the wallet. Sending USDC to the wallet creates the storage deposit for the wallet.
3. Copy the Wallet address. You will need it later.

## 2. Configure your USDC Settlement

![NameStep](/img/docs/usdc-settlement/1.png)

1. Go to the [Merchant Dashboard](https://merchant.coinflow.cash) and click on the "Settings" tab.
2. Scroll down to the "Settlement Settings" section.
3. Paste the Wallet Address or the USDC ATA (Solana) address into the "Settlement Address" field.
4. Click Submit.

## 3. Test your USDC Settlement
1. Go to your checkout page and complete a purchase.
2. You will see that when transaction is successful, but the USDC is not sent to your wallet.

**Important: Make sure NOT to specify a `transaction` prop in your `CoinflowCheckout` component.**
