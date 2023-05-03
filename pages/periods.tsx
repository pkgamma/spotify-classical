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

export default function Periods() {
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
    <Layout title="Periods">
      <PageTitle title="Periods" />
      <ul>
        {Object.values(periodOptions).map((period) => (
          <Link
            href={`/period/${period}`}
            onClick={() => setCurrPeriod(period)}
            key={period}
          >
            <Row cover={null} title={period} subtitle="Subtitle" />
          </Link>
        ))}
      </ul>
    </Layout>
  );
}
