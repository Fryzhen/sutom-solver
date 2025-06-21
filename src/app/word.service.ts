import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WordService {
  private words: string[] = [];

  constructor() {
    this.loadWords();
  }

  getWordsLetterPosition(size: number, containLetters: string[], excludeLetters: string[], letterInPosition: string[], letterNotInPosition: string[][]): string[] {
    return this.getWords(size, containLetters, excludeLetters)
    .filter((word) => !excludeLetters.some(letter => word.includes(letter.toUpperCase())))
    .filter((word) => word.split("").every((letter, index) => letterInPosition[index] === "" || letterInPosition[index] === letter.toUpperCase()))
    .filter((word) => {
      return letterNotInPosition.every((letters, index) => {
        return !letters.some(letter => word[index] === letter.toUpperCase());
      });
    });
  }

  getWordsIncludeExclude(size: number, containLetters: string[], excludeLetters: string[], firstLetter: string): string[] {
    return this.getWords(size, containLetters, excludeLetters)
    .filter((word) => word.startsWith(firstLetter.toUpperCase()));
  }

  getWords(size: number, containLetters: string[], excludeLetters: string[]): string[] {
    return this.words
    .filter((word) => word.length === size)
    .filter((word) => {
      const wordUpper = word.toUpperCase();
      const letterCounts: { [key: string]: number } = {};
      for (const letter of containLetters) {
        const l = letter.toUpperCase();
        letterCounts[l] = (letterCounts[l] || 0) + 1;
      }
      return Object.entries(letterCounts).every(([l, count]) =>
        wordUpper.split(l).length - 1 >= count
      );
    })
    .filter((word) => !excludeLetters.some(letter => word.includes(letter.toUpperCase())));
  }

  isWord(word: string): boolean {
    return this.words.includes(word.toUpperCase());
  }

  private loadWords(): void {
    fetch("assets/words.txt")
    .then((res) => res.text())
    .then((data) => {
      this.words = data.split("\n");
    }).catch((err: Error) => {
      console.error("Error while loading words ", err);
    });
  }
}
