// =============================================================
// Main helper function that fetches data from the Open Opus API
// =============================================================
async function openOpusApi(endpoint) {
  const response = await fetch(`https://api.openopus.org${endpoint}`);
  const data = await response.json();
  return data;
}
// =============================================================

export async function getComposersPopular() {
  const endpoint = `/composer/list/pop.json`;
  return await openOpusApi(endpoint);
}

export async function getComposersEssential() {
  const endpoint = `/composer/list/rec.json`;
  return await openOpusApi(endpoint);
}

export async function getComposersByFirstLetter(letter: string) {
  const endpoint = `/composer/list/name/${letter}.json`;
  return await openOpusApi(endpoint);
}

export const periodOptions = {
  Medieval: "Medieval",
  Renaissance: "Renaissance",
  Baroque: "Baroque",
  Classical: "Classical",
  EarlyRomantic: "Early Romantic",
  Romantic: "Romantic",
  LateRomantic: "Late Romantic",
  TwentiethCentury: "20th Century",
  PostWar: "Post-War",
  TwentyFirstCentury: "21st Century",
};

export async function getComposersByPeriod(period: string) {
  const endpoint = `/composer/list/epoch/${period}.json`;
  return await openOpusApi(endpoint);
}

export async function getComposersBySearch(search: string) {
  const endpoint = `/composer/list/search/${search}.json`;
  return await openOpusApi(endpoint);
}

export async function getComposersByIDs(ids: string) {
  const endpoint = `/composer/list/ids/${ids}.json`;
  return await openOpusApi(endpoint);
}

export async function getGenresByComposerID(id: number) {
  const endpoint = `/genre/list/composer/${id}.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksByComposerID(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/all.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksById(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/all.json`;
  return await openOpusApi(endpoint);
}
