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
    throw error;
  }
};

export const deletePlayer = async (id: number) => {
  try {
    const player = await prisma.player.delete({
      where: {
        id,
      },
    });

    return player;
  } catch (error) {
    console.error("error deletePlayer:", error);
    throw error;
  }
};

export const updatePlayer = async (id: number, data: TPlayerFormFields) => {
  const validatedData = playerFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { firstName, lastName, salary, teamId, image } = validatedData.data;

  try {
    const player = await prisma.player.update({
      where: {
        id,
      },
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
    console.error("error updatePlayer:", error);
    throw error;
  }
};

export const getPlayers = async () => {
  try {
    const players = await prisma.player.findMany();

    return players;
  } catch (error) {
    console.error("error getPlayers:", error);
    throw error;
  }
};
