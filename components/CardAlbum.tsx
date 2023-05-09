import Link from "next/link";
import Image from "next/image";
import { currAlbumIdState, currComposerIdState } from "@/atoms/states";
import { useRecoilState } from "recoil";

export default function CardAlbum(props) {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currAlbum, setCurrAlbum] = useRecoilState(currAlbumIdState);
  const { album } = props;

  return (
    <Link
      href={`/album/${album.spotify_albumid}`}
      onClick={() => setCurrAlbum(album.spotify_albumid)}
    >
      <div className="border rounded-lg md:hover:bg-gray-50 transition ease-in-out ">
        <div className="cursor-pointer select-none flex items-center">
          <div className="flex items-center justify-center h-28 w-28 bg-gray-100">
            <Image
              className="flex items-end justify-center w-3/5 h-auto shadow-lg rounded-sm"
              src={album.cover}
              alt={album.album_name}
              width={128}
              height={128}
            />
          </div>
          <div className="px-6 max-w-md">
            <h2 className="">{album.album_name}</h2>
            <p className="text-gray-400 text-sm mt-0.5">{album.year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
