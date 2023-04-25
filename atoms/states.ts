import { atom } from "recoil";

export const currPeriodState = atom({
  key: "currPeriodState",
  default: null,
});

export const currComposerState = atom({
  key: "currComposerState",
  default: null,
});

export const currWorkIdState = atom({
  key: "currWorkIdState",
  default: null,
});

export const currRecordingState = atom({
  key: "currRecordingState",
  default: null,
});

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
  default: null,
});

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

// prob remove
export const sidebarClickedBtnState = atom({
  key: "sidebarClickedBtnState",
  default: null,
});
