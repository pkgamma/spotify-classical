import { useState, useEffect } from "react";

// export function getPopularComposers() {
//   return openOpusApi("/composer/list/pop.json");
// }

export const getPopularComposers = async () => {
  const endpoint = "/composer/list/pop.json";
  const data = await openOpusApi(endpoint);
  // console.log(data);
  return data;
};

export function getWorksById(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/all.json`;
  return openOpusApi(endpoint);
}

// const openOpusApi = (endpoint) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`https://api.openopus.org${endpoint}`);
//         const json = await response.json();
//         setData(json);
//       } catch (err) {
//         setError(err);
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [endpoint]);

//   return { data, isLoading, error };
// };

async function openOpusApi(endpoint) {
  const response = await fetch(`https://api.openopus.org${endpoint}`);
  // console.log(response);
  const data = await response.json();
  // console.log(data);
  return data;
}
