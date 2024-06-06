"use client";

import edit from "@/utils/functions";
import type { ColumnDef } from "@tanstack/react-table";

export type Team = {
  name: string;
};

export type Players = {
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
    cell: ({ row }) => (
      <button type="button" onClick={() => edit(row.original)}>
        Edit
      </button>
    ),
  },
];
