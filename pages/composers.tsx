import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import {
  getComposersByPeriod,
  getComposersPopular,
  periodOptions,
} from "@/lib/openopus";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Composers() {
  const router = useRouter();
  const [composers, setComposers] = useState([]);
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    setIsLoaded(false);
    getComposersPopular()
      .then((data) => {
        setComposers(data.composers);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Layout title="Popular Composers">
      <PageTitle title="Popular Composers" />
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
