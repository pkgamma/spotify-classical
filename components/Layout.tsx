import React, { ReactNode } from "react";
import Head from "next/head";
import NavbarDesktop from "./NavbarDesktop";
import { useRecoilState } from "recoil";
import { isLoadedState } from "@/atoms/states";
import { ListIcon, Loader2 } from "lucide-react";
import NavbarMobile from "./NavbarMobile";

type Props = {
  children?: ReactNode;
  title?: string;
};
export default function Layout({ children, title = "Default Title" }: Props) {
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  if (!isLoaded) {
    return (
      <div>
        <Head>
          <title>Loading...</title>
        </Head>
        <NavbarDesktop className="md:w-56 md:block hidden border-r fixed left-0 top-0 bottom-0 overflow-auto" />
        <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" />
        <main className="md:pl-56 mx-auto max-w-6xl">
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin">
                <Loader2 className="w-8 h-8" />
              </div>
            </div>
          </div>
        </main>
        <footer>{/* add any common footer components here */}</footer>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <NavbarDesktop className="md:w-56 md:block hidden border-r fixed left-0 top-0 bottom-0 overflow-auto" />
      <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" />

      <main className="md:pl-56 mx-auto max-w-6xl">{children}</main>

      <footer>{/* add any common footer components here */}</footer>
    </div>
  );
}
