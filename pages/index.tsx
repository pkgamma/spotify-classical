import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import TempPlayer from "@/components/TempNowPlaying";
import Layout from "@/components/Layout";

export default function HomePage() {
  return (
    <Layout title="Spotify Classical">
      <div className="mt-12">
        <header className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-center p-0 box-border m-0 min-w-0 text-2xl font-bold pl-12 pr-12">
            Composers
          </h1>
        </header>
      </div>
    </Layout>
  );
}
