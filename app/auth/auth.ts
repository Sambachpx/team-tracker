"use server";

import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../utils/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      authorize: async (credentials) => {
        console.log("début auth");

        if (typeof credentials.email !== "string" || typeof credentials.password !== "string") {
          console.log("informations identification pas valides");

          return null;
        }
        console.log(`Recherche user avec email : ${credentials.email}`);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("aucun user trouvé avec cet email");

          return null;
        }
        console.log("user trouvé, vérif du mot de passe");

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          console.log("Mot de passe incorrect");

          return null;
        }

        console.log(`User ${user.email} logged in`);

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
  session: {
    jwt: true,
  },
};
