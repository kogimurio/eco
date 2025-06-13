import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center gap-2 mt-2 justify-center">
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                title="Previous"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                title="Next"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default Pagination;