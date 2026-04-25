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

  const onToggle = () => {
    setOpen((prev) => !prev);
  };

  return [open, onOpen, onClose, onToggle] as const;
}
