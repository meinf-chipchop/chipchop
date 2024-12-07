import React from "react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="mt-4 flex justify-between items-center">
            <button
                className="px-4 py-2 bg-[#6a9fad] text-white rounded disabled:opacity-50 disabled:hover:bg-[#6a9fad] hover:bg-gray-500"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="text-[#2c3e50]">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="px-4 py-2 bg-[#6a9fad] text-white rounded disabled:opacity-50 disabled:hover:bg-[#6a9fad] hover:bg-gray-500"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                Next
            </button>


        </div>
    )
}
