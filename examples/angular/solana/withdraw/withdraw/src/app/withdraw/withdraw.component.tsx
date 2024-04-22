import { Component } from "@angular/core";
import { CoinflowWithdrawComponent } from "@coinflowlabs/angular";
import { CoinflowWithdrawProps } from "@coinflowlabs/angular/lib/common/CoinflowTypes";
import {
  Connection,
  Keypair,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { sign } from "tweetnacl";

@Component({
  selector: "app-withdraw",
  imports: [CoinflowWithdrawComponent],
  standalone: true,
  template: `
    <div [style.height]="withdrawHeight + 'px'">
      <lib-coinflow-withdraw
        [withdrawProps]="withdrawProps"
      ></lib-coinflow-withdraw>
    </div>
  `,
})
export class WithdrawComponent {
  withdrawHeight: string = "500";
    keypair = new Keypair(); // Replace wallet keypair

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

  withdrawProps: CoinflowWithdrawProps = {
    handleHeightChange: (height: string) => {
      this.withdrawHeight = height;
    },
    env: "sandbox",
    blockchain: "solana",
    merchantId: "coinflow", // replace with your merchant id
    connection: new Connection("https://api.devnet.solana.com"),
    wallet: this.wallet,
  };
}
