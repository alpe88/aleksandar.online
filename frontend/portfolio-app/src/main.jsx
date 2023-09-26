import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ErrorProvider } from "./contexts/ErrorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LoadingProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </LoadingProvider>
  </React.StrictMode>
);
