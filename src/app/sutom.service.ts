import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SutomService {

  constructor() {
  }

  public trimWord(word: string): string {
    return word
      .trim()

      .replace("é", "e")
      .replace("è", "e")
      .replace("ê", "e")
      .replace("ë", "e")

      .replace("á", "a")
      .replace("à", "a")
      .replace("â", "a")
      .replace("ä", "a")

      .replace("í", "i")
      .replace("ì", "i")
      .replace("î", "i")
      .replace("ï", "i")

      .replace("ò", "o")
      .replace("ô", "o")
      .replace("ö", "o")

      .replace("ù", "u")
      .replace("û", "u")
      .replace("ü", "u")

      .replace("ç", "c")
      .replace("ñ", "n")
      .toUpperCase();
  }

  public getWordValue(word: string): number {
    const letterValues: {[key: string]: number} = {
      "E": 278801,
      "A": 188449,
      "S": 168416,
      "I": 157527,
      "R": 154932,
      "T": 122610,
      "N": 115694,
      "O": 103150,
      "L": 75299,
      "U": 73564,
      "C": 64762,
      "M": 47309,
      "P": 44347,
      "D": 43739,
      "G": 34108,
      "B": 30837,
      "F": 26756,
      "H": 22388,
      "Z": 20441,
      "V": 19833,
      "Q": 8708,
      "Y": 7809,
      "X": 5863,
      "J": 4255,
      "K": 1666,
      "W": 515
    };

    const wordSet = new Set(word.split(""));
    console.log(wordSet);
    let value = 0;
    for (const letter of wordSet) {
      if (letterValues[letter]) {
        value += letterValues[letter];
      }
    }
    return value;
  }
}
