import { getTeams } from "@/app/team/actions";
import PlayerForm from "@/components/PlayerForm";

export default async function EditPlayerPage() {
  const teams = await getTeams();

  return (
    <div>
      <PlayerForm teams={teams} />
    </div>
  );
}
