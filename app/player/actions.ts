"use server";

import { getUserIdFromSession } from "@/utils/functions";
import { prisma } from "@/utils/prisma/prisma";
import type { TPlayerFormFields } from "@/utils/zod/player";
import { playerFormSchema } from "@/utils/zod/player";

export const addPlayer = async (data: TPlayerFormFields) => {
  const validatedData = playerFormSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error("invalid form data");
  }

  const { firstName, lastName, salary, team } = validatedData.data;

  try {
    const player = await prisma.player.create({
      data: {
        firstName,
        lastName,
        salary,
        teamId: Number(team),
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

  const { firstName, lastName, salary, team } = validatedData.data;

  try {
    const player = await prisma.player.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        salary,
        teamId: Number(team),
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

export const getPlayer = async (id: number) => {
  try {
    const player = await prisma.player.findUnique({
      where: {
        id,
      },
    });

    return player;
  } catch (error) {
    console.error("error getPlayer:", error);
    throw error;
  }
};


// utiliser que dans la page pas fonctions, pas chnager prisma

// relation user via la team

// pas user mais player where id du user, include team

export default async function fetchTeamsAndPlayers() {
  try {
    const userId = await getUserIdFromSession();

    const userWithTeamsAndPlayers = await prisma.player.findMany({
      where: {
        team: {
          user: {
            id: Number(userId),
          },
        },
      },
      include: {
        team: true,
      },
    });

    if (!userWithTeamsAndPlayers) {
      throw new Error("user not found");
    }

    const players = userWithTeamsAndPlayers.map((player) => ({
      ...player,
      teamName: { name: player.team.name },
      creator: player.team.userId,
    }));

    return players;
  } catch (error) {
    console.error("error getTeams:", error);
    throw error;
  }
}

