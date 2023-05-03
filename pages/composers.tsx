import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import { getComposersPopular } from "@/lib/openopus";
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

      <div className="grid md:grid-cols-3 md:gap-4 gap-2">
        {composers?.map((composer) => (
          <Link
            href={`/composer/${composer.id}`}
            onClick={() => setCurrComposer(composer.id)}
            key={composer.id}
          >
            <div className="border rounded-lg">
              <div className="cursor-pointer select-none flex items-center">
                <div className="flex items-center justify-center h-32 w-32 bg-gray-100">
                  <Image
                    className="flex items-end justify-center w-3/5 h-auto shadow-lg rounded-sm"
                    src={composer.portrait}
                    alt={composer.name}
                    width={128}
                    height={128}
                  />
                </div>
                <div className="p-6">
                  <h2 className="">{composer.name}</h2>
                  <p className="text-gray-400 text-sm pt-0.5">
                    {composer.complete_name}
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
