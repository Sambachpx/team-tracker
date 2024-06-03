"use server";

import { authHandler } from "@/auth";
import { prisma } from "@/utils/prisma/prisma";
import type { TTeamFormFields } from "@/utils/zod/team";
import { teamFormSchema } from "@/utils/zod/team";

export const addTeam = async (data: TTeamFormFields) => {
  const validatedData = teamFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { name } = validatedData.data;
  const session = await authHandler();
  console.log("session", session);
  const userId = session?.user?.id;

  /* if (!userId) {
    throw new Error("user not found");
  } */

  try {
    const existingTeam = await prisma.team.findFirst({
      where: { name },
    });

    if (existingTeam) {
      throw new Error("team with this name already exists");
    }

    const team = await prisma.team.create({
      data: {
        name,
        userId: userId ? parseInt(userId, 10) : undefined,
        // userId: parseInt(userId, 10),
      },
    });

    return team;
  } catch (error) {
    console.error("error addTeam:", error);
    throw new Error("error");
  }
};

export const deleteTeam = async (id: number) => {
  try {
    const team = await prisma.team.delete({
      where: {
        id,
      },
    });

    return team;
  } catch (error) {
    console.error("error deleteTeam:", error);
    throw new Error("error");
  }
};

export const updateTeam = async (id: number, data: TTeamFormFields) => {
  const validatedData = teamFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { name } = validatedData.data;

  try {
    const team = await prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return team;
  } catch (error) {
    console.error("error updateTeam:", error);
    throw new Error("error");
  }
};

export const getTeams = async () => {
  try {
    const teams = await prisma.team.findMany();

    return teams;
  } catch (error) {
    console.error("error getTeams:", error);
    throw new Error("error");
  }
};
