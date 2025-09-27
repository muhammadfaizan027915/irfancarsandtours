"use client";

import { useCarCartReducer } from "./carscart.reducer";
import { CarCartContextType } from "./carscart.types";
import { createContext, ReactNode } from "react";

export const CarCartContext = createContext<CarCartContextType | undefined>(
  undefined
);

type CarCartProviderProps = {
  children: ReactNode;
};

export function CarCartProvider({ children }: CarCartProviderProps) {
  const carCartReducer = useCarCartReducer();

  return <CarCartContext value={{ ...carCartReducer }}>{children}</CarCartContext>;
}
