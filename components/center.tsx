import { playlistIdState, playlistState } from "@/atoms/states";
import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cn } from "@/lib/utils";
import Song from "./song";

function Center({ className }): JSX.Element {
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((response) => {
        setPlaylist(response.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [spotifyApi, playlistId]);

  return (
    <div className={cn("flex-grow h-screen overflow-scroll", className)}>
      <h1 className="text-2xl font-bold">Spotify Playlist</h1>
      {playlist && (
        <div>
          <h1 className="text-2xl">{playlist?.name}</h1>
          <Image
            src={playlist?.images[0].url}
            width={70}
            height={70}
            alt={playlist?.name}
          />
          <div>
            <div>
              {playlist?.tracks.items.map((item, i) => (
                <Song key={item.track.id} track={item.track} order={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Center;
