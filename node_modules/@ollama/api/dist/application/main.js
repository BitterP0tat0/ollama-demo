import { InversifyExpressHttpAdapter } from "@inversifyjs/http-express";
import { Container } from "inversify";
import express from "express";
import { AppController } from "../controllers/ollama/ollama.js";
// import { DrizzleConnector } from "@packages/shared"; 
import { config } from "dotenv";
config();
const container = new Container();
// container.bind("DrizzleConnector").toDynamicValue(() => {
//   return new DrizzleConnector(process.env.dbUrl!)
// }).inSingletonScope();
container.bind(AppController).toSelf();
const adapter = new InversifyExpressHttpAdapter(container);
const app = await adapter.build();
// await container.get(DrizzleConnector).Connect();
app.use(express.json());
app.listen(3000, () => {
    console.log('API Listening on http://localhost:3000');
});
//# sourceMappingURL=main.js.map