import { ExpressGuard } from "@inversifyjs/http-express";
import { Request } from "express";
import { jwtMethod } from "@packages/shared";
import { inject, injectable } from "@inversifyjs/core";
@injectable()
export class jwtGuard implements ExpressGuard {
  constructor(@inject(jwtMethod) private readonly jwtMethod: jwtMethod) {}
  public async activate(_request: Request): Promise<boolean> {
    const authHeader = _request.headers?.authorization;
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(" ")[1];
    try {
      this.jwtMethod.verifyJwt(token as string);
      return true;
    } catch (error) {
      return false;
    }
  }
}
