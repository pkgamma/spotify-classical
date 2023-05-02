import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerIdState,
  currWorkIdState,
  currTrackIdState,
  isPlayingState,
} from "@/atoms/states";
import { getWorksByComposerID, listOptions } from "@/lib/openopus";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/LeftSidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRecordingByWorkID } from "@/lib/concertmaster";
import useSpotify from "@/hooks/useSpotify";
import Row from "@/components/Row";
import PageTitle from "@/components/PageTitle";

export default function Album() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [works, setWorks] = useState([]);
  const [recs, setRecs] = useState([]);
  const [album, setAlbum] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  useEffect(() => {
    if (router.isReady) {
      const { albumId } = router.query;
      spotifyApi
        .getAlbum(albumId)
        .then(function (data) {
          console.log(data.body);
          setAlbum(data.body);
          // console.log(album);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [router]);

  const playSong = (uri) => {
    setCurrentTrackId(uri);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [uri],
    });
  };

  return (
    <div>
      <LeftSidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-56">
        <PageTitle title={`Spotify Album "${album.name}"`} />
        <ul>
          {album?.tracks?.items.map((item) => (
            <div onClick={() => playSong(item.uri)} key={item.id}>
              <Row cover={null} title={item.name} subtitle={"Subtitle"} />
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
