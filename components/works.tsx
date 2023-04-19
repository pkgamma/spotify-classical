import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import { currComposerState, sidebarClickedBtnState } from "@/atoms/states";
import { getPopularComposers, getWorksById } from "@/lib/openopus";

function Works() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);
  const [composers1, setComposers1] = useState([]);

  useEffect(() => {
    getWorksById(currComposer)
      .then((data) => {
        setComposers1(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currComposer]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Works</h1>
      <ul>
        {composers1?.works &&
          composers1?.works.map((composer) => (
            <li key={composer.id}>{composer.title}</li>
          ))}
      </ul>
    </div>
  );
}

export default Works;
