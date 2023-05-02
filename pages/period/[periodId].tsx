import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerState,
  currPeriodState,
  currWorkIdState,
  sidebarClickedBtnState,
} from "@/atoms/states";
import {
  getComposersByPeriod,
  getWorksByComposerID,
  listOptions,
} from "@/lib/openopus";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/LeftSidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Period() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerState);
  const [works, setWorks] = useState([]);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodState);
  const [composers1, setComposers1] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const router = useRouter();

  useEffect(() => {
    const { periodId } = router.query;
    setCurrPeriod(periodId);
    getComposersByPeriod(periodId)
      .then((data) => {
        setComposers1(data);
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
          Composers of the {currPeriod} Period
        </h1>
        <Button onClick={() => router.back()}>back</Button>
        <ul>
          {composers1?.composers &&
            composers1?.composers.map((composer) => (
              <li
                onClick={() => setCurrComposer(composer.id)}
                key={composer.id}
              >
                <Link href={`/composer/${composer.id}`}>{composer.name}</Link>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
