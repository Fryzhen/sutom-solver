import {WordService} from "../word.service";

export abstract class BaseAlgorithm {
  constructor(
    private readonly ws: WordService
  ) {}

  public abstract getWordValue(word: string): number
  protected abstract trainCalculate(words: string[]): void

  public trainAdvanced(size: number, containLetters: string[], excludeLetters: string[], letterInPosition: string[], letterNotInPosition: string[][]): void {
    let words = this.ws.getWordsLetterPosition(size,containLetters,excludeLetters,letterInPosition,letterNotInPosition);
    this.trainCalculate(words);
  }

  public trainSimple(size: number, containLetters: string[], excludeLetters: string[], firstLetter: string) {
    let words = this.ws.getWordsIncludeExclude(size,containLetters,excludeLetters,firstLetter);
    this.trainCalculate(words);
  }
}
