import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";

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
