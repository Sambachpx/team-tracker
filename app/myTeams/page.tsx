"use client";

import FetchTeams from "../player/fetchTeams";

export default function UserTeams() {
  const userId = 1;
  const teams = FetchTeams(userId);

  if (teams.length === 0) {
    return <div>vous n`&apos`avez aucune équipe</div>;
  }

  return <div>{teams.map((team) => team.name).join(", ")}</div>;
}
