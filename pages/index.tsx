import React from "react";
import TempComposers from "@/components/TempComposers";
import TempWorks from "@/components/TempWorks";
import TempRecs from "@/components/TempRecs";
import LeftSidebar from "@/components/LeftSidebar";

export default function HomePage() {
  return (
    <div>
      <LeftSidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-56">
        <div className="grid grid-cols-4 m-8">
          <TempComposers />
          <TempWorks />
          <TempRecs />
        </div>
      </main>
    </div>
  );
}
