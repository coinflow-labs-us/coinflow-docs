import { Component } from "@angular/core";
import { CoinflowPurchaseComponent } from "@coinflowlabs/angular";
import { CoinflowPurchaseProps } from "@coinflowlabs/angular/lib/common/CoinflowTypes";
import {
  Connection,
  Keypair,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { sign } from "tweetnacl";

@Component({
  selector: "app-purchase",
  imports: [CoinflowPurchaseComponent],
  standalone: true,
  template: `
    <div [style.height]="purchaseHeight + 'px'">
      <lib-coinflow-purchase
        [purchaseProps]="purchaseProps"
      ></lib-coinflow-purchase>
    </div>
  `,
})
export class PurchaseComponent {
  purchaseHeight: string = "500";
  keypair = new Keypair();
  wallet = {
    publicKey: this.keypair.publicKey,
    sendTransaction: (tx: Transaction | VersionedTransaction) => {
      const connection = new Connection("https://api.devnet.solana.com");
      if (tx instanceof Transaction) {
        tx.sign(this.keypair);
      } else {
        tx.sign([this.keypair]);
      }
      return connection.sendRawTransaction(tx.serialize());
    },
    signMessage: (message: Uint8Array) => {
      return Promise.resolve(sign.detached(message, this.keypair.secretKey));
    },
  };
  purchaseProps: CoinflowPurchaseProps = {
    handleHeightChange: (height: string) => {
      this.purchaseHeight = height;
    },
    env: "sandbox",
    amount: 1,
    blockchain: "solana",
    merchantId: "coinflow", // replace with your merchant id
    connection: new Connection("https://api.devnet.solana.com"),
    wallet: this.wallet,
  };
}
