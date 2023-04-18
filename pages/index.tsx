import React from "react";
import Sidebar from "@/components/sidebar";
import Center from "@/components/center";
import Player from "@/components/player";

export default function HomePage() {
  return (
    <div className="h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}
