import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementOptions, ElementsOptions } from "ngx-stripe";
import { StripeClientService } from "../providers/stripe-elements.service";

@Component({
    selector: "app-card-form",
    templateUrl: "./card-form.component.html",
    styleUrls: ["./card-form.component.css"]
})
export class CardFormComponent implements OnInit {

    public isLoading = false;
    public isComplete = false;
    public form: FormGroup;
    public placeholderName: string;

    private MAX_MONEY_AMOUNT = 10;

    constructor(
        private client: StripeClientService,
        private fb: FormBuilder,
    ) { }

    public getPlaceholderName(): string {
        return `${this.prefix()} ${this.suffix()}`;
    }

    public ngOnInit(): void {
        this.initialiseForm();
        this.mountCard();
        this.placeholderName = this.getPlaceholderName();
    }

    public onSubmit(): void {
        this.toggleLoadingState();
        const [name, amount] = this.getFormParams();

        this.client.createToken(
            amount,
            name
        )
            .subscribe(res => {
                if (res.token) {
                    this.client.createCharge(res.token)
                        .subscribe(() => {
                            this.toggleCompletionState();
                            this.toggleLoadingState();
                        });
                }
            });
    }

    private mountCard() {
        this.client.mount();
    }

    private initialiseForm(): void {
        this.form = this.fb.group({
            name: ["", [Validators.required]],
            amount: ["", [Validators.required, Validators.max(this.MAX_MONEY_AMOUNT)]]
        });
    }

    private toggleLoadingState(): void {
        this.isLoading = !this.isLoading;
    }

    private toggleCompletionState(): void {
        this.isComplete = !this.isComplete;
    }

    private getFormParams(): any[] {
        return [this.form.get("name").value, this.form.get("amount").value];
    }

    private prefix(): string {
        const prefixes = [
            "Friendly",
            "Philanthropic",
            "Generous",
            "Lavish",
            "Eccentric",
            "Charitable",
            "Reasonable",
            "Considerate",
            "Rich",
            "Wealthy",
            "Alturistic",
            "Hippie",
            "Liberal",
            "Gentle",
            "Square"
        ];

        return prefixes[Math.floor(Math.random() * prefixes.length)];
    }

    private suffix(): string {
        const suffixes = [
            "Sugar Daddy",
            "Executive",
            "Fat Cat",
            "Oil Baron",
            "Land Baron",
            "Noble",
            "Banker",
            "King",
            "Landlord",
            "Aristocrat",
            "Lawyer",
            "Doctor",
            "Oil Prince",
            "Oil Mogul",
            "Bitcoin Millionaire",
            "Motivational Speaker",
            "Wanker Banker",
            "Person with more money than sense"
        ];

        return suffixes[Math.floor(Math.random() * suffixes.length)];
    }

}
