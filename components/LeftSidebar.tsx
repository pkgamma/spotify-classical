import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currPeriodIdState } from "@/atoms/states";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutIcon } from "@heroicons/react/outline";
import { periodOptions } from "@/lib/openopus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/router";

export default function LeftSidebar({ className }) {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);

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
    <div className={cn("", className)}>
      <div className="px-4">
        <h2 className="text-md font-bold h-20 flex items-center pl-4 mb-2">
          <Link href="/">SymphonyNow</Link>
        </h2>
        <div className="space-y-1">
          {Object.entries(periodOptions).map(([key, value]) => (
            <Link
              onClick={() => setCurrPeriod(value)}
              href={`/period/${value}`}
              key={key}
            >
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                {value}
              </Button>
            </Link>
          ))}
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
                
                className="w-full justify-start font-normal"
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
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <p className="min-w-0 ml-2 whitespace-no-wrap overflow-hidden">
                  {session ? session?.user.name : "Guest"}
                </p>
              </div>
              {session ? (
                <LogoutIcon
                  onClick={() => signOut()}
                  className="w-4 h-4"
                ></LogoutIcon>
              ) : (
                <LogInIcon
                  onClick={() => router.push("/login")}
                  className="w-4 h-4"
                ></LogInIcon>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
