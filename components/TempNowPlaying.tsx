import { currTrackIdState, isPlayingState } from "@/atoms/states";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function TempNowPlaying() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currTrackIdState);
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
  }, [currTrackIdState, spotifyApi, session, currentTrackId]);

  return (
    <div>
      {songInfo && (
        <Image
          src={songInfo?.album?.images?.[0].url}
          width={200}
          height={200}
          alt=""
        />
      )}

      {isPlaying ? (
        <button onClick={handlePlayPause}>Pause</button>
      ) : (
        <button onClick={handlePlayPause}>Play</button>
      )}
    </div>
  );
}
