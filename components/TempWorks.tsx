import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerState,
  currWorkIdState,
  sidebarClickedBtnState,
} from "@/atoms/states";
import { getWorksByComposerID, listOptions } from "@/lib/openopus";

function TempWorks() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);
  const [works, setWorks] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);

  useEffect(() => {
    getWorksByComposerID(parseInt(currComposer))
      .then((data) => {
        setWorks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currComposer]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Works</h1>
      <ul>
        {works?.works &&
          works?.works.map((work) => (
            <li onClick={() => setCurrWorkId(work.id)} key={work.id}>
              {" "}
              {work.title}{" "}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TempWorks;
