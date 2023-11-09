import { periodOptions } from "@/lib/openopus";
import { atom } from "recoil";

export const isLoadedState = atom({
  key: "isLoadedState",
  default: true,
});

export const currPeriodIdState = atom({
  key: "currPeriodIdState",
  default: periodOptions.Romantic,
});

export const currComposerIdState = atom({
  key: "currComposerIdState",
  default: "",
});

export const currWorkIdState = atom({
  key: "currWorkIdState",
  default: "",
});

export const currRecordingIdState = atom({
  key: "currRecordingIdState",
  default: "",
});

export const currAlbumIdState = atom({
  key: "currAlbumIdState",
  default: "",
});

export const currTrackIdState = atom({
  key: "currTrackIdState",
  default: "",
});

export const currSearchQueryState = atom({
  key: "currSearchQueryState",
  default: "",
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
