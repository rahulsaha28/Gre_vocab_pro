"use client";
import { getVocab } from "@/server/server-action";
import { VocabType } from "@/utils/TsConfig";
import { useCallback, useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import LoadingItem from "./LoadingItem";
import PaginationContainer from "./PaginationContainer";

const ITEM_PER_PAGE = 12;

const ItemCardContent = () => {
  const [items, setItems] = useState<VocabType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const { status, data, message } = await getVocab(
        currentPage,
        ITEM_PER_PAGE
      );
      if (status === 200 && data) {
        setItems(data.items || []);
        setTotalPages(Math.ceil(data.total / ITEM_PER_PAGE));
      } else {
        throw Error("Some error happen in server");
      }
    } catch (error) {
      throw Error("Some Error happen");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handlePageChange = (page: number) => {
    if (page >= 1 || page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingItem color="blue" size={50} />
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div
        className={`${
          isLoading
            ? "flex justify-center items-center h-full w-full"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }`}
      >
        {!isLoading &&
          items?.map((item, index) => (
            <ItemCard key={`card-container-${index}`} {...item} />
          ))}
      </div>
      {/* pagination start from here */}
      <PaginationContainer
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ItemCardContent;
