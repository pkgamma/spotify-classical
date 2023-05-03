import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
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
          <Link
            href={`/composer/${composer.id}`}
            onClick={() => setCurrComposer(composer.id)}
            key={composer.id}
          >
            <div className="border rounded-lg hover:bg-gray-50 transition ease-in-out ">
              <div className="cursor-pointer select-none flex items-center">
                <div className="flex items-center justify-center h-28 w-28 bg-gray-100">
                  <Image
                    className="flex items-end justify-center w-3/5 h-auto shadow-lg rounded-sm"
                    src={composer.portrait}
                    alt={composer.name}
                    width={128}
                    height={128}
                  />
                </div>
                <div className="px-6 ">
                  <h2 className="">{composer.name}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {composer.complete_name}
                  </p>
                  <p className="text-gray-300 text-xs mt-2">
                    {composer.birth?.slice(0, 4)} -{" "}
                    {composer.death?.slice(0, 4)}
                  </p>
                </div>
              </div>
            </div>

            {/* <Row
              cover={composer.portrait}
              title=
              subtitle={composer.complete_name}
            /> */}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
