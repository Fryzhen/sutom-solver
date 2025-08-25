import {Injectable} from "@angular/core";
import {BaseAlgorithm} from "./base.algorithm";
import {WordService} from "../word.service";

@Injectable({
  providedIn: "root"
})
export class FrequencyAlgorithm extends BaseAlgorithm {

  values: { [key: string]: number }[] = [];

  constructor(
    private readonly wordService: WordService
  ) {
    super(wordService);
  }

  public getWordValue(word: string): number {
    let values : { [key: string]: number } = {}
    for (let i = 0; i < word.length; i++) {
      if (this.values[i][word[i]]) {
        if (values[word[i]] == undefined || values[word[i]] < this.values[i][word[i]]) {
          values[word[i]] = this.values[i][word[i]];
        }
      }
    }

    let value = 0;

    for (const letter in values) {
      value += values[letter];
    }

    return value;
  }

  protected trainCalculate(words: string[]): void {
    this.values = [];
    for (let i = 0; i < length; i++) {
      this.values.push({})
    }

    for (let word of words) {
      for (let i = 1; i < word.length; i++) {
        if (this.values[i][word[i]] == undefined) {
          this.values[i][word[i]] = 2;
        } else {
          this.values[i][word[i]] += 2;
        }
        for (const value of this.values) {
          if (value[word[i]] == undefined) {
            value[word[i]] = 1;
          } else {
            value[word[i]] += 1;
          }
        }
      }
    }
    console.log(this.values);
  }
}
