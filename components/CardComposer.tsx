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
      <div className="border rounded-lg md:hover:bg-gray-50 transition ease-in-out ">
        <div className="cursor-pointer select-none flex items-center">
          <div className="flex items-center justify-center h-28 w-28 bg-gray-100 shrink-0">
            <Image
              className="flex items-end justify-center w-3/5 h-auto shadow-lg rounded-sm"
              src={composer.portrait}
              alt={composer.name}
              width={128}
              height={128}
            />
          </div>
          <div className="px-6 max-w-sm">
            <h2 className="line-clamp-1">{composer.name}</h2>
            <p className="text-gray-400 text-sm mt-0.5 line-clamp-2">
              {composer.complete_name}
            </p>
            <p className="text-gray-300 text-xs mt-2">{composer.epoch}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
