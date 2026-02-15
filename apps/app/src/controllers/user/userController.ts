import { Controller, UseGuard } from "@inversifyjs/http-core";
import { jwtGuard } from "../../guards/auth/auth";

@Controller()
@UseGuard(jwtGuard)
export class UserController {}
