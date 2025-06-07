import {Component} from "@angular/core";
import {NgForOf, NgIf} from "@angular/common";
import {SimpleComponent} from "./simple/simple.component";
import {AdvancedComponent} from "./advanced/advanced.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NgForOf, NgIf, SimpleComponent, AdvancedComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  isSimpleMode: boolean = true;
  words: string[] = [];

  toggleMode() {
    this.isSimpleMode = !this.isSimpleMode;
    this.words = [];
  }
}
