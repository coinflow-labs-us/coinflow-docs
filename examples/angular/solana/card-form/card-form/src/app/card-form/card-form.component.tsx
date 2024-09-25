import { Component, ViewChild } from "@angular/core";
import { CoinflowCardNumberInput, CoinflowCvvInputComponent } from "@coinflowlabs/angular";
import { CoinflowEnvs } from "@coinflowlabs/angular/lib/common";


@Component({
    selector: 'card-form',
    standalone: true,
    imports: [CoinflowCardNumberInput, CoinflowCvvInputComponent],
    template: `
      <div>
        <div [style.height]="50 + 'px'">
          <lib-coinflow-card-number-input
            #child
            [args]="cardNumberInputProps"
          ></lib-coinflow-card-number-input>
        </div>
        <div [style.height]="40 + 'px'">
          <lib-coinflow-cvv-input></lib-coinflow-cvv-input>
        </div>
        <button [style.margin-top]="20 + 'px'" (click)="onClick()">Tokenize</button>
      </div>
    `,
  })
  export class CardForm {
    @ViewChild('child') child!: CoinflowCardNumberInput;
  
    cardNumberInputProps = {
      env: 'sandbox' as CoinflowEnvs,
      debug: true,
      font: 'Arial',
      css: {
        base: 'font-family: Montserrat, sans-serif; padding: 0 8px; border: 1px solid #ccc; margin: 0; width: 100%; font-size: 13px; line-height: 48px; height: 48px; box-sizing: border-box; -moz-box-sizing: border-box;',
        focus: 'outline: 0; border: 1px solid #007bff;', // Adding a blue border on focus
        error: 'box-shadow: 0 0 6px 0 rgba(224, 57, 57, 0.5); border: 1px solid rgba(224, 57, 57, 0.5);',
        cvv: {
          base: 'font-family: Montserrat, sans-serif; padding: 0 8px; border: 1px solid #ccc; margin: 0; width: 100%; font-size: 13px; line-height: 48px; height: 48px; box-sizing: border-box; -moz-box-sizing: border-box;',
          focus: 'outline: 0; border: 1px solid #007bff;', // Adding a blue border on focus for CVV input
          error: 'box-shadow: 0 0 6px 0 rgba(224, 57, 57, 0.5); border: 1px solid rgba(224, 57, 57, 0.5);',
        },
      },
    };
  
    onClick() {
      console.log('onClick');
      this.child.tokenize().then((res: any) => console.log(res));
    }
  }
  