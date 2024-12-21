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

  // Return an object with a promise property.
  // Do NOT await it here.
  return { fetchedData: dataPromise };
}
