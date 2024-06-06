import PlayerForm from "@/components/PlayerForm";
import { getTeams } from "../../team/actions";

export default async function PlayerPage() {
  const teams = await getTeams();

  return (
    <div>
      <PlayerForm teams={teams} />
    </div>
  );
}
//  tableau sur /player
