import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currAlbumIdState,
  currComposerIdState,
  currWorkIdState,
} from "@/atoms/states";
import { getWorksByComposerID, listOptions } from "@/lib/openopus";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/LeftSidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRecordingByWorkID } from "@/lib/concertmaster";
import Image from "next/image";
import Row from "@/components/Row";
import PageTitle from "@/components/PageTitle";
import Layout from "@/components/Layout";

export default function Recordings() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [works, setWorks] = useState([]);
  const [recs, setRecs] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const [currAlbum, setCurrAlbum] = useRecoilState(currAlbumIdState);
  const router = useRouter();

  useEffect(() => {
    const { workId } = router.query;
    getRecordingByWorkID(parseInt(workId))
      .then((data) => {
        setRecs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("at file TempRecs.tsx");
        console.error(error);
      });
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
