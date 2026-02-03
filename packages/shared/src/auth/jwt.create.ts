import { injectable } from "inversify";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { jwtPayload } from "../payload/jwtPayload.ts";
config()

@injectable()
export class jwtMethod{
    private readonly secret:string;
    constructor(){
        this.secret = process.env.Secret!;
    }

    signJwt(payload:jwtPayload):string{
        return jwt.sign(payload, this.secret, { expiresIn: '1d' })
    } 

}