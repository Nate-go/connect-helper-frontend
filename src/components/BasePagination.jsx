import {Pagination} from "rsuite";
import { PaginationDefault } from "@/constants";
import { useEffect, useState } from "react";
const BasePagination = ({ pagination, handlePagination }) => {
    const { currentPage, totalRow, perPage,  lastPage} = pagination;

    const handleLimit = (newLimit) => {
        handlePagination(1, newLimit);
    }

    const handlePage = (newPage) => {
        handlePagination(newPage, perPage);
    }

    return (
        <div style={{ padding: 20 }}>
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={3}
                size="xs"
                layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                total={totalRow}
                limitOptions={PaginationDefault.LIMIT_OPTIONS}
                limit={perPage}
                activePage={currentPage}
                onChangePage={handlePage}
                onChangeLimit={handleLimit}
            />
        </div>
    );
}

export default BasePagination