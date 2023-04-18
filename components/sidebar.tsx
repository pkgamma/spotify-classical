import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Link from "next/link";

function Sidebar() {
  const SpotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (SpotifyApi.getAccessToken()) {
      SpotifyApi.getUserPlaylists()
        .then((response) => {
          setPlaylists(response.body.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session, SpotifyApi]);

  const btnStyle =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium";

  return (
    <div className="">
      <div className=" w-64 bg-gray-50 text-gray-800 p-4 border-r border-gray-300 overflow-y-scroll h-screen scrollbar-hide">
        <div>
          <Link href="/login" className={buttonVariants()}>
            Login
          </Link>

          <Button variant="destructive" onClick={() => signOut()}>
            Logout
          </Button>

          <button className={btnStyle}>
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
          <button className={btnStyle}>
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
          <button className={btnStyle}>
            <LibraryIcon className="h-5 w-5" />
            <p>Library</p>
          </button>
          <button className={btnStyle}>
            <PlusCircleIcon className="h-5 w-5" />
            <p>Create Playlist</p>
          </button>
          <button className={btnStyle}>
            <HeartIcon className="h-5 w-5" />
            <p>Liked Songs</p>
          </button>
          <button className={btnStyle}>
            <RssIcon className="h-5 w-5" />
            <p>Episodes</p>
          </button>

          {playlists.map((playlist) => (
            <p key={playlist.id} className={btnStyle}>
              {playlist.name}
            </p>
          ))}

          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
