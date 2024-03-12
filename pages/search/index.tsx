import {
  currComposerIdState,
  currPeriodIdState,
  currSearchQueryState,
  currWorkIdState,
  isLoadedState,
} from "@/atoms/states";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Search() {
  const router = useRouter();
  const [composers, setComposers] = useState([]);
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currPeriod, setCurrPeriod] = useRecoilState(currPeriodIdState);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
  const [query, setQuery] = useRecoilState(currSearchQueryState);
  const [results, setResults] = useState([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    router.push(`/search/${query}`);
  };

  return (
    <>
      <Head>
        <title>Search</title>
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
        <div className="flex flex-col">
          {/* <div className="h-96 w-full bg-slate-100 border-b">
          <div className="flex flex-col justify-center h-96 md:mt-0 md:mx-auto md:mb-4 md:max-w-7xl w-full bg-slate-200 ">
            <h1 className="text-4xl font-bold text-slate-900 ">
              Composer Philip
            </h1>
          </div>
        </div> */}
          <div className="w-full px-4 pb-20 md:mx-auto md:mb-4 md:mt-0 md:max-w-7xl ">
            {/* actual inner content starts */}

            <PageTitle title="Search" />

            <div className="mb-12 flex items-center text-center">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Composer or work title"
                className="mr-4"
              />
              <Button type="submit" onClick={handleSearch}>
                Search
              </Button>
            </div>

            {/* actual inner content ends */}
          </div>
        </div>
      </motion.div>
    </>
  );
}
