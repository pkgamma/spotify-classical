import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import CardComposer from "@/components/CardComposer";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
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

export default function Period() {
  const router = useRouter();
  const [composers, setComposers] = useState([]);
  const [popularComposers, setPopularComposers] = useState([]);
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
          // console.log(data);
          setComposers(data.composers);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
      getComposersPopular().then((data) => {
        console.log(data);
        setPopularComposers(data.composers);
      });
    }
  }, [router]);

  // going through the composers array and checking if the composer is in the popularComposers array
  // if it is, then push it to the popularArray
  // if it isn't, then push it to the nonPopularArray

  const popularArray = [];
  const nonPopularArray = [];

  composers.map((composer) => {
    const popularComposer = popularComposers.find(
      (popularComposer) => popularComposer.id === composer.id
    );
    if (popularComposer) {
      popularArray.push(composer);
    } else {
      nonPopularArray.push(composer);
    }
  });

  return (
    <Layout title={`${composers[0]?.epoch} Period`}>
      <PageTitle title={`Composers of the ${composers[0]?.epoch} Period`} />

      {popularArray.length > 0 && (
        <div>
          <div className="flex items-end justify-between mb-6">
            <div className="font-medium">Popular Composers</div>
            <p className="text-sm text-gray-500">
              More
              <ArrowRightIcon className="inline-block w-4 h-4 ml-0.5 mb-0.5" />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {popularArray?.map((composer) => (
              <CardComposer key={composer.id} composer={composer} />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end justify-between mb-6">
        <div className="font-medium">All Composers</div>
        <p className="text-sm text-gray-500">
          More
          <ArrowRightIcon className="inline-block w-4 h-4 ml-0.5 mb-0.5" />
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {nonPopularArray?.map((composer) => (
          <CardComposer key={composer.id} composer={composer} />
        ))}
      </div>
    </Layout>
  );
}
