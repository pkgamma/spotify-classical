import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import {
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music,
  Music2,
  PlayCircle,
  Radio,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { playlistIdState } from "@/atoms/playlistAtom";
import { Separator } from "./ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function Sidebar({ className }): JSX.Element {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log("clicked on sidebar playlist ID " + playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((response) => {
          setPlaylists(response.body.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session, spotifyApi]);

  const btnStyle =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium";

  return (
    <div className={cn("pb-12 h-screen overflow-scroll", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold ">Discover</h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Listen Now
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Browse
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Radio className="mr-2 h-4 w-4" />
              Radio
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold ">Library</h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <ListMusic className="mr-2 h-4 w-4" />
              Playlists
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Music2 className="mr-2 h-4 w-4" />
              Songs
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Made for You
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Mic2 className="mr-2 h-4 w-4" />
              Artists
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Library className="mr-2 h-4 w-4" />
              Albums
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold ">Playlists</h2>
          <ScrollArea className="h-[300px] px-2">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist) => (
                <Button
                  key={playlist.id}
                  onClick={() => setPlaylistId(playlist.id)}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal truncate"
                >
                  <ListMusic className="mr-2 h-4 w-4" />
                  {playlist.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
    // <div className="">
    //   <div className=" w-64 bg-gray-50 text-gray-800 p-4 border-r border-gray-300 overflow-y-scroll h-screen scrollbar-hide">
    //     <div>
    //       <Link href="/login" className={buttonVariants()}>
    //         Login
    //       </Link>

    //       <Button variant="destructive" onClick={() => signOut()}>
    //         Logout
    //       </Button>

    //       <button className={btnStyle}>
    //         <HomeIcon className="h-5 w-5" />
    //         <p>Home</p>
    //       </button>
    //       <button className={btnStyle}>
    //         <SearchIcon className="h-5 w-5" />
    //         <p>Search</p>
    //       </button>
    //       <button className={btnStyle}>
    //         <LibraryIcon className="h-5 w-5" />
    //         <p>Library</p>
    //       </button>
    //       <button className={btnStyle}>
    //         <PlusCircleIcon className="h-5 w-5" />
    //         <p>Create Playlist</p>
    //       </button>
    //       <button className={btnStyle}>
    //         <HeartIcon className="h-5 w-5" />
    //         <p>Liked Songs</p>
    //       </button>
    //       <button className={btnStyle}>
    //         <RssIcon className="h-5 w-5" />
    //         <p>Episodes</p>
    //       </button>

    //       <Separator className="my-4" />

    //       {playlists.map((playlist) => (
    //         <p
    //           key={playlist.id}
    //           onClick={() => setPlaylistId(playlist.id)}
    //           className={btnStyle}
    //         >
    //           {playlist.name}
    //         </p>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Sidebar;
