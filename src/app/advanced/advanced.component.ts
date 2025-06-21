import {Component, EventEmitter, Output} from "@angular/core";
import {WordService} from "../word.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SutomService} from "../sutom.service";

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
  inputWords: string[] = ["", "", "", "", "", ""];
  gridLetters: CaseType[][] = [[], [], [], [], [], []];
  @Output() words = new EventEmitter<string[]>();
  protected readonly CaseType = CaseType;

  constructor(
    private readonly wordService: WordService,
    private readonly sutomService: SutomService
  ) {
    for (let i = 0; i < this.gridLetters.length; i++) {
      this.gridLetters[i] = [CaseType.Correct].concat(Array(9).fill(CaseType.NotInWord));
    }
  }

  generateWords() {
    let excludeLetterSet = new Set<string>();
    let letterNotInPositionSet: Set<string>[] = [];
    for (let i = 0; i < this.inputWords[0].length; i++) {
      letterNotInPositionSet[i] = new Set<string>();
    }
    const containLetter: string[] = [];
    const letterInPosition: string[] = Array(this.inputWords[0].length).fill("");

    for (let i = 0; i < this.inputWords.length; i++) {
      if (this.inputWords[i].toUpperCase()) {
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
        for (const letter of containLetterLine) {
          if (!containLetter.includes(letter) || containLetter.filter(l => l === letter).length < containLetterLine.filter(l => l === letter).length) {
            containLetter.push(letter);
          }
        }
      }
    }
    const excludeLetter = Array.from(excludeLetterSet).filter(letter => !containLetter.includes(letter));
    const letterNotInPosition = letterNotInPositionSet.map(set => Array.from(set));
    this.words.emit(this.wordService.getWordsLetterPosition(this.inputWords[0].length, containLetter, excludeLetter, letterInPosition, letterNotInPosition).sort((a, b) => {
      const valueA = this.sutomService.getWordValue(a);
      const valueB = this.sutomService.getWordValue(b);
      return valueB - valueA;
    }));
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

  onWordInput(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.inputWords[index] = inputElement.value;
    } else {
      this.inputWords[index] = "";
    }
  }

  isWord(word: string): boolean {
    return this.wordService.isWord(this.sutomService.trimWord(word));
  }

  isLineError(index: number): boolean {
    return (this.inputWords[index].length < 6 || !this.wordService.isWord(this.sutomService.trimWord(this.inputWords[index])));
  }

  displayLineInput(index: number): boolean {
    return index === 0 || (this.displayLineInput(index - 1) && !this.isLineError(index -1) && (this.inputWords[index - 1].length === this.inputWords[0].length && this.inputWords[0].length >= 6 && this.inputWords[0].length <= 10) );
  }

  getTextForLine(index: number) {
    if (this.inputWords[index].length < 6) {
      return "Le mot est trop court";
    } else if (!this.wordService.isWord(this.sutomService.trimWord(this.inputWords[index]))) {
      return "Ce mot n'existe pas";
    } else if (this.inputWords[index].length !== this.inputWords[0].length) {
      return "Ce mot n'a pas la même longueur que le premier mot";
    }
    return "Cette erreur est inconnue"
  }
}
