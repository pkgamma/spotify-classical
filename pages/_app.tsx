import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <AnimatePresence mode="wait" initial={false}>
          <Layout title="SymphonyNow">
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </AnimatePresence>
        <Toaster />
      </RecoilRoot>
    </SessionProvider>
  );
}
