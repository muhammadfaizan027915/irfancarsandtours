"use client";

import { useContext } from "react";
import { TourCartContext } from "./tourscart.provider";

export function useTourCart() {
  const context = useContext(TourCartContext);

  if (!context) {
    throw new Error("useTourCart must be used within a TourCartProvider");
  }

  return context;
}
