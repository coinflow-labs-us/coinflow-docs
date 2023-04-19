---
sidebar_position: 3
---

# Checkout Webhook

**[A Webhook in web development is a method of augmenting or altering the behavior of a web page or web application with custom callbacks](https://en.wikipedia.org/wiki/Webhook)**

Coinflow supports webhooks for purchases which allows your application to listen for purchase events from your customers.

### Setup Coinflow Checkout
[Solana Merchant Integration](https://coinflow.notion.site/Solana-Merchant-Integration-2e031a4a7ec847619b2891bfbb8a9d5c)

[Near Merchant Integration](https://coinflow.notion.site/Near-Merchant-Integration-f27a48fc2a7c41c295925a03198db40f)

In the `CoinflowPurchase` component set any arbitrary purchase metadata that will be included in the webhook request:
```javascript
<CoinflowPurchase
	...
	webhookInfo={{item: "sword"}}
/>
```
### Configure Webhook

1. #### Go to the [Production Merchant](https://merchant.coinflow.cash/) Panel or the [Sandbox Merchant Panel](https://sandbox-merchant.coinflow.cash/)
2. #### Login

![Login](/img/docs/chekout-webhook/login.png)

3. #### Go to the Automation tab

![Automation Tab](/img/docs/chekout-webhook/automation_tab.png)

4. #### Configure the URL where the webhook will be sent and copy the auth token

  a. Paste the URL that your server will be receiving webhooks in the Webhook URL

  b. Copy the API key for use in authorization

![Automation Tools](/img/docs/chekout-webhook/automation_tools.png)


## Setup Webhook Endpoint

1. Set up your server is configured to listen for a POST request at the URL you provided in step 4a above.
2. When listening for the webhook, make sure you confirm that the `Authorization` header is equal to the auth token you copied in step 4b. This confirms that the requests to this URL are  coming from Coinflow.
3. The format of the body of the webhook request is as follows:

```javascript
{
  signature: string, // Signature of the transaction which sent the credits to the user
  wallet: string, // The users wallet public key or address
  webhookInfo: object, // This is the webhook info you passed into the Coinflow Purchase component
  subtotal: {cents: number}, // The price the user paid for the good/service
  fees: {cents: number}, // Amount the user paid in Credit Card fees
  gasFees: {cents: number}, // Amount the user paid in gas fees (near only)
  total: {cents: number}, // Total credit card purchase amount
  id: string, // Unique ID of the purchase
}
```
