import { currPeriodIdState } from "@/atoms/states";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSpotify from "@/hooks/useSpotify";
import { cn } from "@/lib/utils";
import {
  DnaIcon,
  GraduationCapIcon,
  HistoryIcon,
  HomeIcon,
  ListMusic,
  LogInIcon,
  LogOutIcon,
  RadioIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button";

export const Option = ({ link, title, children }) => {
  return (
    <Link href={link}>
      <Button variant="ghost" className="w-full justify-start my-0.5">
        {children}
        {title}
      </Button>
    </Link>
  );
};

export const iconClassName = "w-4 h-4 mr-2";

export default function NavbarDesktop({ className }) {
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
        {/* ==== nav bar top ==== */}
        <div className="">
          <Option link="/" title="Home">
            <HomeIcon className={iconClassName} />
          </Option>
          {/* <Option link="/learn" title="Learn">
            <GraduationCapIcon className={iconClassName} />
          </Option> */}
          <Option link="/search" title="Search">
            <SearchIcon className={iconClassName} />
          </Option>

          <h2 className="mb-4 ml-4 mt-10 font-semibold text-gray-400 uppercase text-xs">
            Browse
          </h2>
          {/* <Option link="/radio" title="Radio">
            <RadioIcon className={iconClassName} />
          </Option> */}
          <Option link="/periods" title="Periods">
            <HistoryIcon className={iconClassName} />
          </Option>
          <Option link="/composers" title="Composers">
            <UserIcon className={iconClassName} />
          </Option>
          {/* <Option link="/genres" title="Genres">
            <DnaIcon className={iconClassName} />
          </Option> */}
        </div>
        {/* ==== nav bar btm ==== */}
        <div className="fixed bottom-0 left-0 px-4 pb-4">
          <Button variant="ghost" className="w-full justify-start">
            <div className="flex items-center justify-start -ml-2">
              <Avatar className="w-8 h-8 block relative">
                <AvatarImage src={session?.user.image} />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <p className="mx-3">{session ? session?.user.name : "Guest"}</p>
            </div>
            {session ? (
              <LogOutIcon onClick={() => signOut()} className="w-4 h-4" />
            ) : (
              <LogInIcon
                onClick={() => router.push("/login")}
                className="w-4 h-4"
              />
            )}
          </Button>
        </div>
        {/* ======== */}
      </div>
    </div>
  );
}
