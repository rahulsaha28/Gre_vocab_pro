"use client";

import ItemCard from "@/components/basic/ItemCard";
import LoadingItem from "@/components/basic/LoadingItem";
import { useSearch } from "@/context/SearchContext";

const Home = () => {
  const { searchResults, loading } = useSearch();

  return (
    <div className="container mx-auto p-4">
      {loading && (
        <div className="flex items-center justify-center">
          <LoadingItem color="blue" size={50} />
        </div>
      )}
      {searchResults?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults?.map((item, index) => (
            <ItemCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
