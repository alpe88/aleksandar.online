import { ROUTES } from "./definitions/routes";

import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import appLoader from "./loaders/appLoader";
import ErrorBoundary from "./ErrorBoundary";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorBoundary />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
