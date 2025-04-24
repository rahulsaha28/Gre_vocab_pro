"use client";
import PaginationContainer from "@/components/basic/PaginationContainer";
import QuestionCard from "@/components/basic/QuestionCard";
import usePagination from "@/hooks/usePagination";
import { getQuestion } from "@/server/server-action";
import { QuestionType } from "@prisma/client";

const QuestionPage = () => {
  const { data, currentPage, setCurrentPage, total } = usePagination({
    // @ts-ignore
    fetchDatas: getQuestion,
    params: { page: 1, limit: 10, type: "Math" as QuestionType },
  });

  console.log(total, currentPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8">
        {data?.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
      <div>
        <PaginationContainer
          currentPage={currentPage}
          handlePageChange={setCurrentPage}
          totalPages={total}
          maxVisiblePage={10}
        />
      </div>
    </div>
  );
};

export default QuestionPage;
