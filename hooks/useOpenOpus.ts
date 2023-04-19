import { useState, useEffect } from "react";

const useOpenOpus = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.openopus.org${endpoint}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useOpenOpus;
