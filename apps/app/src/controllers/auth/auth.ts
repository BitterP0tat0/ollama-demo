import {
  Body,
  Controller,
  Post,
  Response,
  UseErrorFilter,
} from "@inversifyjs/http-core";
import { jwtMethod, jwtPayload } from "@packages/shared";
import { inject } from "inversify";
import { LoginDto } from "@packages/shared";
import express, { response } from "express";
import { Drizzle } from "../../core/db/db.ts";
import { user } from "../../supabase/migrations/schema.ts";
import { eq } from "drizzle-orm";
import { Bcrypt } from "@packages/shared";
import { UnauthorizedException } from "@packages/shared";
import { config } from "dotenv";
import { UserService } from "../../service/user/userService.ts";
import { GlobalErrorHandler } from "../../middleware/errorhandler.ts";
config();
@Controller("")
@UseErrorFilter(GlobalErrorHandler)
export class AuthController {
  constructor(
    @inject(jwtMethod) private readonly jwtMethod: jwtMethod,
    @inject(UserService) private readonly userService: UserService,
  ) {}
  @Post("/login")
  async Login(@Body() loginDto: LoginDto, @Response() res: express.Response) {
    const userEntity = await this.userService.findUserByEmail(loginDto.email);
    if (userEntity[0] === undefined || userEntity[0] === null) {
      throw new UnauthorizedException("Email not found or Password wrong");
    }

    const hashedPwd = userEntity[0]?.password;
    let isLoginSuccess = false;

    try {
      isLoginSuccess = await Bcrypt.decode(
        loginDto.password,
        hashedPwd as string,
      );
    } catch (error) {
      isLoginSuccess = false;
      throw error;
    }

    if (!isLoginSuccess) {
      throw new UnauthorizedException("Email not found or Password wrong");
    }

    if (isLoginSuccess) {
      const payload: jwtPayload = {
        userId: userEntity[0]!.id,
        userName: userEntity[0]!.userName,
        userRole: userEntity[0]!.userRole as "user" | "admin",
        nickName: userEntity[0]!.nickName,
      };

      const token = this.jwtMethod.signJwt(payload);
      res.json({
        message: "Login sucessfully",
        token,
      });
    }
  }
}
