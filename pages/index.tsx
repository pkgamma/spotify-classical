import React from "react";
import TempSpotifyPlaylist from "@/components/TempSpotifyPlaylist";
import TempComposers from "@/components/TempComposers";
import TempWorks from "@/components/TempWorks";
import TempRecs from "@/components/TempRecs";
// import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  return (
    <div className="">
      <main className="grid grid-cols-4">
        {/* <Sidebar /> */}
        <TempComposers />
        <TempWorks />
        <TempRecs />
        {/* <TempSpotifyPlaylist /> */}
      </main>
    </div>
  );
}
