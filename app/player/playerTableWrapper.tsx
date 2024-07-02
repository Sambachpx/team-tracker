"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DataTable } from "@/components/ui/Data-table";
import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import type { Players } from "./columns";
import { getCollumsPlayer } from "./columns";

interface PlayerTableWrapperProps {
  deletePlayer: (id: number) => Promise<void>;
  data: Players[];
}

export default function PlayerTableWrapper({ deletePlayer, data }: PlayerTableWrapperProps) {
  const [, setRowSelection] = useState<RowSelectionState>({});
  const [isDialogOpen, setIsDialogOpen] = useState<number | null>(null);

  const handleRowSelectionChange = (
    updaterOrValue: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)
  ) => {
    setRowSelection(updaterOrValue);
  };

  const handleDeleteClick = (id: number) => {
    setIsDialogOpen(id);
  };

  const handleConfirmationClose = async (confirmed: boolean) => {
    if (confirmed && isDialogOpen !== null) {
      await deletePlayer(isDialogOpen);
    }
    setIsDialogOpen(null);
  };

  return (
    <>
      <DataTable
        columns={getCollumsPlayer({ onClick: handleDeleteClick })}
        data={data}
        onRowSelectionChange={handleRowSelectionChange}
      />

      <ConfirmationDialog
        isOpen={isDialogOpen !== null}
        onClose={handleConfirmationClose}
        title="Delete Player"
        description="Are you sure you want to delete the selected player?"
      />
    </>
  );
}
