import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import CardComposer from "@/components/CardComposer";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import { getComposersPopular } from "@/lib/openopus";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
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
        console.log(data);
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

      <div className="flex items-end justify-between mb-6">
        <div className="font-medium">Popular Composers</div>
        <p className="text-sm text-gray-500">
          More
          <ArrowRightIcon className="inline-block w-4 h-4 ml-0.5 mb-0.5" />
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {composers?.map((composer) => (
          <CardComposer key={composer.id} composer={composer} />
        ))}
      </div>
    </Layout>
  );
}
