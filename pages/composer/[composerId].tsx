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

export default function Works() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);
  const [works, setWorks] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const router = useRouter();

  useEffect(() => {
    const { composerId } = router.query;
    getWorksByComposerID(parseInt(composerId))
      .then((data) => {
        // console.log(data);
        setWorks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  return (
    <div>
      <LeftSidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-56">
        <h1 className="text-2xl font-bold">
          Works of Composer {works?.composer?.name}
        </h1>
        <Button onClick={() => router.back()}>back</Button>
        <ul>
          {works?.works &&
            works?.works.map((work) => (
              <li onClick={() => setCurrWorkId(work.id)} key={work.id}>
                <Link href={`/work/${work.id}`}>{work.title}</Link>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
