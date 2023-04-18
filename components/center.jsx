import { useSession } from "next-auth/react";
import Image from "next/image";

function Center() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-grow">
      <header>
        <div className="flex items-center bg-gray-200 space-x-3 transition duration-300 ease-in-out hover:opacity-70 cursor-pointer p-1 pr-2 m-4">
          <Image
            src={session?.user.image}
            alt="profile"
            width={40}
            height={40}
          />
          <h2>{session?.user.name}</h2>
        </div>
      </header>
    </div>
  );
}

export default Center;
