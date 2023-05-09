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
      onClick={() => setCurrPeriod(periodKey)}
    >
      <div className="border rounded-lg md:hover:bg-gray-50 transition ease-in-out ">
        <div className="cursor-pointer select-none flex items-center h-32">
          <div className="md:ml-12 mx-6 max-w-md">
            <h2 className="">{periodVal.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{periodVal.subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
