"use client";

import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/Table";

interface Iteam {
  teams: { id: number; name: string; userId: number | null }[];
}

export default function MyTeamsForm({ teams }: Iteam) {
  if (teams.length === 0) {
    return <div>vous n`&apos`avez aucune équipe</div>;
  }

  return (
    <Table>
      <TableCaption>liste équipes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>nom équipe</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.id}>
            <TableCell>{team.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
