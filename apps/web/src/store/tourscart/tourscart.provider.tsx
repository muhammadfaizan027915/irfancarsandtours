"use client";

import { createContext } from "react";
import { useTourCartReducer } from "./tourscart.reducer";
import { TourCartContextType } from "./tourscart.types";

export const TourCartContext = createContext<TourCartContextType | null>(null);

export function TourCartProvider({ children }: { children: React.ReactNode }) {
  const tourCartReducer = useTourCartReducer();

  return (
    <TourCartContext value={{...tourCartReducer }}>
      {children}
    </TourCartContext>
  );
}