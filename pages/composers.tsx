import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import CardComposer from "@/components/CardComposer";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import { getComposersPopular } from "@/lib/openopus";
import { motion } from "framer-motion";
import Head from "next/head";
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
    // setIsLoaded(false);
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
    <>
      <Head>
        <title>{isLoaded ? "Composers" : "Loading..."}</title>
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

            <PageTitle title="Popular Composers" />
            <SectionTitle text="Popular" />
            <div className="grid gap-4 md:grid-cols-3">
              {composers?.map((composer) => (
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
