import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-q-and-a",
  templateUrl: "./q-and-a.component.html",
  styleUrls: ["./q-and-a.component.css"]
})
export class QAndAComponent implements OnInit {

  public isQaVisible = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleQa(): void {
    this.isQaVisible = !this.isQaVisible;
  }

}
