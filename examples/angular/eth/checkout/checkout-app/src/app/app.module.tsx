import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { CoinflowPurchaseComponent } from '@coinflowlabs/angular';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseComponent, 
    CoinflowPurchaseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
