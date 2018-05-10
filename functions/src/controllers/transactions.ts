import express from "express";
import stripe from "stripe";
import { config } from "firebase-functions";

export class TransactionsController {
    private MAXIMUM_CHARGE      = 10;
    private CURRENCY_MULTIPLIER = 100;

    public static get routes(): express.Router {
        return new this().router;
    }

    constructor(
        private router: express.Router = express.Router(),
        private stripeService: stripe = new stripe(config()["stripe"]["key"])
    ) {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.indexRoute();
        this.createRoute();
    }

    private indexRoute(): void {
        this.router.get("/", (req: express.Request, res: express.Response) => {
            res.json({
                message: "Nice try hacker",
                timeStamp: new Date()
            });
        });
    }

    private createRoute(): void {
        this.router.post("/", (req: express.Request, res: express.Response) => {
            if (this.isTooMuchMoney(req.body.amount)) {
                res.json({
                    result: "fail",
                    message: "Come on now I'm not going to take more than £10",
                    timeStamp: new Date(),
                    amount: req.body.amount,
                });
            }

            const charge = this.composeChargeObject(req.body.amount, req.body.token);
            this.createCharge(charge, res);
        });
    }

    private isTooMuchMoney(chargeAmount: number): boolean {
        return chargeAmount > this.MAXIMUM_CHARGE;
    }

    private composeChargeObject(chargeAmount: number, token: stripe.tokens.ICardToken): stripe.charges.IChargeCreationOptions {
        return {
            amount: chargeAmount * this.CURRENCY_MULTIPLIER,
            currency: "gbp",
            source: token.id,
        };
    }

    private createCharge(charge: stripe.charges.IChargeCreationOptions, res: express.Response): void {
        this.stripeService.charges.create(charge).then(stripeResponse => {
            res.json({
                result: "success",
                message: "thank you for giving me money",
                timeStamp: new Date(),
                response: stripeResponse
            });
        })
        .catch(err => {
            res.status(502).json({
                result: "fail",
                message: "are you trying to cheat me my dude",
                timeStamp: new Date(),
                amount: charge.amount,
                response: err
            });
        });
    }
}