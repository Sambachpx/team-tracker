import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./utils/prisma/prisma";

export const {
  handlers,
  auth: authHandler,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      if (pathname === "/middlewareProtected") return !!auth;

      return true;
    },
  },
});
