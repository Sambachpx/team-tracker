"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import LinkButton from "@/components/LinkButton";
import { Button } from "@/components/ui/Button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useState } from "react";
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        First Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleDelete = async () => {
        setIsDialogOpen(false);
        await deletePlayer(row.original.id);
      };

      return (
        <>
          <Button onClick={() => setIsDialogOpen(true)}>Delete</Button>
          {isDialogOpen && (
            <ConfirmationDialog
              title="Are you sure?"
              description="This action cannot be undone. This will permanently delete this player and remove their data"
              // action a faire
            />
          )}
        </>
      );
    },
  },
];

// getFitter selected row model

// remonter info cases coché pour emmener dans la page.tsx, page.tsx,
// state is alervisible ternaire

// qd je clique sur supprimer faire appraitre en dehors du tableau
