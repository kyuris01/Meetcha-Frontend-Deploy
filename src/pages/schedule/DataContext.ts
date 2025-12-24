import { createContext } from "react";

export type DateContextValue = {
  year: number;
  month: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

export const DateContext = createContext<DateContextValue | null>(null);
