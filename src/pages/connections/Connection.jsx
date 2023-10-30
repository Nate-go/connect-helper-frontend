
import { Table, Pagination } from 'rsuite';
import React from 'react';

const { Column, HeaderCell, Cell } = Table;
const defaultData = [];

const Connection = () => {
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = defaultData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    return (
        <div>
            <Table height={400}
                data={data}
                loading={true}
                hover={true}
                onRowClick={rowData => {
                    console.log(rowData);
                }}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={100} fixed>
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>

                <Column width={100}>
                    <HeaderCell>Last Name</HeaderCell>
                    <Cell dataKey="lastName" />
                </Column>

                <Column width={200}>
                    <HeaderCell>City</HeaderCell>
                    <Cell dataKey="city" />
                </Column>
                <Column width={200} flexGrow={1}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={80} fixed="right">
                    <HeaderCell>Action</HeaderCell>

                    <Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                                Edit
                            </Button>
                        )}
                    </Cell>
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