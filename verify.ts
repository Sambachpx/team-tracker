import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function verifyAuth(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const salt = process.env.SALT; // TODO: add salt to env

  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not defined");
  }

  if (!salt) {
    throw new Error("salt is not defined");
  }

  const token = await getToken({
    req,
    secret,
    salt,
  });

  return token;
}
