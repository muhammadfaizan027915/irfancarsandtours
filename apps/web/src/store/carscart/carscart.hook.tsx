"use client";

import { use } from "react";
import { CarCartContext } from "./carscart.provider";

export function useCarCart() {
  const carCartContext = use(CarCartContext);

  if (!carCartContext) {
    throw new Error("useCarContext must be used within CarCartProvider");
  }

  return carCartContext;
}
