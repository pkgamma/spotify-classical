import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import {
  currComposerIdState,
  currPeriodIdState,
  currWorkIdState,
  isLoadedState,
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
import Layout from "@/components/Layout";

export default function Period() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [works, setWorks] = useState([]);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [composers1, setComposers1] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(false);
    const { periodId } = router.query;
    setCurrPeriod(periodId);
    getComposersByPeriod(periodId)
      .then((data) => {
        setComposers1(data);
        setIsLoaded(true);
        console.log(composers1);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  return (
    <Layout title={`Composers of the ${currPeriod} Period`}>
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
    </Layout>
  );
}
