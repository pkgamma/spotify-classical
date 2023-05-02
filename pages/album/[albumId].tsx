import {
  currTrackIdState,
  isLoadedState,
  isPlayingState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import useSpotify from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export default function Album() {
  const router = useRouter();
  const { toast } = useToast();
  const spotifyApi = useSpotify();
  const [album, setAlbum] = useState([]);
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
          if (error.message.includes("No token provided")) {
            toast({
              variant: "destructive",
              title: "Please log in to Spotify to view this page.",
              action: (
                <ToastAction onClick={() => router.back()} altText="Back">
                  Back
                </ToastAction>
              ),
            });
          } else {
            toast({
              variant: "destructive",
              title: error.message,
            });
          }
          console.error(error);
        });
    }
  }, [router]);

  const playSong = (uri) => {
    setCurrentTrackId(uri);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [uri],
      })
      .catch((error) => {
        if (error.message.includes("NO_ACTIVE_DEVICE")) {
          toast({
            variant: "destructive",
            title: "Please open Spotify on a device for playback.",
          });
        } else {
          toast({
            variant: "destructive",
            title: error.message,
          });
        }
        console.error(error);
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
