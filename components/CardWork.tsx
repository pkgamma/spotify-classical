import { currWorkIdState } from "@/atoms/states";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function CardWork(props) {
  const router = useRouter();
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const { work } = props;

  return (
    <Link href={`/work/${work.id}`} onClick={() => setCurrWorkId(work.id)}>
      <div className="border rounded-lg md:hover:bg-gray-50 transition ease-in-out ">
        <div className="cursor-pointer select-none flex items-center h-24">
          <div className="md:ml-8 mx-6 max-w-md">
            <h2 className="">{work.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{work.genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
