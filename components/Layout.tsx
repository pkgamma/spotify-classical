import React, { ReactNode } from "react";
import Head from "next/head";
import LeftSidebar from "./LeftSidebar";
import { useRecoilState } from "recoil";
import { isLoadedState } from "@/atoms/states";
import { Loader2 } from "lucide-react";

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
        <LeftSidebar className="border-r w-60 fixed left-0 top-0 bottom-0 overflow-auto" />
        <main className="pl-60 mx-auto max-w-6xl">
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
      <LeftSidebar className="border-r w-60 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-60 mx-auto max-w-6xl">{children}</main>
      <footer>{/* add any common footer components here */}</footer>
    </div>
  );
}
