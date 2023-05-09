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
      <div className=" md:hover:bg-gray-50 transition ease-in-out ">
        <div className="cursor-pointer select-none flex items-center ">
          <div className="">
            <h2 className="">{work.title}</h2>
            {/* <p className="text-sm text-gray-400 mt-1">{work.genre}</p> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
