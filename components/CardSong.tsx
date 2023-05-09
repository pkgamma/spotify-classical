import { currWorkIdState } from "@/atoms/states";
import { VerifiedIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function CardSong(props) {
  const router = useRouter();
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const { track } = props;

  return (
    <div className=" md:hover:bg-gray-50 transition ease-in-out ">
      <div className="cursor-pointer select-none flex items-center ">
        <div className="flex items-center space-x-2">
          <h2 className="">{track.name}</h2>
        </div>
      </div>
    </div>
  );
}
