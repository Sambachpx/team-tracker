import { DataTable } from "@/components/ui/Data-table";

import { columns } from "./columns";
import fetchTeamsAndPlayers from "./actions";

export default async function MyTeamsAndPlayersPage() {
  const data = await fetchTeamsAndPlayers();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
