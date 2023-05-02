import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerIdState,
  currWorkIdState,
  currTrackIdState,
  isPlayingState,
  isLoadedState,
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
import Layout from "@/components/Layout";

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
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    if (router.isReady) {
      setIsLoaded(false);
      const { albumId } = router.query;
      spotifyApi
        .getAlbum(albumId)
        .then(function (data) {
          console.log(data.body);
          setAlbum(data.body);
          setIsLoaded(true);
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
    <Layout title={`Spotify Album "${album.name}"`}>
      <PageTitle title={`Spotify Album "${album.name}"`} />
      <ul>
        {album?.tracks?.items.map((item) => (
          <div onClick={() => playSong(item.uri)} key={item.id}>
            <Row cover={null} title={item.name} subtitle={"Subtitle"} />
          </div>
        ))}
      </ul>
    </Layout>
  );
}
