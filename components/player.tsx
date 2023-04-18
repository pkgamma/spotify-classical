import { currentTrackState, isPlayingState } from "@/atoms/songAtom";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      if (response.body) {
        if (response.body.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      }
    });
  };

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((response) => {
        if (response.body) {
          setCurrentTrackId(response.body.item.id);
        }
      });
      spotifyApi.getMyCurrentPlaybackState().then((response) => {
        if (response.body) {
          setIsPlaying(true);
        }
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackState, spotifyApi, session]);

  return (
    <div>
      <Image
        src={songInfo?.album?.images?.[0].url}
        width={100}
        height={100}
        alt=""
      />

      {isPlaying ? (
        <button onClick={handlePlayPause}>Pause</button>
      ) : (
        <button onClick={handlePlayPause}>Play</button>
      )}
    </div>
  );
}

export default Player;
