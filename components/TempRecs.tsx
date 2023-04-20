import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerState,
  currWorkIdState,
  sidebarClickedBtnState,
} from "@/atoms/states";
import { getWorksByComposerID, listOptions } from "@/lib/openopus";
import { getRecordingByWorkID } from "@/lib/concertmaster";

function TempRecs() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);
  const [recs, setRecs] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);

  useEffect(() => {
    console.log("Trying to request :" + currWorkId);
    getRecordingByWorkID(parseInt(currWorkId))
      .then((data) => {
        setRecs(data);
      })
      .catch((error) => {
        console.log("at file TempRecs.tsx");
        console.error(error);
      });
  }, [currComposer, currWorkId]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Recordings</h1>
      <h1>Current work ID: {currWorkId}</h1>
      <ul>
        {recs.recordings &&
          recs?.recordings.map((rec) => (
            <li key={rec.spotify_albumid}>{rec.album_name}</li>
          ))}
      </ul>
    </div>
  );
}

export default TempRecs;
