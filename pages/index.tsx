import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import TempPlayer from "@/components/TempNowPlaying";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";

export default function HomePage() {
  return (
    <Layout title="SymphonyNow">
      <PageTitle title="Welcome" />
    </Layout>
  );
}
