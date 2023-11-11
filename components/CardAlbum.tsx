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
      <div className="border rounded-lg md:hover:bg-gray-50 transition ease-in-out ">
        <div className="cursor-pointer select-none flex items-center">
          <div className="flex items-center justify-center h-28 w-28 bg-gray-100 shrink-0">
            {album?.cover && (
              <Image
                className="flex items-end justify-center w-3/5 h-auto shadow-lg rounded-sm"
                src={album.cover}
                alt={album?.album_name || "album cover"}
                width={128}
                height={128}
              />
            )}
          </div>
          <div className="px-6 max-w-sm">
            <h2 className="line-clamp-2">{album.album_name}</h2>
            <p className="text-gray-400 text-sm mt-0.5">{album.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
