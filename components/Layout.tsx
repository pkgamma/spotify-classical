import { isLoadedState } from "@/atoms/states";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/pages/loading";
import Head from "next/head";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

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
        {/* desktop */}
        <div className="hidden md:block">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full items-stretch"
          >
            <ResizablePanel defaultSize={20} minSize={16} maxSize={30}>
              <NavbarDesktop />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              {isLoaded ? (
                <ScrollArea className="h-screen">{children}</ScrollArea>
              ) : (
                <Loading />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* mobile */}
        <div className="md:hidden">
          <NavbarMobile className="fixed bottom-0 left-0 z-50 h-14 w-full border-t bg-white" />
          <div className="min-h-screen">{children}</div>
        </div>
      </main>
    </div>
  );
}
