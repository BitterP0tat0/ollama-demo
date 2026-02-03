import { InversifyExpressHttpAdapter } from "@inversifyjs/http-express";
import { Container } from "inversify";
import express from "express";
import { DrizzleConnector, jwtMethod } from "@packages/shared"; 
import { config } from "dotenv";
import { AppController } from "../controllers/ollama/ollama.ts";

config();
const container = new Container();

container.bind<DrizzleConnector>("DrizzleConnector").toDynamicValue(() => {
  return new DrizzleConnector(process.env.dbUrl!);
}).inSingletonScope();
container.bind<jwtMethod>(jwtMethod).toDynamicValue(()=>{
  return new jwtMethod();
})
container.bind<AppController>(AppController).toSelf().inSingletonScope();

const adapter = new InversifyExpressHttpAdapter(container, {useJson:true});

const app = await adapter.build();
app.use(express.json());

const drizzle = container.get<DrizzleConnector>("DrizzleConnector");
await drizzle.Connect();


app.listen(8080, () => {

  console.log('API Listening on http://localhost:8080');

});
