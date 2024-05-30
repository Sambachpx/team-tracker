"use server";

import { prisma } from "@/utils/prisma/prisma";
import type { TRegisterFormFields } from "@/utils/zod/user";
import { registerFormSchema } from "@/utils/zod/user";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export const registerUser = async (data: TRegisterFormFields) => {
  const validatedData = registerFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { name, email, password } = validatedData.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};
