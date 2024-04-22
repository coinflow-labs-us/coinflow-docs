import { Component } from "@angular/core";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { CoinflowWithdrawComponent } from "@coinflowlabs/angular";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [WithdrawComponent, CoinflowWithdrawComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "withdraw";
}
