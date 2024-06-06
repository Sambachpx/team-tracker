import { getTeams } from "@/app/team/actions";
import PlayerForm from "@/components/PlayerForm";
import { notFound } from "next/navigation";
import { getPlayer } from "../../actions";

interface IEditPlayerPageProps {
  params: {
    id: string;
  };
}

export default async function EditPlayerPage(props: IEditPlayerPageProps) {
  if (!props.params.id) {
    return notFound();
  }

  const teams = await getTeams();
  const playerId = Number(props.params.id);
  const player = await getPlayer(playerId);

  if (!player) {
    return notFound();
  }

  return (
    <div>
      <PlayerForm teams={teams} player={player} />
    </div>
  );
}
