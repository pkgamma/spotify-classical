import { currentTrackState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import { Separator } from "@radix-ui/react-separator";
import { useRecoilState } from "recoil";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    // console.log(track);
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  return (
    <div>
      <div onClick={playSong}>
        {order} {track.name}
      </div>
      <Separator className="my-2" />
    </div>
  );
}

export default Song;
