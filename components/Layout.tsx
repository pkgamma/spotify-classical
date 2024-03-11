import React, { ReactNode, useEffect, useRef, useState } from "react";
import Head from "next/head";
import NavbarDesktop from "./NavbarDesktop";
import { useRecoilState } from "recoil";
import { isLoadedState } from "@/atoms/states";
import NavbarMobile from "./NavbarMobile";
import { motion } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type Props = {
  children?: ReactNode;
  title?: string;
};
export default function Layout({ children }: Props) {
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>
      <main>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch"
        >
          <ResizablePanel defaultSize={20} minSize={16} maxSize={30}>
            <NavbarDesktop />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </main>

      {/* <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" /> */}
    </div>
  );
}
