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
          <CardPeriod key={key} periodKey={key} periodVal={value} />
        ))}
      </div>
    </Layout>
  );
}
