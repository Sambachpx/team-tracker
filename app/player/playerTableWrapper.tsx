"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DataTable } from "@/components/ui/Data-table";
import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { getCollumsPlayer } from "./columns";

interface PlayerTableWrapperProps {
  deletePlayer: (id: number[] | number) => Promise<void>;
}

export default function PlayerTableWrapper({ deletePlayer }: PlayerTableWrapperProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDialogOpen, setIsDialogOpen] = useState<number | null>(null);

  const handleRowSelectionChange = (newRowSelection: RowSelectionState) => {
    setRowSelection(newRowSelection);
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
        // data={}
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
