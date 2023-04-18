import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const songInfo = useSongInfo();

  return (
    <div>
      <h1>Player</h1>
      <Image src={songInfo?.album?.images?.[0].url} width={200} height={200} />
    </div>
  );
}

export default Player;
