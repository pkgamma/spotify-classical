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
import { useRecoilState } from "recoil";
import {
  currComposerState,
  playlistIdState,
  sidebarClickedBtnState,
} from "@/atoms/states";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import TempPlayer from "./TempPlayer";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [sidebarClickedBtn, setSidebarClickedBtn] = useRecoilState(
    sidebarClickedBtnState
  );
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);

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

  return (
    <div className="pb-12 h-screen overflow-scroll border-r">
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
              <Button
                onClick={() => signOut()}
                variant="destructive"
                size="sm"
                className="w-full justify-start"
              >
                <Radio className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </ScrollArea>
          {/* NAME AND PHOTO */}
          <div>
            <h2>{session?.user.name}</h2>
            {session?.user.image && (
              <Image
                src={session?.user.image}
                alt={session?.user.name}
                width={70}
                height={70}
              />
            )}
          </div>
          {/* player */}
          <TempPlayer />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
