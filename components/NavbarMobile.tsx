import { cn } from "@/lib/utils";
import {
  HistoryIcon,
  HomeIcon,
  ListIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

export const Option = ({ link, title, children }) => {
  return (
    <Link
      href={link}
      className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100 group"
    >
      {children}
      <h1 className="mt-0.5 text-xs text-gray-400  group-hover:text-black ">
        {title}
      </h1>
    </Link>
  );
};

export const iconClassName = "w-6 h-6  text-gray-400  group-hover:text-black ";

export default function NavbarMobile({ className }) {
  return (
    <div
      className={cn(
        "md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t",
        className
      )}
    >
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Option link="/" title="Home">
          <HomeIcon className={iconClassName} />
        </Option>
        <Option link="/search" title="Search">
          <SearchIcon className={iconClassName} />
        </Option>
        <Option link="/periods" title="Periods">
          <HistoryIcon className={iconClassName} />
        </Option>
        <Option link="/composers" title="Composers">
          <UserIcon className={iconClassName} />
        </Option>
      </div>
    </div>
  );
}
