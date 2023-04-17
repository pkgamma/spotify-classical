import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Sidebar() {
  const { data: session, status } = useSession();

  console.log(session);
  // 1:47:45
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
      <div className="space-y-4">
        <button
          onClick={handleLoginClick}
          className="flex items-center space-x-2 hover:text-white"
        >
          <p className="font-bold">Login</p>
        </button>
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white"
        >
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
        <p className="cursor-pointer hover:text-white">test</p>
      </div>
    </div>
  );
}

export default Sidebar;
