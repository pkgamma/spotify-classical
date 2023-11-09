import { currWorkIdState, isLoadedState } from "@/atoms/states";
import { VerifiedIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function CardWork(props) {
  const router = useRouter();
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
  const { work } = props;

  return (
    <Link
      href={`/work/${work.id}`}
      onClick={() => {
        setCurrWorkId(work.id);
        setIsLoaded(false);
      }}
    >
      <div className=" md:hover:bg-gray-50 transition ease-in-out ">
        <div className="cursor-pointer select-none flex items-center ">
          <div className="flex items-center space-x-2">
            <h2 className="">{work.title}</h2>
            {work.recommended == "1" && (
              <VerifiedIcon className="w-4 h-4 text-gray-300" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
