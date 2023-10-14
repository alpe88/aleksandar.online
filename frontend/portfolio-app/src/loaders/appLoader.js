import { ENDPOINTS } from "../definitions/endpoints";
export default async function appLoader() {
  const responses = await Promise.all(
    Object.values(ENDPOINTS).map((endpoint) => fetch(endpoint))
  );

  for (const response of responses) {
    if (!response.ok) {
      throw new Response("Not Found", { status: 404 });
    }
  }

  return await Promise.all(responses.map((response) => response.json()));
}
