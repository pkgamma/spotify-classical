import {
  currComposerIdState,
  currWorkIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import {
  getWorksByComposerID,
  getWorksByComposerIDPopular,
} from "@/lib/openopus";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CardWork from "@/components/CardWork";
import SectionTitle from "@/components/SectionTitle";

export default function Works() {
  const router = useRouter();
  const [works, setWorks] = useState([]);
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    if (router.isReady) {
      setIsLoaded(false);
      const { composerId } = router.query;
      getWorksByComposerIDPopular(parseInt(composerId))
        .then((data) => {
          setWorks(data);
          setIsLoaded(true);
          console.log(works);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router]);

  return (
    <Layout title={`${works?.composer?.name}`}>
      <PageTitle title={`Works of Composer ${works?.composer?.name}`} />

      <SectionTitle text="Popular" />

      <div className="grid gap-4">
        {works?.works &&
          works?.works.map((work) => <CardWork key={work.id} work={work} />)}
      </div>
    </Layout>
  );
}
