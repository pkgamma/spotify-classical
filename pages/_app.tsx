import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />

        <Toaster />
      </RecoilRoot>
    </SessionProvider>
  );
}
