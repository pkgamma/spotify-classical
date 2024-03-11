import Link from "next/link";
import Image from "next/image";
import {
  currAlbumIdState,
  currComposerIdState,
  isLoadedState,
} from "@/atoms/states";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export default function CardAlbum(props) {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currAlbum, setCurrAlbum] = useRecoilState(currAlbumIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
  const { album } = props;
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      setCurrAlbum(album.spotify_albumid), setIsLoaded(false);
      router.push(`/album/${album.spotify_albumid}`);
    } else {
      toast({
        variant: "destructive",
        title: "Please log in to Spotify.",
      });
    }
  };

  return (
    <div onClick={handleClick}>
      <div className="rounded-lg border transition ease-in-out md:hover:bg-gray-50 ">
        <div className="flex cursor-pointer select-none items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center bg-gray-100">
            {album?.cover && (
              <Image
                className="flex h-auto w-3/5 items-end justify-center rounded-sm shadow-lg"
                src={album.cover}
                alt={album?.album_name || "album cover"}
                width={128}
                height={128}
              />
            )}
          </div>
          <div className="max-w-sm px-6">
            <h2 className="line-clamp-2">{album.album_name}</h2>
            <p className="mt-0.5 text-sm text-gray-400">{album.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
