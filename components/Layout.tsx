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

  return (
    <div>
      <Head>
        <title>{isLoaded ? title : "Loading..."}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>

      <NavbarDesktop className="md:w-56 md:block hidden border-r fixed left-0 top-0 bottom-0 overflow-auto" />
      <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" />

      <div className="md:pl-56">
        <div className="flex flex-col ">
          <div className="md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full px-2 pb-20 ">
            {isLoaded ? (
              children
            ) : (
              <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin">
                    <Loader2 className="w-8 h-8" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
