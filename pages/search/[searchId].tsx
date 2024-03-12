import {
  currComposerIdState,
  currSearchQueryState,
  currWorkIdState,
} from "@/atoms/states";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getWorkAndComposerBySearch } from "@/lib/openopus";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Search({ query, results, success }) {
  const router = useRouter();
  const [currComposer, setCurrComposer] = useRecoilState(currComposerIdState);
  const [currWorkId, setCurrWorkId] = useRecoilState(currWorkIdState);
  const [searchQuery, setSearchQuery] = useRecoilState(currSearchQueryState);
  const { toast } = useToast();

  useEffect(() => {
    console.log(success);
    if (!success) {
      toast({
        title: "Nothing found!",
        variant: "destructive",
      });
    }
  }, [router]);

  const handleSearch = async () => {
    router.push(`/search/${searchQuery}`);
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            <ul>
              {results.map((result) =>
                result.work ? (
                  <Link
                    href={`/work/${result.work.id}`}
                    onClick={() => setCurrWorkId(result.work.id)}
                    key={result.work.id}
                  >
                    <Row
                      cover={null}
                      title={result.work.title}
                      subtitle={result.work.genre}
                    />
                  </Link>
                ) : (
                  <Link
                    href={`/composer/${result.composer.id}`}
                    onClick={() => setCurrComposer(result.composer.id)}
                    key={result.composer.id}
                  >
                    <Row
                      cover={result.composer.portrait}
                      title={result.composer.name}
                      subtitle={result.composer.complete_name}
                    />
                  </Link>
                ),
              )}
            </ul>

            {/* actual inner content ends */}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { searchId } = context.query;
  const data = await getWorkAndComposerBySearch(searchId);
  console.log(data);
  const results = data.results || [];
  return {
    props: {
      query: searchId,
      results,
      success: JSON.parse(data.status.success),
    },
  };
}
