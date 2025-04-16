import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  maxVisiblePage?: number;
}

const PaginationContainer: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
  totalPages,
  maxVisiblePage = 8,
}) => {
  // [1 2 3 4 5]
  const getVisiblePages = (): number[] => {
    const half = Math.floor(maxVisiblePage / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePage - 1);
    return Array.from(
      {
        length: end - start + 1,
      },
      (_, i) => start + i
    );
  };

  const visiblePage = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Pagination className="flex items-center justify-center mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${
              isFirstPage ? "pointer-events-none opacity-20" : "cursor-pointer"
            }`}
            onClick={() => !isFirstPage && handlePageChange(currentPage - 1)}
            aria-disabled={isFirstPage}
          />
        </PaginationItem>
        {visiblePage.map((page) => {
          if (page < currentPage + 4 && page > currentPage - 4) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  className={`${
                    currentPage === page
                      ? "bg-blue-500 text-white pointer-events-none"
                      : "cursor-pointer hover:bg-blue-300"
                  } `}
                  aria-label={`Page-${page}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        <PaginationItem>
          <PaginationNext
            className={`${
              isLastPage ? "pointer-events-none opacity-20" : "cursor-pointer"
            }`}
            onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
            aria-disabled={isLastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationContainer;
