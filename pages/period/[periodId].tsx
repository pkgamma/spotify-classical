import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import { getComposersByPeriod, periodOptions } from "@/lib/openopus";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Period() {
  const router = useRouter();
  const [composers, setComposers] = useState([]);
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    if (router.isReady) {
      setIsLoaded(false);
      const { periodId } = router.query;
      setCurrPeriod(periodId);
      getComposersByPeriod(periodId)
        .then((data) => {
          setComposers(data.composers);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router]);

  return (
    <Layout title={`${composers[0]?.epoch} Period`}>
      <PageTitle title={`Composers of the ${composers[0]?.epoch} Period`} />
      <ul>
        {composers?.map((composer) => (
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
