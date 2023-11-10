import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

function Layout({ children, title = "Default Title" }: Props) {
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  // sidebar width setting
  useEffect(() => {
    const storedWidth = localStorage.getItem("sidebarWidth");
    if (parseInt(storedWidth) == 0) {
      setSidebarWidth(350);
    } else {
      setSidebarWidth(parseInt(storedWidth));
    }
  }, []);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    localStorage.setItem("sidebarWidth", sidebarWidth.toString());
  }, [sidebarWidth]);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing && mouseMoveEvent.clientX > 0) {
        setSidebarWidth(mouseMoveEvent.clientX);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div>
      <Head>
        <title>{isLoaded ? title : "Loading..."}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>

      {sidebarWidth !== 0 && (
        <div className="min-h-screen flex">
          <div
            className="md:flex hidden min-w-[220px] max-w-[450px]"
            style={{ width: sidebarWidth }}
          >
            <NavbarDesktop className="flex-1 overflow-auto bg-slate-50" />
            <div
              className="basis-3 border-slate-200 border-l-[1px] hover:border-l-[3px] active:border-l-[3px] transition-all cursor-col-resize resize-x"
              onMouseDown={startResizing}
            />
          </div>

          <div className="flex-1 md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full px-4 pb-20">
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

          <NavbarMobile className="md:hidden fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t" />
        </div>
      )}
    </div>
  );
}
