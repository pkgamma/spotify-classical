import React from "react";
import TempSpotifyPlaylist from "@/components/TempSpotifyPlaylist";
import TempComposers from "@/components/TempComposers";
import TempWorks from "@/components/TempWorks";
import TempRecs from "@/components/TempRecs";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  return (
    <div>
      <Sidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
      <main className="pl-56 grid grid-cols-4 m-4">
        <TempComposers />
        <TempWorks />
        <TempRecs />
      </main>
    </div>
  );
}
