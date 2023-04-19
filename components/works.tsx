import { useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import { currComposerState, sidebarClickedBtnState } from "@/atoms/states";
import { getPopularComposers, getWorksById } from "@/lib/openopus";

function Works() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);

  // const { data, error, isLoading } = getPopularComposers();

  const { data, error, isLoading } = getWorksById(currComposer);

  return (
    <div>
      <h1 className="text-2xl font-bold">Works</h1>
      <ul>
        {data?.works &&
          data?.works.map((composer) => (
            <li key={composer.id}>{composer.title}</li>
          ))}
      </ul>
    </div>
  );
}

export default Works;
