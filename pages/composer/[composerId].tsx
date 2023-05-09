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

export default function Works() {
  const router = useRouter();
  const [works, setWorks] = useState([]);
  const [composerName, setComposerName] = useState([]);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  useEffect(() => {
    if (router.isReady) {
      setIsLoaded(false);
      const { composerId } = router.query;
      getWorksByComposerID(parseInt(composerId))
        .then((data) => {
          setWorks(data.works);
          setComposerName(data.composer.name);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router]);

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
    </Layout>
  );
}
