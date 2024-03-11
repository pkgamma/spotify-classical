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

      <ResizablePanelGroup direction="horizontal">
        {/* ---- left panel */}
        <ResizablePanel defaultSize={22} minSize={18} maxSize={32}>
          <NavbarDesktop className="bg-slate-100 min-h-full" />
        </ResizablePanel>
        {/* ---- handle */}
        <ResizableHandle />
        {/* ---- right panel */}
        <ResizablePanel>
          <div>
            <main>
              <motion.div
                className="min-h-screen"
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 6, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <div>{children}</div>
              </motion.div>
            </main>
          </div>
        </ResizablePanel>
        {/* ---- */}
      </ResizablePanelGroup>

      {/* <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" /> */}
    </div>
  );
}
