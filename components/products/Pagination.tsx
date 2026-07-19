type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      {/* Bouton précédent */}
      <button
        onClick={() =>
          setCurrentPage(Math.max(currentPage - 1, 1))
        }
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
      >
        ← Précédent
      </button>

      {/* Numéros des pages */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Bouton suivant */}
      <button
        onClick={() =>
          setCurrentPage(
            Math.min(currentPage + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
      >
        Suivant →
      </button>
    </div>
  );
}