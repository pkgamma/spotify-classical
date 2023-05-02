import { currAlbumIdState, isLoadedState } from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import { getRecordingByWorkID } from "@/lib/concertmaster";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Recordings() {
  const router = useRouter();
  const [recs, setRecs] = useState([]);
  const [currAlbum, setCurrAlbum] = useRecoilState(currAlbumIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    if (router.isReady) {
      setIsLoaded(false);
      const { workId } = router.query;
      getRecordingByWorkID(parseInt(workId))
        .then((data) => {
          setRecs(data);
          setIsLoaded(true);
          console.log(data);
        })
        .catch((error) => {
          console.log("at file TempRecs.tsx");
          console.error(error);
        });
    }
  }, [router]);

  return (
    <Layout>
      <PageTitle title={`Recordings of ${recs?.work?.title}`} />
      <ul>
        {recs?.work?.title &&
          (recs?.recordings?.length > 0 ? (
            recs?.recordings?.map((rec) => (
              <Link
                href={`/album/${rec.spotify_albumid}`}
                onClick={() => setCurrAlbum(rec.spotify_albumid)}
                key={rec.spotify_albumid}
              >
                <Row
                  cover={rec.cover}
                  title={rec.album_name}
                  subtitle={rec.year}
                />
              </Link>
            ))
          ) : (
            <Row cover={null} title={"No recordings found"} subtitle={null} />
          ))}
      </ul>
    </Layout>
  );
}
