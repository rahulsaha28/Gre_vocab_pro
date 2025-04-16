"use client";
import { useSearch } from "@/context/SearchContext";
import { useDebounce } from "@/hook/useDebounce";
import { searchVocab } from "@/server/server-action";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchItem = () => {
  const { setSearchResults, setLoading } = useSearch();
  const [search, setSearch] = useState<string>("");

  const c = useDebounce(search, 1000);
  useEffect(() => {
    if (c) {
      searchVocabHandaler(c);
    }
  }, [c]);
  const searchVocabHandaler = async (c: string) => {
    try {
      setLoading(true);
      const response = await searchVocab(c);
      if (response?.data) {
        setSearchResults(response?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      redirect("/");
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <Input
        name="search"
        placeholder="Search..."
        className="placeholder:text-gray-400 placeholder:italic placeholder:text-sm text: italic"
        onChange={handleSearch}
      />
      <Button className="ml-2">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchItem;
