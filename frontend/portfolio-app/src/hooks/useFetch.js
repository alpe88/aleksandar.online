import { useState, useEffect } from "react";
import { useError } from "../contexts/useError";
import { useLoading } from "../contexts/useLoading";

function useFetch(url, options = {}) {
  const [data, setData] = useState([]);
  const { setIsLoading } = useLoading();
  const { handleError } = useError();

  async function fetchData(url, options) {
    setIsLoading(true);
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(url, options);
  }, []);

  return { data };
}

export default useFetch;
