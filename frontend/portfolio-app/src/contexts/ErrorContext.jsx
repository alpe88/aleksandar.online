import { useState } from "react";
import { ErrorContext } from "./useError";

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const handleError = (newError) => {
    setError(newError);
  };

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
    </ErrorContext.Provider>
  );
}
