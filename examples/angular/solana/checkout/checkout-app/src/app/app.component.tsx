import {Component} from '@angular/core';
import { PurchaseComponent } from './purchase/purchase.component';
import { CoinflowPurchaseComponent } from '@coinflowlabs/angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PurchaseComponent, CoinflowPurchaseComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'checkout-app';
}
