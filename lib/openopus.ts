import useOpenOpus from "@/hooks/useOpenOpus";

export function getPopularComposers() {
  const { data, error, isLoading } = useOpenOpus("/composer/list/pop.json");

  return { data, error, isLoading };
}

export function getWorksById(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/all.json`;
  const { data, error, isLoading } = useOpenOpus(endpoint);

  return { data, error, isLoading };
}

// export function getComposersById(id: number) {
//   const endpoint = `/composer/${id}/json`;
//   const { data, error, isLoading } = useOpenOpus(endpoint);

//   return { data, error, isLoading };
// }

// export function getComposersList(endpoint: string) {
//   const { data, error, isLoading } = useOpenOpus(endpoint);

//   return { data, error, isLoading };
// }

// export function getWorksList(endpoint: string) {
//   const { data, error, isLoading } = useOpenOpus(endpoint);

//   return { data, error, isLoading };
// }

// export function getWorksById(id: number) {
//   const endpoint = `/work/${id}/json`;
//   const { data, error, isLoading } = useOpenOpus(endpoint);

//   return { data, error, isLoading };
// }
