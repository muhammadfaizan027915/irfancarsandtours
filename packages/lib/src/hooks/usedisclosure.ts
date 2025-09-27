"use client";

import { useState } from "react";

export function useDisclosure(defaultValue: boolean = false) {
  const [open, setOpen] = useState(defaultValue);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return [open, onOpen, onClose] as const;
}
