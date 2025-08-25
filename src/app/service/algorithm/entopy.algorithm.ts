import {Injectable} from "@angular/core";
import {BaseAlgorithm} from "./base.algorithm";
import {WordService} from "../word.service";

@Injectable({
  providedIn: "root"
})
export class EntropyAlgorithm extends BaseAlgorithm {

  values: { [key: string]: number } = {};

  constructor(
    private readonly wordService: WordService
  ) {
    super(wordService);
  }

  public getWordValue(word: string): number {
    return this.values[word] ?? 0;
  }

  protected trainCalculate(words: string[]): void {
    for (let word of words) {
      this.values[word] = this.entropy(word, words);
    }
  }

  private feedback(guess: string, secret: string): string {
    const result: string[] = Array(guess.length).fill("N");
    const secretLetters = secret.split("");

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secret[i]) {
        result[i] = "V";
        secretLetters[i] = "_";
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (result[i] === "V") continue;
      const idx = secretLetters.indexOf(guess[i]);
      if (idx !== -1) {
        result[i] = "J";
        secretLetters[idx] = "_";
      }
    }

    return result.join("");
  }

  private entropy(word: string, candidates: string[]): number {
    const partitions = new Map<string, number>();

    for (const secret of candidates) {
      const fb = this.feedback(word, secret);
      partitions.set(fb, (partitions.get(fb) ?? 0) + 1);
    }

    let H = 0;
    const total = candidates.length;

    for (const count of partitions.values()) {
      const p = count / total;
      H -= p * Math.log2(p);
    }

    return H;
  }
}
