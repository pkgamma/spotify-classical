import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import { periodOptions } from "@/lib/openopus";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Periods() {
  const router = useRouter();
  const [composers, setComposers] = useState([]);
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

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
        {Object.entries(periodOptions).map(([key, value]) => (
          <Link
            href={`/period/${key}`}
            onClick={() => setCurrPeriod(key)}
            key={key}
          >
            <div className="border rounded-lg md:hover:bg-gray-50 transition ease-in-out ">
              <div className="cursor-pointer select-none flex items-center h-32">
                {/* <div className="flex items-center justify-center h-36 w-28 bg-gray-100">
                  <Image
                  className="flex items-end justify-center w-3/5 h-auto shadow-lg rounded-sm"
                  // src={composer.portrait}
                  alt={composer.name}
                  width={128}
                  height={128}
                />
                </div> */}
                <div className="md:ml-12 mx-6 max-w-md">
                  <h2 className="">{value.title}</h2>
                  <p className="text-sm text-gray-400 mt-2">{value.subtitle}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
