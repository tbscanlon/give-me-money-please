import * as functions from "firebase-functions";
import { App } from "./app";

export const transaction = functions.https.onRequest(App.instance);