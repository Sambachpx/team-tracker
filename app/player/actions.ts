import { prisma } from "@/utils/prisma/prisma";
import type { TPlayerFormFields } from "@/utils/zod/player";
import { playerFormSchema } from "@/utils/zod/player";

export const addPlayer = async (data: TPlayerFormFields) => {
  const validatedData = playerFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { name, salary, teamId } = validatedData.data;

  try {
    const existingPlayer = await prisma.player.findFirst({
      where: { name },
    });

    if (existingPlayer) {
      throw new Error("player with this name already exists");
    }

    const player = await prisma.player.create({
      data: {
        name,
        salary,
        teamId,
      },
    });

    return player;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};
