import { Component } from "@angular/core";
import { CardForm } from "./card-form/card-form.component";
import { CoinflowCardNumberInput, CoinflowCvvInputComponent } from "@coinflowlabs/angular";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [CardForm, CoinflowCardNumberInput, CoinflowCvvInputComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "card-form";
}
