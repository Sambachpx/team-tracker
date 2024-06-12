"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DataTable } from "@/components/ui/Data-table";
import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

interface PlayerTableWrapperProps {
  deletePlayer: (id: number[] | number) => Promise<void>;
}

export default function PlayerTableWrapper({ deletePlayer }: PlayerTableWrapperProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const handleRowSelectionChange = (newRowSelection: RowSelectionState) => {
    setRowSelection(newRowSelection);
    setSelectedRowIds(
      Object.keys(newRowSelection)
        .filter((key) => newRowSelection[key])
        .map(Number)
    );
  };

  const handleConfirmationClose = async (confirmed: boolean) => {
    if (confirmed) {
      await deletePlayer(selectedRowIds);
    }
    setShowConfirmation(false);
  };

  return (
    <>
      <DataTable
        //  columns={}
        //  data={}
        onRowSelectionChange={handleRowSelectionChange}
        deletePlayer={deletePlayer}
        onClick={handleDeleteClick}
      />

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        title="Delete Player"
        description="Are you sure you want to delete the selected player"
      />
    </>
  );
}
