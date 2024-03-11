import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import CardComposer from "@/components/CardComposer";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import SectionTitle from "@/components/SectionTitle";
import {
  getComposersByPeriod,
  getComposersEssential,
  getComposersPopular,
  periodOptions,
} from "@/lib/openopus";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { motion } from "framer-motion";

export default function Period({ periodId, composers, popularComposers }) {
  const router = useRouter();
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    setCurrPeriod(periodId);
    setIsLoaded(true);
  }, [periodId, composers, popularComposers]);

  // going through the composers array and checking if the composer is in the popularComposers array
  // if it is, then push it to the popularArray
  // if it isn't, then push it to the nonPopularArray

  const popularArray = [];
  const nonPopularArray = [];

  composers.map((composer) => {
    const popularComposer = popularComposers.find(
      (popularComposer) => popularComposer.id === composer.id,
    );
    if (popularComposer) {
      popularArray.push(composer);
    } else {
      nonPopularArray.push(composer);
    }
  });

  return (
    <>
      <Head>
        <title>{isLoaded ? `${composers[0]?.epoch} Period` : "Loading"}</title>
      </Head>

      <motion.div
        className="min-h-screen"
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 6, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="flex flex-col">
          {/* <div className="h-96 w-full bg-slate-100 border-b">
          <div className="flex flex-col justify-center h-96 md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full bg-slate-200 ">
            <h1 className="text-4xl font-bold text-slate-900 ">
              Composer Philip
            </h1>
          </div>
        </div> */}
          <div className="w-full px-4 pb-20 md:mx-auto md:mb-4 md:mt-0 md:max-w-7xl ">
            {/* actual inner content starts */}

            <PageTitle
              title={`Composers of the ${composers[0]?.epoch} Period`}
            />

            {popularArray.length > 0 && (
              <div>
                <SectionTitle text="Popular" />
                <div className="mb-12 grid gap-4 md:grid-cols-3">
                  {popularArray?.map((composer) => (
                    <CardComposer key={composer.id} composer={composer} />
                  ))}
                </div>
              </div>
            )}

            <SectionTitle text="All" />
            <div className="grid gap-4 md:grid-cols-3">
              {nonPopularArray?.map((composer) => (
                <CardComposer key={composer.id} composer={composer} />
              ))}
            </div>
            {/* actual inner content ends */}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { periodId } = context.query;
  const composers = await getComposersByPeriod(periodId);
  const popularComposers = await getComposersPopular();
  return {
    props: {
      periodId,
      composers: composers.composers,
      popularComposers: popularComposers.composers,
    },
  };
}
