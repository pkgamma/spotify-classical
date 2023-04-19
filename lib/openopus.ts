import { useState, useEffect } from "react";

export function getPopularComposers() {
  const { data, error, isLoading } = openOpusApi("/composer/list/pop.json");

  return { data, error, isLoading };
}

export function getWorksById(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/all.json`;
  const { data, error, isLoading } = openOpusApi(endpoint);

  return { data, error, isLoading };
}

const openOpusApi = (endpoint) => {
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
