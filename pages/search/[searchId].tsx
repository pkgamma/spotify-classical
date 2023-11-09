import {
  currComposerIdState,
  currPeriodIdState,
  currSearchQueryState,
  currWorkIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getWorkAndComposerBySearch } from "@/lib/openopus";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    <Layout title="Search">
      <PageTitle title="Search" />

      <div className="flex items-center mb-12 text-center">
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
          )
        )}
      </ul>
    </Layout>
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
