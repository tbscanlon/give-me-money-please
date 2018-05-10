import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NgxStripeModule } from "ngx-stripe";

import { AppComponent } from "./app.component";
import { CardFormComponent } from "./card-form/card-form.component";
import { StripeClientService } from "./providers/stripe-elements.service";


@NgModule({
  declarations: [
    AppComponent,
    CardFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot("pk_live_7Hki9hL7sPedSt9qZqH2i0tZ")
  ],
  providers: [
    FormBuilder,
    StripeClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }