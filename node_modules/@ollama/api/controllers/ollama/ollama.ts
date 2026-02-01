import { Controller, Params, Post } from "@inversifyjs/http-core";

@Controller("/ollama")
export class AppController {
  constructor() {}

  @Post("reply/:id")
  public async getStatus(
    @Params("id") id: string
  ): Promise<string> {
    console.log("Received ID:", id);
    return "Service is healthy";
  }
}
