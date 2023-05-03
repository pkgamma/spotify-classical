import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import { getComposersByPeriod, periodOptions } from "@/lib/openopus";
import { ArrowRightIcon } from "lucide-react";
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
      <PageTitle title="Explore Time Periods" />

      <div className="flex items-end justify-between mb-6">
        <div className="font-medium">Periods</div>
        <p className="text-sm text-gray-500">
          More
          <ArrowRightIcon className="inline-block w-4 h-4 ml-0.5 mb-0.5" />
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(periodOptions).map((period) => (
          <Link
            href={`/period/${period}`}
            onClick={() => setCurrPeriod(period)}
            key={period}
          >
            <div className="border rounded-lg hover:bg-gray-50 transition ease-in-out ">
              <div className="cursor-pointer select-none flex items-center">
                <div className="flex items-center justify-center h-36 w-28 bg-gray-100">
                  {/* <Image
                  className="flex items-end justify-center w-3/5 h-auto shadow-lg rounded-sm"
                  // src={composer.portrait}
                  alt={composer.name}
                  width={128}
                  height={128}
                /> */}
                </div>
                <div className="px-6 ">
                  <h2 className="">{period}</h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
    // <Layout title="Periods">
    //   <PageTitle title="Periods" />
    //   <ul>
    //     {Object.values(periodOptions).map((period) => (
    //       <Link
    //         href={`/period/${period}`}
    //         onClick={() => setCurrPeriod(period)}
    //         key={period}
    //       >
    //         <Row cover={null} title={period} subtitle="Subtitle" />
    //       </Link>
    //     ))}
    //   </ul>
    // </Layout>
  );
}
