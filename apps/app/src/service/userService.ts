import { inject, injectable } from "inversify";
import { Drizzle } from "../core/db/db.ts";
import {
  Bcrypt,
  ConflictException,
  LoginDto,
  RegisterDto,
} from "@packages/shared";
import { user } from "../supabase/migrations/schema.ts";
import { eq, or } from "drizzle-orm";
@injectable()
export class UserService {
  constructor(@inject(Drizzle) private readonly drizzle: Drizzle) {}
  async createUser(registerDto: RegisterDto) {
    try {
      const existing = await this.drizzle.db
        .select()
        .from(user)
        .where(
          or(
            eq(user.email, registerDto.email),
            eq(user.userName, registerDto.userName),
          ),
        );

      if (existing[0]?.email === registerDto.email) {
        throw new ConflictException("Email is already used");
      }
      if (existing[0]?.userName === registerDto.userName) {
        throw new ConflictException("User name is already used");
      }
    } catch (error) {
      throw error;
    }

    registerDto.userRole = "user";
    registerDto.password = await Bcrypt.encode(registerDto.password);
    return await this.drizzle.db.insert(user).values(registerDto);
  }
  async findUserByEmail(email: string) {
    return await this.drizzle.db
      .select()
      .from(user)
      .where(eq(user.email, email));
  }

  async findUserByEmailAndUserName(email: string, userName: string) {
    return await this.drizzle.db
      .select()
      .from(user)
      .where(or(eq(user.email, email), eq(user.userName, userName)))
      .limit(1);
  }
  async findUserByUserName(userName: string) {
    return await this.drizzle.db
      .select()
      .from(user)
      .where(eq(user.userName, userName));
  }
}
