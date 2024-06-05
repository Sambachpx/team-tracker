import MyTeamsForm from "@/components/MyTeamsForm";
import { getTeams } from "../team/actions";

export default async function myTeamsPage() {
  const teams = await getTeams();

  return (
    <div>
      <MyTeamsForm teams={teams} />
    </div>
  );
}
