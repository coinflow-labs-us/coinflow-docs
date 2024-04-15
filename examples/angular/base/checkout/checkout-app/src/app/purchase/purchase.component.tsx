import { Component } from '@angular/core';
import { CoinflowPurchaseComponent } from '@coinflowlabs/angular';
import { CoinflowPurchaseProps, EthWallet } from '@coinflowlabs/angular/lib/common/CoinflowTypes';
import { ethers } from 'ethers';
import { sign } from 'tweetnacl';

@Component({
  selector: 'app-purchase',
  imports: [CoinflowPurchaseComponent],
  standalone: true,
  template: `
    <div [style.height]="purchaseHeight + 'px'">
      <lib-coinflow-purchase [purchaseProps]="purchaseProps"></lib-coinflow-purchase>
    </div>
  `,
})
export class PurchaseComponent {
  purchaseHeight: string = '500';
  privateKey = '0x78a1508cb93ad25ffdb78eebb6075fa49795fd3a1e3721416fc04ef60c88f3ae';
  key = ethers.utils.arrayify(this.privateKey);
  

  wallet!: EthWallet;
  purchaseProps!: CoinflowPurchaseProps;

  async initializeWallet() {
    const address = ethers.utils.computeAddress(this.key);
    const wallet: EthWallet = {
      address,
      sendTransaction: async (tx: ethers.providers.TransactionRequest) => {
        const provider = new ethers.providers.JsonRpcProvider('https://base-rpc.publicnode.com');
        const signer = new ethers.Wallet(this.key, provider);
        return signer.sendTransaction(tx);
      },
      
      signMessage: async (message: string) => {
        const messageUint8 = ethers.utils.toUtf8Bytes(message);
        const signature = sign.detached(messageUint8, this.key);
        const signatureHex = Buffer.from(signature).toString('hex');
        return Promise.resolve(signatureHex);
      },
    };

    this.wallet = wallet;
  }

  constructor() {
    this.initializeWallet();
    this.purchaseProps = {
      handleHeightChange: (height: string) => {
        this.purchaseHeight = height;
      },
      env: 'sandbox',
      amount: 1, // usdc amount
      blockchain: 'base',
      merchantId: 'coinflow', // replace with your merchant id here
      wallet: this.wallet,
    };
  }

}
