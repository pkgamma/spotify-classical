import { motion } from "framer-motion";
import Head from "next/head";

export default function Loading() {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <motion.div
        className="min-h-screen"
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 6, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="flex h-screen items-center justify-center">
          <h1 className="font-serif text-lg">Loading...</h1>
        </div>
      </motion.div>
    </>
  );
}
