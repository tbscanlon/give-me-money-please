import express from "express";
import bodyparser from "body-parser";

import { controllers } from "./controllers";

export class App {
    private app: express.Application;

    public static get instance() {
        return new this().app;
    }

    constructor() {
        this.configure();
        this.setRoutes();
    }

    private configure() {
        this.app = express();
        this.app.use(bodyparser.json());
    }

    private setRoutes() {
        this.app.use("/transactions", controllers.TRANSACTIONS);
    }
}