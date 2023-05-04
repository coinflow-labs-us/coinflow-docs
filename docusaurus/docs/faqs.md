# Frequently Asked Questions (FAQs)

## Purchasing

### Are there minimum/maximum purchase amounts?

The minimum purchase amount is $0.50, and the maximum can be configured based on your risk tolerance.

### How customizable is the amount field?

The field is completely customizable with the enterprise plan. Teams can also pre-fill the amount fields.

### How does the charge appear on the user's credit card statement?

The charge will appear as from Coinflow Labs, as we are the merchant of record.

### Can a card be charged but the user never signs the transaction?

Yes, in this case, the user will see that they have a balance which can be redeemed and sent to you all. If they request a refund, we or you all can refund the card and decrease their balance via the admin panel.

### Does the user need any SOL in their wallet?

No, we cover gas.

### Do you support subscriptions / auto-recurring payments?

Yes, all major payment providers support subscription payments

### Which geographies are available?

- Our Checkout product is available in all countries (aside from [OFAC sanctioned countries](https://ofac.treasury.gov/sanctions-programs-and-country-information))
- Our Offramp product is currently available only in the U.S. We are working to expand the service to Europe and Latin America. We will prioritize additional countries and region based on demand.

## Chargebacks

### How are chargebacks handled?

If a chargeback occurs, we will be notified by our payment processor. We will initiate the refund if possible, and if not, we will initiate the process with the card network. If the chargeback is lost, we will request the USDC from the original purchase amount to be sent back to us.

## Fraud Detection

### Is there anything done automatically on your side for fraud detection?

Yes, our systems perform automatic fraud detection on all cards, making sure they match with records on file and are within constraints for device risk scores.

## Webhooks

### Is there a chargeback webhook?

No, there is not currently a chargeback webhook. The team is working on getting one ready!

### What are the data limitations that can be passed into the webhookInfo object?

There are no limitations. One can pass any valid JSON object into the webhookInfo object.

### When exactly does the webhook fire?

The webhook fires on completion of the on-chain transaction.

### What happens if the chain transaction is slow, or Solana has an outage, chain errors, retries, etc.?

The credit cards will process, and the on-chain transactions are delayed in our queue and re-tried until the chain comes back online. Nothing is ever dropped from our systems. We have been developing applications on Solana since 2021 and have learned how to maintain system operations / recovery in the case of an outage.

## Other

### What is the transaction object?

The transaction object is simply a Solana transaction. For example, a USDC transfer from the user's wallet to your wallet.

### Can we walk through exactly the operations that happen on-chain and off-chain?

Everything happens off-chain except for the movement of the USDC.

### Do you support Custom wallets? How does it work?

Yes Coinflow accepts any wallet! To accept your custom wallets, you will need to create an object which is passed into the "wallet" prop of the react component. That object needs to adhere to the following interfaces:

Solana:

```
{
    publicKey: PublicKey;
    sendTransaction: (transaction: Transaction) ⇒ Promise<string>;
}
```

Near:

```
{
    accountId: string;
    signAndSendTransaction(params: SignAndSendTransactionParams) ⇒ Promise<***providers***.FinalExecutionOutcome>;
}
```

Evm:

```
{
    address: string;
    sendTransaction: (transaction) → Promise<{hash: string}>;
    signMessage: (message: string) => Promise<string>;
}```
