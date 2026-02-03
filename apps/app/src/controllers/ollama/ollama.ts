import { Controller, Post, Request, Response } from "@inversifyjs/http-core";
import { jwtMethod, jwtPayload } from "@packages/shared";
import { inject } from "inversify";
@Controller("/ollama")
export class AppController {
  constructor(@inject(jwtMethod) private jwtMethod: jwtMethod) {}

  @Post("/reply")
  public async getStatus(
    @Request() req:any,
    @Response() res:any,
  ) {
    const payload : jwtPayload = {
      "userName": "alice",
      "userRole": "admin",
      "nickName": "Ali"
    }

    console.log(req.body)

    const token = this.jwtMethod.signJwt(payload);

    res.status(200).json({
      token
    });
  }
}
