/* eslint-disable no-param-reassign */
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./utils/prisma/prisma";

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      authorize: async (credentials) => {
        if (typeof credentials.email !== "string" || typeof credentials.password !== "string") {
          throw new Error("invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("user not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("invalid password");
        }

        return { id: user.id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && user.id && user.name && user.email) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },

    session({ session, token }) {
      session.user.email = token.email;
      session.user.id = token.id;
      session.user.name = token.name;

      return session;
    },
  },
} satisfies NextAuthConfig;
