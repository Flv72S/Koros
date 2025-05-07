import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Genera l'array delle pagine da mostrare
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <nav 
      className="flex justify-center items-center space-x-2 my-8"
      aria-label="Paginazione"
    >
      {/* Pulsante Precedente */}
      <button
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`
          px-3 py-2 rounded-md text-sm font-medium
          ${isFirstPage 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          }
        `}
        aria-label="Vai alla pagina precedente"
        aria-disabled={isFirstPage}
      >
        <span aria-hidden="true">&larr;</span>
        <span className="sr-only">Precedente</span>
      </button>

      {/* Numeri di pagina */}
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium
            ${currentPage === pageNum
              ? 'bg-primary text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            }
          `}
          aria-label={`Vai alla pagina ${pageNum}`}
          aria-current={currentPage === pageNum ? 'page' : undefined}
        >
          {pageNum}
        </button>
      ))}

      {/* Pulsante Successivo */}
      <button
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`
          px-3 py-2 rounded-md text-sm font-medium
          ${isLastPage 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          }
        `}
        aria-label="Vai alla pagina successiva"
        aria-disabled={isLastPage}
      >
        <span aria-hidden="true">&rarr;</span>
        <span className="sr-only">Successivo</span>
      </button>
    </nav>
  )
} 