import { currPeriodIdState, isLoadedState } from "@/atoms/states";
import LoginButtons from "@/components/LoginButtons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useSpotify from "@/hooks/useSpotify";
import { cn } from "@/lib/utils";
import { HistoryIcon, Inbox, SearchIcon, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const iconClassName = "mr-2 h-4 w-4";

export default function NavbarDesktop() {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  const Option = ({
    link = "",
    title = "",
    label = "",
    variant = "ghost",
    children,
    onClick = () => {},
  }) => {
    return (
      <Link
        onClick={onClick}
        href={link}
        className={cn(buttonVariants({ variant: variant }), "justify-start")}
      >
        {children}
        {title}
        {label && (
          <span className="ml-auto text-muted-foreground">{label}</span>
        )}
      </Link>
    );
  };

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
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="flex h-[52px] items-center justify-center px-2 font-serif font-bold">
        SymphonyNow
      </div>

      <Separator />

      <div className="flex flex-col gap-4 py-2">
        <nav className="grid gap-1 px-2">
          <Option link="/" title="Home">
            <Inbox className={iconClassName} />
          </Option>
          <Option link="/search" title="Search">
            <SearchIcon className={iconClassName} />
          </Option>
        </nav>
      </div>

      <Separator />

      <div className="flex grow flex-col gap-4 py-2">
        <nav className="grid gap-1 px-2">
          <Option link="/periods" title="Periods" label="10">
            <HistoryIcon className={iconClassName} />
          </Option>
          <Option link="/composers" title="Composers">
            <UserIcon className={iconClassName} />
          </Option>
        </nav>
      </div>

      <Separator />

      <div className="flex flex-col gap-4 py-2">
        <nav className="grid gap-1 px-2">
          {session ? (
            <Option
              link=""
              onClick={() => signOut()}
              title={session ? session.user?.name : "Guest"}
              label="Logout"
            >
              {/* <UserIcon className={iconClassName} /> */}
              <Avatar className={cn(iconClassName, "h-6 w-6")}>
                <AvatarImage src={session.user.image} />
              </Avatar>
            </Option>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Option title="Login">
                  <UserIcon className={iconClassName} />
                </Option>
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
        </nav>
      </div>
    </div>
  );
}
