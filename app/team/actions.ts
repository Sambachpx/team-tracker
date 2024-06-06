"use server";

import { getUserIdFromSession } from "@/utils/functions";
import { prisma } from "@/utils/prisma/prisma";
import type { TTeamFormFields } from "@/utils/zod/team";
import { teamFormSchema } from "@/utils/zod/team";

export const addTeam = async (data: TTeamFormFields) => {
  const userId = await getUserIdFromSession();

  const validatedData = teamFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { name } = validatedData.data;

  try {
    const existingTeam = await prisma.team.findFirst({
      where: { name },
    });

    if (existingTeam) {
      throw new Error("team with this name already exists");
    }

    const team = await prisma.team.create({
      data: {
        userId: Number(userId),
        name,
      },
    });

    return team;
  } catch (error) {
    console.error("error addTeam:", error);
    throw error;
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
    throw error;
  }
};

export const deleteTeams = async (teamId?: number, userId?: number) => {
  try {
    const deleteResult = await prisma.team.deleteMany({
      where: teamId ? { id: teamId } : { userId },
    });

    return deleteResult;
  } catch (error) {
    console.error("error deleteTeams:", error);
    throw error;
  }
};

export const getTeams = async () => {
  try {
    const userId = await getUserIdFromSession();

    const teams = await prisma.team.findMany({
      where: { userId: Number(userId) },
    });

    return teams;
  } catch (error) {
    console.error("error getTeams:", error);
    throw error;
  }
};

export const getTeam = async (id: number) => {
  try {
    const team = await prisma.team.findFirst({
      where: { id },
    });

    return team;
  } catch (error) {
    console.error("error getTeam:", error);
    throw error;
  }
};
