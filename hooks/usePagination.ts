"use client";
import { QuestionType } from "@prisma/client";
import { useEffect, useState } from "react";

type FetchDatasType = (
  currentPage: number,
  limit: number,
  type?: QuestionType
) => Promise<any>;
type ParamsType = {
  page: number;
  limit: number;
  type?: QuestionType;
};

const usePagination = ({
  fetchDatas,
  params,
}: {
  fetchDatas: FetchDatasType;
  params: ParamsType;
}) => {
  const [currentPage, setCurrentPage] = useState(params.page);
  const [limit, setLimit] = useState(params.limit);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (currentPage: number, limit: number) => {
    setLoading(true);
    try {
      const response = await fetchDatas(currentPage, limit, params?.type);
      if (response.status === 200) {
        setData(response.data.data);
        setTotal(Math.ceil(response.data.total / limit));
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, limit);
  }, [currentPage, limit, params?.type]);

  return { data, total, loading, error, currentPage, setCurrentPage };
};

export default usePagination;
