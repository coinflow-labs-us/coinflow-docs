import { Component } from "@angular/core";
import { CoinflowWithdrawComponent } from "@coinflowlabs/angular";
import {
  CoinflowWithdrawProps,
  EthWallet,
} from "@coinflowlabs/angular/lib/common/CoinflowTypes";
import { ethers } from "ethers";
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
  privateKey =
    "0x78a1508cb93ad25ffdb78eebb6075fa49795fd3a1e3721416fc04ef60c88f3ae";  // Replace wallet key
  key = ethers.utils.arrayify(this.privateKey);

  wallet!: EthWallet;
  withdrawProps!: CoinflowWithdrawProps;

  async initializeWallet() {
    const address = ethers.utils.computeAddress(this.key);
    const wallet: EthWallet = {
      address,
      sendTransaction: async (tx: ethers.providers.TransactionRequest) => {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://ethereum-rpc.publicnode.com",
        );
        const signer = new ethers.Wallet(this.key, provider);
        return signer.sendTransaction(tx);
      },

      signMessage: async (message: string) => {
        const messageUint8 = ethers.utils.toUtf8Bytes(message);
        const signature = sign.detached(messageUint8, this.key);
        const signatureHex = Buffer.from(signature).toString("hex");
        return Promise.resolve(signatureHex);
      },
    };

    this.wallet = wallet;
  }

  constructor() {
    this.initializeWallet();
    this.withdrawProps = {
      handleHeightChange: (height: string) => {
        this.withdrawHeight = height;
      },
      env: "sandbox",
      amount: 1, // usdc amount
      blockchain: "eth",
      merchantId: "coinflow", // replace with your merchant id
      wallet: this.wallet,
    };
  }
}
