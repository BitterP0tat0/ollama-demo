import { InversifyExpressHttpAdapter } from "@inversifyjs/http-express";
import { Container } from "inversify";
import express from "express";
import { jwtMethod } from "@packages/shared";
import { config } from "dotenv";
import { AuthController } from "../controllers/auth/auth.ts";
import { RegisterController } from "../controllers/auth/register.ts";
import { Drizzle } from "../core/db/db.ts";
import { UserService } from "../service/user/userService.ts";
import { GlobalErrorHandler } from "../middleware/errorhandler.ts";
import { OllamaController } from "../controllers/ollama/ollama.ts";
import { McpService } from "../service/mcp/mcpService.ts";
import { OllamaMCP } from "../core/ollama/mcp.ts";

config();
const container = new Container();
container.bind<Drizzle>(Drizzle).toSelf().inSingletonScope();
container.bind<jwtMethod>(jwtMethod).toDynamicValue(() => {
  return new jwtMethod();
});
container.bind<OllamaMCP>(OllamaMCP).toSelf().inSingletonScope();
container
  .bind<GlobalErrorHandler>(GlobalErrorHandler)
  .to(GlobalErrorHandler)
  .inSingletonScope();
container.bind<UserService>(UserService).toSelf();
container.bind<McpService>(McpService).toSelf();
container.bind<AuthController>(AuthController).toSelf().inSingletonScope();
container
  .bind<RegisterController>(RegisterController)
  .toSelf()
  .inSingletonScope();
container.bind<OllamaController>(OllamaController).toSelf().inSingletonScope();
const adapter = new InversifyExpressHttpAdapter(container, { useJson: true });
adapter.useGlobalFilters(GlobalErrorHandler);
const app = await adapter.build();
app.use(express.json());

app.listen(8080, () => {
  console.log("API Listening on http://localhost:8080");
});
