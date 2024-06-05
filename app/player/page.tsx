import PlayerForm from "@/components/PlayerForm";
import { getTeams } from "../team/actions";

export default async function PlayerPage() {
  const teams = await getTeams();

  // page tsx player supp use client, toute logique use form a mettre dans un component player form,

  // pas de FetchTeams.ts

  return (
    <div>
      <PlayerForm teams={teams} />
    </div>
  );
}
