import { useEffect, useState } from "react";
import { getTeams } from "../team/actions";

export default function useFetchTeams() {
  const [teams, setTeams] = useState<{ id: number; name: string; userId: number }[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error("error fetchTeams:", error);
      }
    }
    fetchTeams().catch(console.error);
  }, []);

  return teams;
}
