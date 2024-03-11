import Link from "next/link";
import Image from "next/image";
import { currComposerIdState, isLoadedState } from "@/atoms/states";
import { useRecoilState } from "recoil";

export default function CardComposer(props) {
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  const { composer } = props;

  return (
    <Link
      href={`/composer/${composer.id}`}
      onClick={() => {
        setCurrComposer(composer.id);
        setIsLoaded(false);
      }}
      key={composer.id}
    >
      <div className="rounded-lg border transition ease-in-out md:hover:bg-gray-50 ">
        <div className="flex cursor-pointer select-none items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center bg-gray-100">
            <Image
              className="flex h-auto w-3/5 items-end justify-center rounded-sm shadow-lg"
              src={composer.portrait}
              alt={composer.name}
              width={128}
              height={128}
            />
          </div>
          <div className="max-w-sm px-6">
            <h2 className="line-clamp-1">{composer.name}</h2>
            <p className="mt-0.5 line-clamp-2 text-sm text-gray-400">
              {composer.complete_name}
            </p>
            <p className="mt-2 text-xs text-gray-300">{composer.epoch}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
