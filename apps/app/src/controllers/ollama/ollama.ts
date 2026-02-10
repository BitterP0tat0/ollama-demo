import {
  Body,
  Response,
  Request,
  Controller,
  Post,
  UseErrorFilter,
} from "@inversifyjs/http-core";
import { GlobalErrorHandler } from "../../middleware/errorhandler.ts";
import { Prompt } from "@packages/shared";
import express from "express";
import { McpService } from "../../service/mcp/mcpService.ts";
import { inject } from "@inversifyjs/core";
@Controller("/ollama")
@UseErrorFilter(GlobalErrorHandler)
export class OllamaController {
  constructor(@inject(McpService) private mcpService: McpService) {}
  @Post("/chat")
  async getChatResponse(
    @Body() prompt: Prompt,
    @Response() res: express.Response,
  ) {
    try {
      const response = await this.mcpService.getMcpResponse(prompt);
      console.log("MCP response:", response.message.content);
      res.status(200).json(response.message.content);
    } catch (error) {
      throw error;
    }
  }
}
