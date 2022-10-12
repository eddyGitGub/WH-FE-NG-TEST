/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CurrencyPipe } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{currencyPipe.transform(monthly_payment,'USD') }} <br/>
                    <b>Late Payment Fee : {{currencyPipe.transform(late_payment,'USD') }}</b> <br/>
                </div>`
})
export class Test01Component {

    /**
     *
     */
    constructor(public currencyPipe: CurrencyPipe) {
       
    }
    loan_amount:number = 1000;
    monthly_payment:number| string = this.loan_amount> 0? (2/100) * this.loan_amount : 'N/A';
    late_payment: number | string = this.loan_amount > 0 ? (5 / 100) * +this.monthly_payment : 'N/A';
}

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    providers: [CurrencyPipe],
    declarations : [Test01Component]
})
export class Test01Module {}