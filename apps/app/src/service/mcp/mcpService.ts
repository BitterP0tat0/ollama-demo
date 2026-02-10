import { inject, injectable } from "inversify";
import { OllamaMCP } from "../../core/ollama/mcp.ts";
import { Prompt } from "@packages/shared";

@injectable()
export class McpService {
  constructor(@inject(OllamaMCP) private readonly ollamaMCP: OllamaMCP) {}
  async getMcpResponse(prompt: Prompt) {
    try {
      const response = await this.ollamaMCP.ollama.chat(prompt);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
