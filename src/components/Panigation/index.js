import { memo } from 'react';
import ReactPaginate from 'react-paginate';



const Pagination = ({
    items,
    currentItems,
    itemOffset,
    pageCount,
    handlePaginationClick,
    handlePageClick }) => {
    return (
        <div className="flex justify-between items-center sm:flex-col gap-6">
            <p>
                Showing from <span className="font-bold">{items.length === 0 ? itemOffset : itemOffset + 1}</span> to{' '}
                <span className="font-bold">{currentItems && items.indexOf(currentItems[currentItems?.length - 1]) + 1}</span>{' '}
                of <span className="font-bold">{items.length} </span> {items.length > 1 ? 'results' : 'result'}
            </p>
            <ReactPaginate
                onClick={handlePaginationClick}
                className="pagination"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />{' '}
        </div>
    );
};

export default memo(Pagination);
