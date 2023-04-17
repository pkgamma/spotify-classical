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
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const btnStyle =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium";

  return (
    <div className="">
      <div className=" w-64 bg-gray-50 text-gray-800 p-4 border-r border-gray-300 overflow-y-scroll h-screen scrollbar-hide">
        <div className="">
          <button
            onClick={handleLoginClick}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Login
          </button>

          <button
            onClick={() => signOut()}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Logout
          </button>

          <button className={btnStyle}>
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
          <button className={btnStyle}>
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
          <button className={btnStyle}>
            <LibraryIcon className="h-5 w-5" />
            <p>Library</p>
          </button>
          <button className={btnStyle}>
            <PlusCircleIcon className="h-5 w-5" />
            <p>Create Playlist</p>
          </button>
          <button className={btnStyle}>
            <HeartIcon className="h-5 w-5" />
            <p>Liked Songs</p>
          </button>
          <button className={btnStyle}>
            <RssIcon className="h-5 w-5" />
            <p>Episodes</p>
          </button>

          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
          <p className={btnStyle}>test</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
