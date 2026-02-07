import {
  Body,
  Controller,
  Next,
  Post,
  Response,
  UseErrorFilter,
} from "@inversifyjs/http-core";
import { RegisterDto } from "@packages/shared";
import express from "express";
import { inject } from "inversify";
import { UserService } from "../../service/userService.ts";
import { GlobalErrorHandler } from "../../middleware/errorhandler.ts";

@Controller("")
@UseErrorFilter(GlobalErrorHandler)
export class RegisterController {
  constructor(@inject(UserService) private readonly userService: UserService) {}
  @Post("/register")
  async Register(
    @Body() userEntity: RegisterDto,
    @Response() res: express.Response,
  ) {
    try {
      await this.userService.createUser(userEntity);
      res.status(201).json({ message: "Register successfully" });
    } catch (error) {
      throw error;
    }
  }
}
