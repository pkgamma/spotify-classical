import { useEffect, useState } from "react";
import useOpenOpus from "@/hooks/useOpenOpus";
import { useRecoilState } from "recoil";
import { currComposerIdState, currWorkIdState } from "@/atoms/states";
import { getWorksByComposerID, listOptions } from "@/lib/openopus";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/LeftSidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Row from "@/components/Row";
import PageTitle from "@/components/PageTitle";
import Layout from "@/components/Layout";

export default function Works() {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [works, setWorks] = useState([]);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const router = useRouter();

  useEffect(() => {
    const { composerId } = router.query;
    getWorksByComposerID(parseInt(composerId))
      .then((data) => {
        setWorks(data);
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
