import { useState, useEffect, useRef } from "react";

const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

export default function SidebarTemp() {
  const isResized = useRef(false);

  const [width, setWidth] = useState(defaultWidth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWidth = localStorage.getItem("sidebarWidth");
      if (storedWidth !== null) {
        setWidth(parseInt(storedWidth));
      }
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem("sidebarWidth", width.toString());
    }
  }, [isReady, width]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", (e) => {
        if (!isResized.current) {
          return;
        }

        setWidth((previousWidth) => {
          const newWidth = previousWidth + e.movementX / 2;

          const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

          return isWidthInRange ? newWidth : previousWidth;
        });
      });

      window.addEventListener("mouseup", () => {
        isResized.current = false;
      });
    }
  }, []);

  return (
    <div className="flex">
      <div style={{ width: `${width / 16}rem` }} className="bg-neutral-400">
        Sidebar
      </div>

      {/* Handle */}
      <div
        className="w-2 cursor-col-resize"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
}
