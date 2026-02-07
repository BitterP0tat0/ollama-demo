import { NUser, Admin } from "../types/roles.ts";

export interface jwtPayload {
  userId: string;
  userName: string;
  userRole: NUser | Admin;
  nickName: string;
}
