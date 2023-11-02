

import React, { useEffect, useState } from 'react';

import { useApi } from "@/hooks";
import { connectionEndpoints } from '@/apis';
import { ConnectionStatus } from '@/constants';
import { BaseTable } from '@/components/table';

const ConnectionTable = ({tags, statuses, items, pagination}) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [checkedKeys, setCheckedKeys] = React.useState([]);
    
    let checked = false;
    let indeterminate = false;

    const handleCheckAll = (value, checked) => {
        const keys = checked ? data.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

    const filterData = (dataTable) => {
        const filteredData = dataTable.filter(item => {

            const statusMatch = statuses.length === 0 || statuses.includes(item.status);

            const tagMatch = tags.length === 0 || item.tags.some(tag => tags.includes(tag));

            return statusMatch && tagMatch;
        });

        return filteredData;
    }

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = filterData(defaultData).filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    if (checkedKeys.length === data.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
        indeterminate = true;
    }

    return (
        <BaseTable items={items} pagination={pagination} loading={(loading || connectionLoading)}/>
    );
};

export default ConnectionTable