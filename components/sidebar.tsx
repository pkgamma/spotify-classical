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
  currPeriodState,
  playlistIdState,
  sidebarClickedBtnState,
} from "@/atoms/states";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import TempPlayer from "./TempPlayer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutIcon } from "@heroicons/react/outline";
import { periodOptions } from "@/lib/openopus";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [sidebarClickedBtn, setSidebarClickedBtn] = useRecoilState(
    sidebarClickedBtnState
  );
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodState);

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
          <h2 className="mb-2 px-2 text-lg font-semibold ">Period</h2>
          <div className="space-y-1">
            <Button
              onClick={() => setCurrPeriod(periodOptions.Medieval)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Medieval
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.Renaissance)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Renaissance
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.Baroque)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Baroque
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.Classical)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Classical
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.EarlyRomantic)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Early Romantic
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.Romantic)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Romantic
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.LateRomantic)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Late Romantic
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.TwentiethCentury)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              20th Century
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.PostWar)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Post-War
            </Button>
            <Button
              onClick={() => setCurrPeriod(periodOptions.TwentyFirstCentury)}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <ListMusic className="mr-2 h-4 w-4" />
              21st Century
            </Button>
          </div>
        </div>

        {/* <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold ">
            Spotify Playlists
          </h2>
          <div className="space-y-1">
            {playlists?.map((playlist) => (
              <Button
                key={playlist.id}
                onClick={() => setPlaylistId(playlist.id)}
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <ListMusic className="mr-2 h-4 w-4" />
                {playlist.name}
              </Button>
            ))}
          </div>
        </div> */}

        <div className="fixed bottom-0 left-0 pl-4 pr-4 pb-4">
          <div className="relative">
            <div className="box-border min-w-0 no-underline text-sm leading-6 rounded-md cursor-pointer flex w-full items-center">
              <div className="flex items-center justify-start p-2">
                <Avatar className="w-6 h-6 block relative">
                  <AvatarImage src={session?.user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="min-w-0 ml-2 whitespace-no-wrap overflow-hidden">
                  {session?.user.name}
                </p>
              </div>
              <LogoutIcon
                onClick={() => signOut()}
                className="w-4 h-4"
              ></LogoutIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
