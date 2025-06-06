import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {WordService} from "./word.service";
import {SimpleComponent} from "./simple/simple.component";
import {AdvancedComponent} from "./advanced/advanced.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, SimpleComponent, AdvancedComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  isSimpleMode: boolean = false;
  words: string[] = [];

  toggleMode() {
    this.isSimpleMode = !this.isSimpleMode;
  }
}
