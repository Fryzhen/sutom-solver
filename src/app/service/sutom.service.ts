import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SutomService {
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
}
