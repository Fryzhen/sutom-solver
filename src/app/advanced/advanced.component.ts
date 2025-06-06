import {Component, EventEmitter, Output} from "@angular/core";
import {WordService} from "../word.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";

export enum CaseType {
  Correct = "correct", WrongPlace = "wrong-place", NotInWord = "not-in-word",
}

@Component({
  selector: "app-advanced",
  standalone: true,
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: "./advanced.component.html",
  styleUrl: "./advanced.component.scss"
})
export class AdvancedComponent {
  length?: number = 8;
  firtstLetter: string = "A";
  inputWords: string[] = ["ASTERIXE", "ASSSSINA", "", "", "", ""];
  gridLetters: CaseType[][] = [[], [], [], [], [], []];
  @Output() words = new EventEmitter<string[]>();
  protected readonly CaseType = CaseType;

  constructor(private readonly wordService: WordService) {
    for (let i = 0; i < this.gridLetters.length; i++) {
      this.gridLetters[i] = [CaseType.Correct].concat(Array(9).fill(CaseType.NotInWord));
    }
  }

  generateWords() {
    if (this.length != undefined && this.firtstLetter != "") {
      let excludeLetterSet = new Set<string>();
      let letterNotInPositionSet: Set<string>[] = [];
      for (let i = 0; i < this.length; i++) {
        letterNotInPositionSet[i] = new Set<string>();
      }
      const containLetter: string[] = [];
      const letterInPosition: string[] = Array(this.length).fill("");

      for (let i = 0; i < this.inputWords.length; i++) {
        if (this.inputWords[i].length === this.length && this.inputWords[i].toUpperCase().startsWith(this.firtstLetter.toUpperCase())) {
          const containLetterLine = [];
          for (let j = 0; j < this.inputWords[i].length; j++) {
            if (this.gridLetters[i][j] === CaseType.NotInWord) {
              excludeLetterSet.add(this.inputWords[i][j].toUpperCase());
            } else if (this.gridLetters[i][j] === CaseType.Correct) {
              containLetterLine.push(this.inputWords[i][j].toUpperCase());
              letterInPosition[j] = this.inputWords[i][j].toUpperCase();
            } else if (this.gridLetters[i][j] === CaseType.WrongPlace) {
              containLetterLine.push(this.inputWords[i][j].toUpperCase());
              letterNotInPositionSet[j].add(this.inputWords[i][j].toUpperCase());
            }
          }
          console.log(containLetterLine)
          for (const letter of containLetterLine) {
            console.log(containLetter.filter(l => l === letter).length < containLetterLine.filter(l => l === letter).length, containLetter.filter(l => l === letter).length, containLetterLine.filter(l => l === letter).length)
            if (!containLetter.includes(letter) || containLetter.filter(l => l === letter).length < containLetterLine.filter(l => l === letter).length) {
              containLetter.push(letter);
            }
          }
        }
      }
      const excludeLetter = Array.from(excludeLetterSet).filter(letter => !containLetter.includes(letter));
      const letterNotInPosition = letterNotInPositionSet.map(set => Array.from(set));

      console.log("containLetter", containLetter);
      console.log("excludeLetter", excludeLetter);
      console.log("letterInPosition", letterInPosition);
      console.log("letterNotInPosition", letterNotInPosition);

      console.log(this.wordService.getWordsLetterPosition(this.length, containLetter, excludeLetter, letterInPosition, letterNotInPosition));
      this.words.emit(this.wordService.getWordsLetterPosition(this.length, containLetter, excludeLetter, letterInPosition, letterNotInPosition));
    }
  }

  cycleCaseType(x: number, y: number): void {
    if (y !== 0) {
      if (this.gridLetters[x][y] === CaseType.NotInWord) {
        this.gridLetters[x][y] = CaseType.WrongPlace;
      } else if (this.gridLetters[x][y] === CaseType.Correct) {
        this.gridLetters[x][y] = CaseType.NotInWord;
      } else {
        this.gridLetters[x][y] = CaseType.Correct;
      }
    }
  }

  onLengthInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.length = +inputElement.value;
      for (let i = 0; i < this.inputWords.length; i++) {
        if (this.inputWords[i].length > this.length) {
          this.inputWords[i] = this.inputWords[i].slice(0, this.length);
        }
      }
      for (let i = 0; i < this.gridLetters.length; i++) {
        this.gridLetters[i] = [CaseType.Correct].concat(Array(this.length - 1).fill(CaseType.NotInWord));
      }
    }
  }

  onFirstLetterInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.firtstLetter = inputElement.value;
    }
  }

  onWordInput(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log("onWordInput", index, inputElement.value);
    if (inputElement.value) {
      this.inputWords[index] = inputElement.value;
    } else {
      this.inputWords[index] = "";
    }
  }

  displayLinesInput() {
    return this.length != undefined && this.firtstLetter.length == 1;
  }

  displayLineInput(index: number) {
    return index == 0 || this.inputWords[index].length === this.length || (this.inputWords[index - 1].length === this.length && this.inputWords[index - 1].toUpperCase().startsWith(this.firtstLetter.toUpperCase()));
  }

  isLineError(index: number) {
    return (this.inputWords[index] != "" && !this.inputWords[index].toUpperCase().startsWith(this.firtstLetter.toUpperCase())) || !this.isWord(index) ;
  }

  displayGrid() {
    for (const word of this.inputWords) {
      if (this.displayGridLine(word)) {
        return true;
      }
    }
    return false;
  }

  displayGridLine(word: string) {
    return word.length === this.length && word.toUpperCase().startsWith(this.firtstLetter.toUpperCase());
  }

  isWord(index: number) {
    if (!this.inputWords[index] || this.inputWords[index].length !== this.length) {
      return false;
    }
    return this.wordService.isWord(this.inputWords[index].toUpperCase());
  }
}
