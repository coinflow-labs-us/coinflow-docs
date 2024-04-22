import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { CoinflowWithdrawComponent } from "@coinflowlabs/angular";

@NgModule({
  declarations: [AppComponent, WithdrawComponent, CoinflowWithdrawComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
