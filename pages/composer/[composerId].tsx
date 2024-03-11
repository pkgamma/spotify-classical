import { isLoadedState } from "@/atoms/states";
import CardWork from "@/components/CardWork";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getWorksByComposerID } from "@/lib/openopus";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { motion } from "framer-motion";

export default function Works({ data, works, composer }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    setIsLoaded(true);
    console.log(data);
  }, [works, composer]);

  const worksPopular = [];
  const worksChamber = [];
  const worksKeyboard = [];
  const worksOrchestral = [];
  const worksStage = [];
  const worksVocal = [];

  works?.map((work) => {
    if (work.popular == "1") {
      worksPopular.push(work);
    }
    if (work.genre == "Chamber") {
      worksChamber.push(work);
    }
    if (work.genre == "Keyboard") {
      worksKeyboard.push(work);
    }
    if (work.genre == "Orchestral") {
      worksOrchestral.push(work);
    }
    if (work.genre == "Stage") {
      worksStage.push(work);
    }
    if (work.genre == "Vocal") {
      worksVocal.push(work);
    }
  });

  return (
    <>
      <Head>
        <title>{isLoaded ? `${composer?.name}` : "Loading"}</title>
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
          <div className="h-64 w-full border-b bg-slate-50">
            <div className="flex h-full w-full flex-col justify-center md:mx-auto md:mb-4 md:mt-0 md:max-w-7xl  ">
              {/* name card */}
              <div className="my-8 flex flex-col md:flex-row md:items-center">
                <img
                  className="ml-12 h-20 w-20 rounded-lg shadow-xl md:h-32 md:w-32"
                  src={composer?.portrait}
                  alt={composer?.name}
                />
                <div className=" ml-12 mt-4 md:mt-0">
                  <h1 className="font-serif text-3xl">{composer?.name}</h1>
                  <h2 className="mt-0.5 font-serif text-lg text-slate-400 md:mt-2">
                    {composer?.complete_name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 pb-20 md:mx-auto md:mb-4 md:mt-0 md:max-w-7xl ">
            {/* actual inner content starts */}

            <div className="mt-12 grid gap-x-6 gap-y-8 md:grid-cols-2">
              {worksPopular.length > 0 && (
                <div>
                  <SectionTitle text="Popular" />
                  <ScrollArea className="h-96 w-full rounded-md border p-4">
                    <div className="grid gap-2">
                      {worksPopular?.map((work) => (
                        <CardWork key={work.id} work={work} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {worksChamber.length > 0 && (
                <div>
                  <SectionTitle text="Chamber" more />
                  <ScrollArea className="h-96 w-full rounded-md border p-4">
                    <div className="grid gap-2">
                      {worksChamber?.map((work) => (
                        <CardWork key={work.id} work={work} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {worksKeyboard.length > 0 && (
                <div>
                  <SectionTitle text="Keyboard" more />
                  <ScrollArea className="h-96 w-full rounded-md border p-4">
                    <div className="grid gap-2">
                      {worksKeyboard?.map((work) => (
                        <CardWork key={work.id} work={work} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {worksOrchestral.length > 0 && (
                <div>
                  <SectionTitle text="Orchestral" more />
                  <ScrollArea className="h-96 w-full rounded-md border p-4">
                    <div className="grid gap-2">
                      {worksOrchestral?.map((work) => (
                        <CardWork key={work.id} work={work} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {worksStage.length > 0 && (
                <div>
                  <SectionTitle text="Stage" more />
                  <ScrollArea className="h-96 w-full rounded-md border p-4">
                    <div className="grid gap-2">
                      {worksStage?.map((work) => (
                        <CardWork key={work.id} work={work} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {worksVocal.length > 0 && (
                <div>
                  <SectionTitle text="Vocal" more />
                  <ScrollArea className="h-96 w-full rounded-md border p-4">
                    <div className="grid gap-2">
                      {worksVocal?.map((work) => (
                        <CardWork key={work.id} work={work} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>

            {/* actual inner content ends */}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { composerId } = context.query;
  const data = await getWorksByComposerID(parseInt(composerId));
  return {
    props: {
      data,
      works: data.works,
      composer: data.composer,
    },
  };
}
