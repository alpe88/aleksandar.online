import useFetch from "./hooks/useFetch";
import { useError } from "./contexts/useError";
import { useLoading } from "./contexts/useLoading";

function App() {
  const { error } = useError();
  const { isLoading } = useLoading();
  const { data } = useFetch(
    "https://cdn.aleksandar.online/wp-json/portfolio-api/v1/pages",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Render your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
