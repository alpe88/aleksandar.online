// appLoader.js
import { ENDPOINTS } from "../definitions/endpoints";

export default function appLoader() {
  const dataPromise = Promise.all(
    Object.values(ENDPOINTS).map((endpoint) => fetch(endpoint))
  ).then((responses) => {
    for (const response of responses) {
      if (!response.ok) {
        throw new Response("Not Found", { status: 404 });
      }
    }
    return Promise.all(responses.map((response) => response.json()));
  });

  // Keep the promise unresolved here so React Router can hand it to <Await>.
  // App.jsx wraps that promise in Suspense, which is what triggers QuickFallback.
  return { fetchedData: dataPromise };
}
