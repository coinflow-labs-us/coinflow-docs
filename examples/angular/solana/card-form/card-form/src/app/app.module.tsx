import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CardForm } from "./card-form/card-form.component";
import { CoinflowCardNumberInput, CoinflowCvvInputComponent } from "@coinflowlabs/angular";

@NgModule({
  declarations: [AppComponent, CardForm, CoinflowCardNumberInput, CoinflowCvvInputComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
