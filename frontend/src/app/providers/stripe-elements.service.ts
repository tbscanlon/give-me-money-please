import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { StripeService, Elements, Element as StripeElement, ElementOptions, ElementsOptions } from "ngx-stripe";

@Injectable()
export class StripeClientService {

    private card: StripeElement;
    private url = "https://us-central1-give-me-money-please.cloudfunctions.net/transaction/transactions";

    private amount: number;
    public elements: Elements;
    public style: ElementOptions = {
        style: {
            base: {
                fontSize: "13pt",
                "::placeholder": {
                    color: "#CFD7E0"
                },
                // tslint:disable-next-line:max-line-length
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            }
        },
        hideIcon: true
    };

    constructor(
        private stripe: StripeService,
        private http: HttpClient
    ) { }

    public createToken(amount: number, name: string) {
        this.saveChargeAmount(amount);
        return this.stripe.createToken(this.card, { name });
    }

    public mount() {
        return this.stripe.elements().subscribe(elements => {
            this.elements = elements;
            if (!this.card) {
                this.card = this.elements.create("card", this.style);
                this.card.mount(".payment-card");
            }
        });
    }

    public createCharge(token): Observable<Object> {
        return this.http.post(
            this.url,
            {
                token: token,
                amount: this.amount
            }
        );
    }

    private saveChargeAmount(amount: number): void {
        this.amount = amount;
    }

}
