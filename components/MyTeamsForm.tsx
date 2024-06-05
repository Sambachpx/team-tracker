"use client";

interface Iteam {
  teams: { id: number; name: string; userId: number | null }[];
}

export default function MyTeamsForm({ teams }: Iteam) {
  if (teams.length === 0) {
    return <div>vous n`&apos`avez aucune équipe</div>;
  }

  return <div>{teams.map((team) => team.name).join(", ")}</div>;
}
