import React from "react";
import Sidebar from "@/components/Sidebar";
import TempSpotifyPlaylist from "@/components/TempSpotifyPlaylist";
import TempComposers from "@/components/TempComposers";
import TempWorks from "@/components/TempWorks";
import TempRecs from "@/components/TempRecs";

export default function HomePage() {
  return (
    <div className="">
      <main className="grid grid-cols-4">
        <Sidebar className={undefined} />
        <TempComposers />
        <TempWorks />
        <TempRecs />
        {/* <TempSpotifyPlaylist /> */}
      </main>
    </div>
  );
}
