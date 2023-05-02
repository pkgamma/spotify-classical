import {
  currComposerIdState,
  currWorkIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import { getWorksByComposerID } from "@/lib/openopus";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Works() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [works, setWorks] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    setIsLoaded(false);
    const { composerId } = router.query;
    getWorksByComposerID(parseInt(composerId))
      .then((data) => {
        setWorks(data);
        setIsLoaded(true);
        console.log(works);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  return (
    <Layout title={`Works of Composer ${works?.composer?.name}`}>
      <PageTitle title={`Works of Composer ${works?.composer?.name}`} />
      <ul>
        {works?.works &&
          works?.works.map((work) => (
            <Link
              href={`/work/${work.id}`}
              onClick={() => setCurrWorkId(work.id)}
              key={work.id}
            >
              <Row cover={null} title={work.title} subtitle={"Subtitle"} />
            </Link>
          ))}
      </ul>
    </Layout>
  );
}
