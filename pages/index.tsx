import React from "react";
import Sidebar from "@/components/sidebar";
import Center from "@/components/center";
import Player from "@/components/player";
import Composers from "@/components/composers";
import Works from "@/components/works";

export default function HomePage() {
  return (
    <div className="">
      <main className="grid lg:grid-cols-5">
        <Sidebar className="col-span-1" />
        <Composers />
        <Works />
        <Center />
        <Player />
      </main>
    </div>
  );
}
