import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

type ProductsPaginationProps = {
    page: number,
    totalPages: number,
    totalProducts: number
}


export default function ProductsPagination({ page, totalPages, totalProducts }: ProductsPaginationProps) {

    // Helper para generar los números de página
    const generatePageNumbers = () => {
        const pages = []
        const startPage = Math.max(1, page - 2) // Mostrar hasta 2 páginas antes
        const endPage = Math.min(totalPages, page + 2) // Mostrar hasta 2 páginas después

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages
    }

    return (
        <div className="flex mt-5 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/* Desktop view */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(page - 1) * 10 + 1}</span> a{' '}
                        <span className="font-medium">
                            {Math.min(page * 10, totalProducts)}
                        </span>{' '}
                        de <span className="font-medium">{totalProducts}</span> resultados
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        {/* Botón Anterior */}
                        <Link
                            href={page === 1 ? "#" : `/admin/products?page=${page - 1}`}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === 1 ? "cursor-not-allowed opacity-50" : ""
                                }`}
                        >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeftIcon aria-hidden="true" className="size-5" />
                        </Link>
                        {/* Números de página */}
                        {generatePageNumbers().map((pageNumber) => (
                            <Link
                                key={pageNumber}
                                href={`/admin/products?page=${pageNumber}`}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pageNumber === page
                                    ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {pageNumber}
                            </Link>
                        ))}

                        {/* Botón Siguiente */}
                        <Link
                            href={page === totalPages ? "#" : `/admin/products?page=${page + 1}`}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === totalPages ? "cursor-not-allowed opacity-50" : ""
                                }`}
                        >
                            <span className="sr-only">Siguiente</span>
                            <ChevronRightIcon aria-hidden="true" className="size-5" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
