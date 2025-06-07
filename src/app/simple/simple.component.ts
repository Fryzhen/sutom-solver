import {Component, EventEmitter, Output} from "@angular/core";
import {WordService} from "../word.service";

@Component({
  selector: 'app-simple',
  standalone: true,
  imports: [],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.scss'
})
export class SimpleComponent {
  length?: number = undefined;
  firtstLetter: string = "";
  letters: string = "";
  excludeLetters: string = "";
  @Output() words = new EventEmitter<string[]>();

  constructor(private readonly wordService: WordService) {
  }

  onChange() {
    if (!this.letters.includes(this.firtstLetter)) {
      this.letters = this.firtstLetter.concat(this.letters);
    }
    if (this.length != undefined && this.firtstLetter != "") {
      this.words.emit(this.wordService.getWordsIncludeExclude(this.length, this.letters.split(''), this.excludeLetters.split(''), this.firtstLetter));
    }
  }

  onLengthInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.length = +inputElement.value;
      this.onChange();
    }
  }

  onFirstLetterInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.firtstLetter = inputElement.value;
      this.onChange();
    }
  }

  onLetterInWordInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.letters = inputElement.value;
      this.onChange();
    }
  }

  onLetterExcludedInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.excludeLetters = inputElement.value;
      this.onChange();
    }
  }
}
