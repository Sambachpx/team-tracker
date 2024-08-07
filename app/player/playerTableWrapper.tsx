"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DataTable } from "@/components/ui/Data-table";
import type { RowSelectionState, useReactTable } from "@tanstack/react-table";
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
  const [tableInstance, setTableInstance] = useState<ReturnType<typeof useReactTable<Players>> | null>(null);

  const handleRowSelectionChange = (newState: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
    console.log("Row selection changed:", newState);
    setRowSelection(newState);
  };

  const handleDeleteClick = (id: number[]) => {
    setIsDialogOpen(id);
  };

  const handleDeleteAllClick = () => {
    if (tableInstance) {
      const selectedIds = tableInstance.getFilteredSelectedRowModel().rows.map((row) => row.original.id);
      console.log("Selected IDs:", selectedIds);
      setIsDialogOpen(selectedIds);
    }
  };

  const handleConfirmationClose = async (confirmed: boolean) => {
    if (confirmed && isDialogOpen !== null) {
      console.log("Deleting players with IDs:", isDialogOpen);
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
        onTableInstanceChange={setTableInstance}
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
