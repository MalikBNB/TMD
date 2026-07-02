interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PageNavigator({
  currentPage,
  totalPages,
  onPageChange,
}: PageNavigatorProps) {
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="disabled:opacity-40 cursor-pointer"
      >
        ← Prev
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="disabled:opacity-40 cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
}
