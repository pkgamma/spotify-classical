import {
  currComposerIdState,
  currPeriodIdState,
  currSearchQueryState,
  currWorkIdState,
  isLoadedState,
} from "@/atoms/states";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
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
    <Layout title="Search">
      <PageTitle title="Search" />

      <div className="flex items-center mb-12 text-center">
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
    </Layout>
  );
}
