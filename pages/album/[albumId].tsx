import {
  currTrackIdState,
  isLoadedState,
  isPlayingState,
} from "@/atoms/states";
import CardSong from "@/components/CardSong";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import useSpotify from "@/hooks/useSpotify";
import { SiReacthookform, SiSpotify } from "@icons-pack/react-simple-icons";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Album() {
  const router = useRouter();
  const { toast } = useToast();
  const spotifyApi = useSpotify();
  const [album, setAlbum] = useState([]);
  const [albumTracks, setAlbumTracks] = useState([]);
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
          setAlbumTracks(data.body.tracks.items);
          setIsLoaded(true);
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

    spotifyApi.setShuffle(false).catch((error) => {
      console.error(error);
    });
  };

  return (
    <Layout title={`${album.name}`}>
      <PageTitle title={`"${album.name}" on Spotify`} />

      <div className=" flex justify-center space-x-6 pb-12">
        <Button onClick={() => playSpotify(album.uri)}>Play Album</Button>
        {album.external_urls && (
          <Link href={album.external_urls.spotify} target="_blank">
            <Button className="bg-[#1DB954]">
              <SiSpotify className="h-4 w-4 mr-2" />
              Open in Spotify
            </Button>
          </Link>
        )}
      </div>

      <SectionTitle text="Tracks" />
      <ScrollArea className="h-96 w-full rounded-md border p-4">
        <div className="grid gap-2">
          {albumTracks.map((track) => (
            <div onClick={() => playSpotify(track.uri)} key={track.id}>
              <CardSong track={track} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Layout>
  );
}
