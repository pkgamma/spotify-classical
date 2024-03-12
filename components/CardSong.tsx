import { currWorkIdState } from "@/atoms/states";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function CardSong(props) {
  const router = useRouter();
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const { track } = props;

  return (
    <div className=" transition ease-in-out md:hover:bg-gray-50 ">
      <div className="flex cursor-pointer select-none items-center ">
        <div className="flex items-center space-x-2">
          <h2 className="">{track.name}</h2>
        </div>
      </div>
    </div>
  );
}
