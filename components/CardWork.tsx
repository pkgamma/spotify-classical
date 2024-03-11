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
      <div className=" transition ease-in-out md:hover:bg-gray-50 ">
        <div className="flex cursor-pointer select-none items-center ">
          <div className="flex items-center space-x-2">
            <h2 className="line-clamp-1">{work.title}</h2>
            {work.recommended == "1" && (
              <VerifiedIcon className="h-4 w-4 shrink-0 text-gray-300" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
