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

export default function Recordings({ recs, recTitle }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  const verifiedRecordings = [];
  const allOtherRecordings = [];

  useEffect(() => {
    setIsLoaded(true);
  }, [recs, setIsLoaded]);

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

export async function getServerSideProps(context) {
  const { workId } = context.query;
  const recs = await getRecordingByWorkID(parseInt(workId));
  const recTitle = recs.work.title;
  const recordings = recs.recordings || null;
  return {
    props: {
      recs: recordings,
      recTitle,
    },
  };
}
