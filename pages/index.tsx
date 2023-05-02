import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import TempPlayer from "@/components/TempNowPlaying";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";

export default function HomePage() {
  return (
    <Layout title="SymphonyNow">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold">
            Welcome to SymphonyNow
          </h1>
          <h2 className="mt-4 font-serif text-xl text-gray-400">
            Select a period to get started
          </h2>
        </div>
      </div>
    </Layout>
  );
}
