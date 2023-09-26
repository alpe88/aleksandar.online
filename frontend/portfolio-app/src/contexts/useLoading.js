import { useContext, createContext } from "react";

export const LoadingContext = createContext();

export function useLoading() {
  return useContext(LoadingContext);
}
