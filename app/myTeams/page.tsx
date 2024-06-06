import { DataTable } from "@/components/ui/Data-table";
import { columns } from "./columns";
import { getTeamPlayers } from "../team/actions";

export default async function MyTeamsPage() {
  const data = await getTeamPlayers();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
