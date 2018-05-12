import { Component, OnInit } from "@angular/core";
import { MetaService } from "./providers/meta.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(private meta: MetaService) { }

  ngOnInit() {
    this.meta.getMetaTags();
  }
}
