import { Admin, NUser } from "../types/roles";

export interface Prompt {
  model: string;
  messages: Message[];
}

export interface Message {
  role: NUser | Admin;
  content: string;
  image?: string;
}
