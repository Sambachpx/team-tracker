import { useEffect, useState } from "react";
import { getTeams } from "../team/actions";

export default function FetchTeams(userId?: number) {
  const [teams, setTeams] = useState<{ id: number; name: string; userId: number | null }[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const teamsData = await getTeams(userId);
        setTeams(teamsData);
      } catch (error) {
        console.error("error fetchTeams:", error);
      }
    }
    fetchTeams().catch(console.error);
  }, [userId]);

  return teams;
}
