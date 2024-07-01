import fetchTeamsAndPlayers from "./actions";
import PlayerTableWrapper from "./playerTableWrapper";

export default async function MyTeamsAndPlayersPage() {
  const data = await fetchTeamsAndPlayers();

  const deletePlayer = async (id: number[] | number) => {
    "use server";

    await deletePlayer(id);

    console.log("delete player", id);
  };

  return (
    <div className="container mx-auto py-10">
      <PlayerTableWrapper deletePlayer={deletePlayer} />
    </div>
  );
}
