"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DataTable } from "@/components/ui/Data-table";
import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Players } from "./columns";
import { getCollumsPlayer } from "./columns";

interface PlayerTableWrapperProps {
  deletePlayers: (ids: number[]) => Promise<void>;
  data: Players[];
}

export default function PlayerTableWrapper({ deletePlayers, data }: PlayerTableWrapperProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDialogOpen, setIsDialogOpen] = useState<number[] | null>(null);

  const handleRowSelectionChange = (newState: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
    setRowSelection(newState);
  };

  const handleDeleteClick = (id: number[]) => {
    setIsDialogOpen(id);
  };

  const handleDeleteAllClick = () => {
    const selectedIds = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map(Number);
    if (selectedIds.length > 0) {
      setIsDialogOpen(selectedIds);
    }
  };

  const handleConfirmationClose = async (confirmed: boolean) => {
    if (confirmed && isDialogOpen !== null) {
      await deletePlayers(isDialogOpen);
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

      <Button
        variant="outline"
        size="sm"
        onClick={handleDeleteAllClick}
        disabled={Object.keys(rowSelection).length === 0}
      >
        Delete all
      </Button>
    </>
  );
}
