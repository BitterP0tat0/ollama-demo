import { Admin } from "../types/roles.ts";
import { NUser } from "../types/roles.ts";
export interface User{
    id: string;
    userName:string;   
    password:string;
    email: string;
    userRole: NUser | Admin
    nickName: string;   
}