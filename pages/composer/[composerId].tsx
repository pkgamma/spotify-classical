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

export default function Works({ works, composerName }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    setIsLoaded(true);
  }, [works, composerName]);

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
    <Layout title={`${composerName}`}>
      <div className="flex flex-col">
        <div className="h-96 w-full bg-slate-100 border-b">
          <div className="flex flex-col justify-center h-96 md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full bg-slate-200 ">
            <h1 className="text-4xl font-bold text-slate-900 ">
              Composer Philip
            </h1>
          </div>
        </div>
        <div className="md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full px-4 pb-20 ">
          {/* actual inner content starts */}

          <PageTitle title={`Works of Composer ${composerName}`} />
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { composerId } = context.query;
  const data = await getWorksByComposerID(parseInt(composerId));
  return {
    props: {
      works: data.works,
      composerName: data.composer.name,
    },
  };
}
