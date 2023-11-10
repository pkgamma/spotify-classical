import React, { ReactNode, useEffect, useRef, useState } from "react";
import Head from "next/head";
import NavbarDesktop from "./NavbarDesktop";
import { useRecoilState } from "recoil";
import { isLoadedState } from "@/atoms/states";
import { Loader2 } from "lucide-react";
import NavbarMobile from "./NavbarMobile";

type Props = {
  children?: ReactNode;
  title?: string;
};
export default function Layout({ children, title = "Default Title" }: Props) {
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  // const isLoaded = false;

  return (
    <div>
      <Head>
        <title>{isLoaded ? title : "Loading..."}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>

      <NavbarDesktop className="bg-slate-50 md:w-64 md:block hidden border-r fixed left-0 top-0 bottom-0 overflow-auto" />
      <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" />

      <main className="md:pl-64">
        {isLoaded ? (
          children
        ) : (
          <div className="flex flex-col">
            <div className="md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full px-4 pb-20 ">
              <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin">
                    <Loader2 className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
