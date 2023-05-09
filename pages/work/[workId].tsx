import { currAlbumIdState, isLoadedState } from "@/atoms/states";
import CardAlbum from "@/components/CardAlbum";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import SectionTitle from "@/components/SectionTitle";
import { getRecordingByWorkID } from "@/lib/concertmaster";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Recordings() {
  const router = useRouter();
  const [recs, setRecs] = useState([]);
  const [recTitle, setRecTitle] = useState([]);
  const [currAlbum, setCurrAlbum] = useRecoilState(currAlbumIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    if (router.isReady) {
      setIsLoaded(false);
      const { workId } = router.query;
      getRecordingByWorkID(parseInt(workId))
        .then((data) => {
          setRecs(data.recordings);
          setRecTitle(data.work.title);
          setIsLoaded(true);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router]);

  const verifiedRecordings = [];
  const allOtherRecordings = [];

  console.log(recs);

  recs?.map((recording) => {
    // added this check to make sure that the recording has an album name
    // for some reason, open opus sometimes give recordings without album names
    if (recording.album_name != null) {
      if (recording.verified === "true") {
        verifiedRecordings.push(recording);
      } else {
        allOtherRecordings.push(recording);
      }
    }
  });

  return (
    <Layout title={`${recTitle}`}>
      <PageTitle title={`Recordings of ${recTitle}`} />

      {!recs && (
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-lg ">Nothing Found</h1>
        </div>
      )}

      {verifiedRecordings?.length > 0 && (
        <div>
          <SectionTitle text="Verified Recordings" />
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {verifiedRecordings.map((album) => (
              <CardAlbum key={album.spotify_albumid} album={album} />
            ))}
          </div>
        </div>
      )}

      {allOtherRecordings?.length > 0 && (
        <div>
          <SectionTitle text="All Recordings" />
          <div className="grid md:grid-cols-2 gap-4">
            {allOtherRecordings.map((album) => (
              <CardAlbum key={album.spotify_albumid} album={album} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
