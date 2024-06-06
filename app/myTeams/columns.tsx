"use client";

import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Teams = {
  name: string;
  players?: string[];
  creator?: string;
};

export const columns: ColumnDef<Teams>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "players",
    header: "Players",
  },
  {
    accessorKey: "creator",
    header: "Creator",
  },
];
