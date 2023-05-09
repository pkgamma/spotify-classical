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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";

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
          setAlbum(data.body);
          setIsLoaded(true);
          // console.log(album);
        })
        .catch(function (error) {
          if (error.message.includes("No token provided")) {
            toast({
              variant: "destructive",
              title: "Please log in to Spotify.",
              action: (
                <ToastAction
                  onClick={() => router.push("/login")}
                  altText="Login"
                >
                  Login
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

  const playSpotify = (uri) => {
    setCurrentTrackId(uri);
    setIsPlaying(true);

    const param = uri.includes("track")
      ? { uris: [uri] }
      : { context_uri: uri };

    spotifyApi.play(param).catch((error) => {
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

    spotifyApi.setShuffle(false);
  };

  return (
    <Layout title={`${album.name}`}>
      <PageTitle title={`"${album.name}" on Spotify`} />
      <Button onClick={() => playSpotify(album.uri)}>Play Album</Button>

      {album?.external_urls && (
        <Link href={album.external_urls.spotify} target="_blank">
          <Button>Open in Spotify</Button>
        </Link>
      )}

      <SectionTitle text="Songs" />
      <ul>
        {album?.tracks?.items.map((item) => (
          <div onClick={() => playSpotify(item.uri)} key={item.id}>
            <Row cover={null} title={item.name} subtitle={"Subtitle"} />
          </div>
        ))}
      </ul>
    </Layout>
  );
}
