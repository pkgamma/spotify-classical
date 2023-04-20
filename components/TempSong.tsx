import { currentTrackState, isPlayingState } from "@/atoms/states";
import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";

function TempSong({ order, track }) {
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
    </div>
  );
}

export default TempSong;
