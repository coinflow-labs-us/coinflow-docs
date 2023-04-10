---
sidebar_position: 1
---

# Checkout

## Overview

Coinflow Checkout is a low-code integration to allow you to build a customized payment page to accept traditional 
payment methods (Credit Cards and ACH), or crypto wallets. The checkout is fully customizable and you can integrate it 
directly into your application.


Coinflow’s technology interacts with any smart contract. The underlying technology enables the digital asset 
transactions to be categorized as a digital good/service so stringent KYC verification isn't required, which makes 
the checkout experience much faster and cheaper for users.

## Pre-built UIs

Coinflow offers a suite of embeddable, pre-built UIs to help you quickly and securely integrate common checkout
workflows into your application. These pre-built UIs are fully customizable to your application's look and feel.
Additionally, all of our UIs are built with security in mind and are fully PCI-compliant. Utilizing our UIs will
allow your team to focus on your product instead of wasting time on compliance and security.

## Transactions

When you enable Coinflow Checkout, your users can buy digital assets and interact with your smart contract with a 
credit card, fiat bank, or by connecting their crypto wallet. 

To complete a purchase directly with your smart contract, you will need to pas in a `transaction` to the `CoinflowPurchase`
component. The `transaction` object should be constructed exactly like the user is making a USDC purchase. This means
for all supported chains, there is no difference in the transaction you pass between a user making a purchase with 
USDC, or them using their credit card. Coinflow takes care of all the complexities for you.

## Saved Cards

Cards for users are saved between purchases meaning that a user will only need to put in their credit card
details a single time. This improves conversion on subsequent purchases and reduces friction for your users. 

Coinflow is fully PCI-compliant and does not save this data directly on our servers. 

## Get Started

Head over to the [integration builder](http://localhost:3000/integration-builder?language=react&chain=solana&product=checkout) to get started!

## Testing Cards

### Visa

**Card**: 41111 11111 1111 111

**Exp**: Any future date

**CVV**: Any 3 digits

**Name on card**: Any Name

**Billing Address**: Any address

![NameStep](/img/docs/checkout/1.png)
