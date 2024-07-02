import fetchTeamsAndPlayers, { deletePlayers } from "./actions";
import PlayerTableWrapper from "./playerTableWrapper";

export default async function MyTeamsAndPlayersPage() {
  const data = await fetchTeamsAndPlayers();

  const removePlayerById = async (id: number[]) => {
    "use server";

    await deletePlayers(id);
    console.log("delete players", id);
  };

  return (
    <div className="container mx-auto py-10">
      <PlayerTableWrapper deletePlayers={removePlayerById} data={data} />
    </div>
  );
}
