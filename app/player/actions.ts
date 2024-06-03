"use server";

import { prisma } from "@/utils/prisma/prisma";
import type { TPlayerFormFields } from "@/utils/zod/player";
import { playerFormSchema } from "@/utils/zod/player";

export const addPlayer = async (data: TPlayerFormFields) => {
  const validatedData = playerFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { firstName, lastName, salary, teamId, image } = validatedData.data;

  try {
    const player = await prisma.player.create({
      data: {
        firstName,
        lastName,
        salary,
        teamId,
        image,
      },
    });

    return player;
  } catch (error) {
    console.error("error addplayer:", error);
    throw new Error("error");
  }
};
