import { NUser, Admin } from "../types/roles.ts";

export interface jwtPayload{
    userName:string;   
    userRole: NUser | Admin
    nickName: string;     
}