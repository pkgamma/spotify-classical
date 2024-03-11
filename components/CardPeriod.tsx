import Link from "next/link";
import Image from "next/image";
import {
  currComposerIdState,
  currPeriodIdState,
  isLoadedState,
} from "@/atoms/states";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CardPeriod(props) {
  const router = useRouter();
  const [composers, setComposers] = useState([]);
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  const { periodKey, periodVal } = props;
  return (
    <Link
      href={`/period/${periodKey}`}
      onClick={() => {
        setCurrPeriod(periodKey);
        setIsLoaded(false);
      }}
    >
      <div className="rounded-lg border transition ease-in-out md:hover:bg-gray-50 ">
        <div className="flex h-32 cursor-pointer select-none items-center">
          <div className="mx-6 max-w-md md:ml-12">
            <h2 className="">{periodVal.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{periodVal.subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
