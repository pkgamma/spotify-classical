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
import CardPeriod from "@/components/CardPeriod";
import SectionTitle from "@/components/SectionTitle";

export default function Periods() {
  const router = useRouter();
  const [composers, setComposers] = useState([]);
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  return (
    <Layout title="Periods">
      <div className="flex flex-col">
        {/* <div className="h-96 w-full bg-slate-100 border-b">
          <div className="flex flex-col justify-center h-96 md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full bg-slate-200 ">
            <h1 className="text-4xl font-bold text-slate-900 ">
              Composer Philip
            </h1>
          </div>
        </div> */}
        <div className="md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full px-4 pb-20 ">
          {/* actual inner content starts */}
          <PageTitle title="Explore Time Periods" />
          <SectionTitle text="Periods" />
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(periodOptions).map(([key, value]) => (
              <CardPeriod key={key} periodKey={key} periodVal={value} />
            ))}
          </div>

          {/* actual inner content ends */}
        </div>
      </div>
    </Layout>
  );
}
