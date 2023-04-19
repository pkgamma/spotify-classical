import { useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import { currComposerState, sidebarClickedBtnState } from "@/atoms/states";
import { getPopularComposers } from "@/lib/openopus";

function Composers() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);

  const { data, error, isLoading } = getPopularComposers();

  return (
    <div>
      <h1 className="text-2xl font-bold">Popular Composers</h1>
      <ul>
        {data?.composers &&
          data?.composers.map((composer) => (
            <li onClick={() => setCurrComposer(composer.id)} key={composer.id}>
              {composer.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Composers;
