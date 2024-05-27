"use server";

import { prisma } from "@/utils/prisma";
import { z } from "zod";

const registerFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

type TRegisterFormFields = z.infer<typeof registerFormSchema>;

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

    console.log("Existing user:", existingUser);

    if (existingUser) {
      throw new Error("user with this email already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};
