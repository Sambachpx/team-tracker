// "use client";

import { DataTable } from "@/components/ui/Data-table";

import { getCollumsPlayer } from "./columns";
import fetchTeamsAndPlayers from "./actions";
import PlayerTableWrapper from "./playerTableWrapper";

export default async function MyTeamsAndPlayersPage() {
  const data = await fetchTeamsAndPlayers();

  const deletePlayer = async () => {
    "use server";

    await deletePlayer();
    console.log("delete player");
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={getCollumsPlayer} data={data} />

      <PlayerTableWrapper deletePlayer={deletePlayer} />
    </div>
  );
}

// crer nvx component
// appel delete dan

// state is Dialog open qui prend un id, qd je clique
