"use client";
import { VocabType } from "@/utils/TsConfig";
import { createContext, ReactNode, useContext, useState } from "react";

interface SearchContextType {
  searchResults: VocabType[];
  setSearchResults: (results: VocabType[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<VocabType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{ searchResults, setSearchResults, loading, setLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
