"use client";

import { useState } from "react";

export default function useConfirmationDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => {});

  const openDialog = () =>
    new Promise<boolean>((resolve) => {
      setIsDialogOpen(true);
      setResolvePromise(() => resolve);
    });

  const closeDialog = (value: boolean) => {
    setIsDialogOpen(false);
    resolvePromise(value);
  };

  return { isDialogOpen, openDialog, closeDialog };
}
