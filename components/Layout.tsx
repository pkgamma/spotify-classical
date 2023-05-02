import React, { ReactNode } from "react";
import Head from "next/head";
import LeftSidebar from "./LeftSidebar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Default Title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <LeftSidebar className="border-r w-56 fixed left-0 top-0 bottom-0 overflow-auto" />
    <main className="pl-56 mx-auto max-w-6xl">{children}</main>
    <footer>{/* add any common footer components here */}</footer>
  </div>
);

export default Layout;
