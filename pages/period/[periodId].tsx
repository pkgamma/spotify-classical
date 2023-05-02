import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerIdState,
  currPeriodIdState,
  currWorkIdState,
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
import Row from "@/components/Row";
import PageTitle from "@/components/PageTitle";

export default function Period() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [works, setWorks] = useState([]);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [composers1, setComposers1] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const router = useRouter();

  useEffect(() => {
    const { periodId } = router.query;
    setCurrPeriod(periodId);
    getComposersByPeriod(periodId)
      .then((data) => {
        setComposers1(data);
        console.log(composers1);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  return (
    <div>
      <LeftSidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-56">
        <PageTitle title={`Composers of the ${currPeriod} Period`} />
        <ul>
          {composers1?.composers &&
            composers1?.composers.map((composer) => (
              <Link
                href={`/composer/${composer.id}`}
                onClick={() => setCurrComposer(composer.id)}
                key={composer.id}
              >
                <Row
                  cover={composer.portrait}
                  title={composer.name}
                  subtitle={composer.complete_name}
                />
              </Link>
            ))}
        </ul>
      </main>
    </div>
  );
}
