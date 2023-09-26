import { useContext, createContext } from "react";

export const ErrorContext = createContext();

export function useError() {
  return useContext(ErrorContext);
}
