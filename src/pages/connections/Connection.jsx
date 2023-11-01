
import { 
    Table, 
    Pagination,
    Checkbox
} from 'rsuite';
import React, { useEffect, useState } from 'react';

import { useApi } from "@/hooks";
import { connectionEndpoints } from '@/apis';
import { ConnectionStatus } from '@/constants';
import { 
    BaseCell, 
    TagCell, 
    ConstantCell, 
    NameCell, 
    DateTimeCell, 
    ActionCell, 
    UsersCell, 
    CheckCell 
} from '@/components/TableCell';

const { Column, HeaderCell, Cell } = Table;

const Connection = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const { data: connectionData, loading:connectionLoading, error, callApi: handleGetConnections } = useApi();
    const [defaultData, setDefaultData] = useState([]);
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

    useEffect(() => {
        handleGetConnections(
            connectionEndpoints.get,
            {

            }
        );
    }, []);

    useEffect(() => {
        if (connectionData) {
            setDefaultData(connectionData.connections);
        }
    }, [connectionData])

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = defaultData.filter((v, i) => {
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
        <div>
            <Table height={500}
                data={getData()}
                loading={(loading || connectionLoading)}
                hover={true}
                onRowClick={rowData => {
                    console.log(rowData);
                }}
                rowHeight={55}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                >
                <Column width={50} align="center" fixed>
                    <HeaderCell style={{ padding: 0 }}>
                        <div style={{ lineHeight: '40px' }}>
                            <Checkbox
                                inline
                                checked={checked}
                                indeterminate={indeterminate}
                                onChange={handleCheckAll}
                            />
                        </div>
                    </HeaderCell>
                    <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                </Column>
                <Column width={60} align="center" fixed sortable>
                    <HeaderCell>Id</HeaderCell>
                    <BaseCell dataKey="id" />
                </Column>

                <Column width={280} fullText sortable>
                    <HeaderCell>Name</HeaderCell>
                    <NameCell dataKey='name' dataKeyNote='note'/>
                </Column>

                <Column width={280} sortable>
                    <HeaderCell>Tags</HeaderCell>
                    <TagCell dataKey="tags" />
                </Column>
                <Column width={100}>
                    <HeaderCell>Status</HeaderCell>
                    <ConstantCell dataKey="status" constant={ ConnectionStatus }/>
                </Column>
                <Column width={150} sortable>
                    <HeaderCell>Owner</HeaderCell>
                    <BaseCell dataKey="owner" />
                </Column>
                <Column width={170} sortable>
                    <HeaderCell>Created</HeaderCell>
                    <DateTimeCell dataKey="created_at"/>
                </Column>
                <Column width={250}>
                    <HeaderCell>Users</HeaderCell>
                    <UsersCell dataKey="users" />
                </Column>
                <Column width={60} fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell/>
                </Column>
            </Table>
            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={defaultData.length}
                    limitOptions={[10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
    );
};

export default Connection