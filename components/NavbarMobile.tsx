import { cn } from "@/lib/utils";
import { HistoryIcon, HomeIcon, SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export const Option = ({ link, title, children }) => {
  return (
    <Link
      href={link}
      className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100"
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
    <div className={cn("", className)}>
      <div className="mx-auto grid h-full max-w-lg grid-cols-4">
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
