import { playlistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Songs from "./songs";
import { cn } from "@/lib/utils";

function Center({ className }): JSX.Element {
  const { data: session } = useSession();
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
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-gray-200 space-x-3 transition duration-300 ease-in-out hover:opacity-70 cursor-pointer p-1 pr-2 m-4">
          <Image
            src={session?.user.image}
            alt="profile"
            width={40}
            height={40}
          />
          <h2>{session?.user.name}</h2>
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gray-200 h-80 padding-8`}
      >
        <Image
          src={playlist?.images[0].url}
          width={200}
          height={200}
          alt={playlist?.name}
        />
        <div>
          <h1>{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
