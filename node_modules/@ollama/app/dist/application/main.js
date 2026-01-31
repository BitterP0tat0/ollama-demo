import express from "express";
import { Container } from "inversify";
const container = new Container();
const app = express();
app.listen(3000, () => {
    console.log('app is running');
});
//# sourceMappingURL=main.js.map