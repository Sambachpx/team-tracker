"use client";

import LinkButton from "@/components/LinkButton";
import { Button } from "@/components/ui/Button";
import type { ColumnDef } from "@tanstack/react-table";
import { deletePlayer } from "./actions";

export type Team = {
  name: string;
};

export type Players = {
  id: number;
  firstName: string;
  lastName: string;
  salary: number;
  players?: string[];
  creator?: number;
  teamName: Team;
};

export const columns: ColumnDef<Players>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "teamName.name",
    header: "Team",
  },
  {
    accessorKey: "creator",
    header: "Creator",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => <LinkButton href={`/player/${row.original.id}/edit`}>edit</LinkButton>,
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => <Button onClick={() => deletePlayer(row.original.id)}>delete</Button>,
  },
];
