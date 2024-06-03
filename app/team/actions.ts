"use server";

import { prisma } from "@/utils/prisma/prisma";
import type { TTeamFormFields } from "@/utils/zod/team";
import { teamFormSchema } from "@/utils/zod/team";

export const addTeam = async (data: TTeamFormFields & { userId: string }) => {
  console.log("Received data:", data);

  const validatedData = teamFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { name, userId } = validatedData.data;

  console.log("Validated data:", validatedData.data);

  try {
    const existingTeam = await prisma.team.findFirst({
      where: { name },
    });

    if (existingTeam) {
      console.log("Existing team:", existingTeam);
      throw new Error("team with this name already exists");
    }

    const team = await prisma.team.create({
      data: {
        name,
        userId: parseInt(userId, 10),
      },
    });

    console.log("Created team:", team);

    return team;
  } catch (error) {
    console.error("error addTeam:", error);
    throw new Error("error");
  }
};
