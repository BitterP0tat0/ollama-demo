import { injectable } from "inversify";
import { Ollama } from "ollama";
@injectable()
export class OllamaMCP {
  ollama: Ollama;
  constructor() {
    this.ollama = new Ollama();
  }
}
