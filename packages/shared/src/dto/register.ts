import { IsEmail, MinLength } from "class-validator";
import { Admin, NUser } from "../types/roles.ts";

export class RegisterDto {
  userName!: string;
  @MinLength(8, { message: "Password not strong enoughs" })
  password!: string;
  @IsEmail({}, { message: "Invalid Email" })
  email!: string;
  userRole: NUser = "user";
  nickName!: string;
}
