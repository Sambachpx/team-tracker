"use client";

import { Button } from "@/components/ui/Button";

import type { ColumnDef, RowSelectionState, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import * as React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { deletePlayers } from "@/app/player/actions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowSelectionChange,
  deletePlayer,
}: DataTableProps<TData, TValue> & {
  onRowSelectionChange: (rowSelection: RowSelectionState) => void;
  deletePlayer: (id: number[] | number) => Promise<void>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const isAnyRowSelected = Object.values(rowSelection).some(Boolean);

  React.useEffect(() => {
    setRowSelection({});
  }, [data]);

  const handleRowSelectionChnage = (newRowSelection: RowSelectionState) => {
    setRowSelection(newRowSelection);
    onRowSelectionChange(newRowSelection);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={!isAnyRowSelected}
          onClick={async () => {
            if (isAnyRowSelected) {
              const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);
              const selectedRowIdsAsNumbers = selectedRowIds.map(Number);

              await deletePlayers(selectedRowIdsAsNumbers);

              console.log(selectedRowIds);
            }
          }}
        >
          Delete all
        </Button>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}

// fonctions playertablecollone qui renvoie colonnes prend en paramètre
// buuton onclick = ondeleteclick
/* React.useEffect(() => {
    onRowSelectionChange(rowSelection);
  }, [rowSelection, onRowSelectionChange]);
*/

/* onRowSelectionChange = (selectedRows) => {
    const selectedRowIds = Object.keys(selectedRows).filter((key) => selectedRows[key]);
    console.log(selectedRowIds);
  };
*/
