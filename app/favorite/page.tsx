"use client";
import FavoriteCard from "@/components/basic/FavoriteCard";
import LoadingItem from "@/components/basic/LoadingItem";
import PaginationContainer from "@/components/basic/PaginationContainer";
import {
  getFavoriteVocab,
  updateVocabFavarableByID,
} from "@/server/server-action";
import { useEffect, useState } from "react";

const PER_PAGE = 8;
const FavoritePage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState<number>(0);
  const [data, setData] = useState<any[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  const getServerFavoriteVocab = async () => {
    try {
      setLoading(true);
      const result = await getFavoriteVocab(page, PER_PAGE);
      if (result.status === 200) {
        setData(result.data?.vocabs);
        setStatus(result.status);
        result.data?.total &&
          setTotalPages(Math.ceil(result.data?.total / PER_PAGE));
      }
      if (result.status === 300) {
        setStatus(result.status);
      }
      if (result.status === 400) {
        setStatus(result.status);
      }
    } catch (error) {
      throw Error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page: number) => {
    if (page >= 1 || page <= totalPages) {
      setPage(page);
    }
  };

  const handelFavoriteList = async (id: number) => {
    try {
      const res = await updateVocabFavarableByID(id);
      if (res?.status === 200) {
        getServerFavoriteVocab();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServerFavoriteVocab();
  }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingItem color="blue" size={50} />
      </div>
    );
  }

  if (status === 200) {
    return (
      <>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 p-5">
          {data?.map((synonym) => (
            <FavoriteCard
              key={synonym.id}
              synonym={synonym}
              handelFavoriteList={handelFavoriteList}
            />
          ))}
        </div>
        <div className="flex items-center justify-center mb-5">
          <PaginationContainer
            currentPage={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </>
    );
  }
  if (status === 300) {
    return (
      <div className=" flex items-center justify-center ">No data found</div>
    );
  }
  return <div>An error occurred</div>;
};

export default FavoritePage;
