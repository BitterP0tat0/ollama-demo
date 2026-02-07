import bcrypt from "bcrypt";
export namespace Bcrypt {
  export async function encode(pwd: string) {
    return await bcrypt.hash(pwd, 5);
  }
  export async function decode(pwd: string, hashedPwd: string) {
    return await bcrypt.compare(pwd, hashedPwd);
  }
}
