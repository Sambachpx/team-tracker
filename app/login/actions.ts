"use server";

import { loginFormSchema } from "@/utils/form/formSchemas";
import type { TLoginFormFields } from "@/utils/form/types";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export const loginUser = async (data: TLoginFormFields) => {
  const validatedData = loginFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { email, password } = validatedData.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new Error("user with this email does not exist");
    }

    const PasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!PasswordValid) {
      throw new Error("your password is incorrect");
    }

    return existingUser;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};
