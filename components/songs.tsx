import { playlistState } from "@/atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./song";

function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div>
      {playlist?.tracks.items.map((item, i) => (
        <Song key={item.track.id} track={item.track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
