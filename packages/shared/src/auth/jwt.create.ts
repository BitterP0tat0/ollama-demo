import { injectable } from "inversify";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { jwtPayload } from "../payload/jwtPayload.ts";
config();

@injectable()
export class jwtMethod {
  private readonly secret: string;
  constructor() {
    this.secret = process.env.jwtSecret!;
  }

  signJwt(payload: jwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1d" });
  }

  verifyJwt(token: string): jwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as jwtPayload;
      return decoded;
    } catch (err) {
      throw new Error("Invalid jwt token");
    }
  }
}
