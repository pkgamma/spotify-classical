// =============================================================
// Main helper function that fetches data from the Open Opus API
// =============================================================

async function openOpusApi(endpoint: string) {
  const response = await fetch(`https://api.openopus.org${endpoint}`);
  const data = await response.json();
  return data;
}

// =============================================================

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

export const genreOptions = {
  All: "all",
  Chamber: "Chamber",
  Keyboard: "Keyboard",
  Orchestral: "Orchestral",
  Stage: "Stage",
  Vocal: "Vocal",
};

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

export async function getComposersByPeriod(period: keyof typeof periodOptions) {
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

// =============================================================

export async function getGenresByComposerID(id: number) {
  const endpoint = `/genre/list/composer/${id}.json`;
  return await openOpusApi(endpoint);
}

// =============================================================

export async function getWorksByComposerID(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/all.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksByComposerIDPopular(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/Popular.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksByComposerIDEssential(id: number) {
  const endpoint = `/work/list/composer/${id}/genre/Recommended.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksByComposerIDandGenre(
  id: number,
  genre: keyof typeof genreOptions
) {
  if (genre === "All") {
    return await getWorksByComposerID(id);
  }
  const endpoint = `/work/list/composer/${id}/${genre}.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksByComposerIDandSearch(
  id: number,
  search: string
) {
  const endpoint = `/work/list/composer/${id}/genre/all/search/${search}.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksByComposerIDandGenreAndSearch(
  id: number,
  genre: keyof typeof genreOptions,
  search: string
) {
  const endpoint = `/work/list/composer/${id}/genre/${genre}/search/${search}.json`;
  return await openOpusApi(endpoint);
}

export async function getWorksByWorkIDs(ids: string) {
  const endpoint = `/work/list/ids/${ids}.json`;
  return await openOpusApi(endpoint);
}

// =============================================================

export async function getWorkDetailsByWorkID(id: number) {
  const endpoint = `/work/detail/${id}.json`;
  return await openOpusApi(endpoint);
}

// =============================================================

export async function getWorkAndComposerBySearch(search: string) {
  const endpoint = `/omnisearch/${search}/0.json`;
  return await openOpusApi(endpoint);
}

// SEARCH RELATED API CALLS NOT YET IMPLEMENTED:
// see https://github.com/openopus-org/openopus_api/blob/master/USAGE.md

// List random works
// =================
// POST /dyn/work/random
// Header:
// popularwork	1	Return only popular compositions
// recommendedwork	1	Return only essential compositions
// popularcomposer	1	Return only works by famous composers
// recommendedcomposer	1	Return only works by essential composers
// genre	All	Return only works of a certain genre
// epoch	All	Return only works from a certain period
// composer	196,183	Return only works by specific composers
// composer_not	165,3	Don't return works by certain composers
// work	16642,16578,16595	Return only works from a list

// Performers
// =================
// List roles by names
// POST /dyn/performer/list
// Header:
// names	["Herbert von Karajan", "Sviatoslav Richter", "Berliner Philharmoniker"]

// Work guesser
// =================
// Bulk discover composer and work IDs by title
// POST /dyn/work/guess
// Header:
// works	[{"composer":"Igor Stravinsky","title":"Le sacre du printemps"},{"composer":"Anton Bruckner","title":"Symphony no 4"},{"composer":"Ferruccio Busoni", "title":"Piano concerto, op. 39"}]
