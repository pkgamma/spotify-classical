import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currComposerState, sidebarClickedBtnState } from "@/atoms/states";
import { getPopularComposers } from "@/lib/openopus";

function Composers() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);
  const [composers1, setComposers1] = useState([]);

  useEffect(() => {
    getPopularComposers()
      .then((data) => {
        setComposers1(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setComposers1]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Popular Composers</h1>
      <ul>
        {composers1?.composers &&
          composers1?.composers.map((composer) => (
            <li onClick={() => setCurrComposer(composer.id)} key={composer.id}>
              {composer.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Composers;
