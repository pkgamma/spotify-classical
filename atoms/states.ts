import { atom } from "recoil";

export const currentTrackState = atom({
  key: "currentTrackState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1DWSRc3WJklgBs",
});

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const sidebarClickedBtnState = atom({
  key: "sidebarClickedBtnState",
  default: null,
});

export const currComposerState = atom({
  key: "currComposerState",
  default: null,
});
