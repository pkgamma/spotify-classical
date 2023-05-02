import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerState,
  currWorkIdState,
  sidebarClickedBtnState,
} from "@/atoms/states";
import { getWorksByComposerID, listOptions } from "@/lib/openopus";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/LeftSidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRecordingByWorkID } from "@/lib/concertmaster";

export default function Recordings() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);
  const [works, setWorks] = useState([]);
  const [recs, setRecs] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const router = useRouter();

  useEffect(() => {
    const { workId } = router.query;
    getRecordingByWorkID(parseInt(workId))
      .then((data) => {
        setRecs(data);
      })
      .catch((error) => {
        console.log("at file TempRecs.tsx");
        console.error(error);
      });
  }, [router]);

  return (
    <div>
      <LeftSidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-56">
        <h1 className="text-2xl font-bold">
          Recordings of {recs?.work?.title}
        </h1>
        <Button onClick={() => router.back()}>back</Button>
        <ul>
          {recs.recordings &&
            recs?.recordings.map((rec) => (
              <li key={rec.spotify_albumid}>
                <Link href={`/album/${rec.spotify_albumid}`}>
                  {rec.album_name}
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
