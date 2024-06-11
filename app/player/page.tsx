// "use client";

import { DataTable } from "@/components/ui/Data-table";

import { getCollumsPlayer } from "./columns";
import fetchTeamsAndPlayers from "./actions";

export default async function MyTeamsAndPlayersPage() {
  const data = await fetchTeamsAndPlayers();

  const deletePlayer = () => {
    "use server";

    deletePlayer();
    console.log("delete player");
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={getCollumsPlayer} data={data} />
    </div>
  );
}
