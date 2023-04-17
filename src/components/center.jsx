import { ChevronDoubleDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Center() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-grow">
      <header>
        <div className="flex items-center bg-gray-400 space-x-3 transition duration-300 ease-in-out hover:opacity-70 cursor-pointer rounded-full p-1 pr-2 m-4">
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={session?.user.image}
            alt="profile"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDoubleDownIcon className="h-5 w-5" />
        </div>
      </header>
    </div>
  );
}

export default Center;
