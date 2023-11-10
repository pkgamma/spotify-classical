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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginButtons from "@/components/LoginButtons";

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
    <div
      className={cn(
        "bg-slate-50 md:w-60 md:block hidden border-r fixed left-0 top-0 bottom-0 overflow-auto",
        className
      )}
    >
      <div className="px-4">
        <h2 className="text-md font-semibold font-serif h-20 flex items-center pl-4 mb-2">
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
          {session ? (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut()}
            >
              <div className="flex items-center justify-start -ml-2">
                <Avatar className="w-8 h-8 block relative">
                  <AvatarImage src={session.user.image} />
                </Avatar>
                <p className="mx-3">{session ? session.user.name : "Guest"}</p>
              </div>
              <LogOutIcon className="w-4 h-4" />
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Use your Spotify account to login, this enables the ability
                    to see recordings of a piece of work.
                  </DialogDescription>
                </DialogHeader>
                <LoginButtons></LoginButtons>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {/* ======== */}
      </div>
    </div>
  );
}
