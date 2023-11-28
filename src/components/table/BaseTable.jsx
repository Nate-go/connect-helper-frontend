import { Table, Checkbox, Input, InputGroup } from 'rsuite';
import React, { useState } from 'react';

import { ConnectionStatus } from '@/constants';
import {
    BaseCell,
    ConstantCell,
    NameCell,
    ActionCell,
    UsersCell,
    CheckCell,
    TagGroupCell
} from './TableCell';
import { SearchIcon } from '@/components/icons';

const { Column, HeaderCell} = Table;

const BaseTable = ({ items, dataLoading, handleSort, checkedKeys, setCheckedKeys, onEdit, onDelete }) => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    let checked = false;
    let indeterminate = false;

    const handleSortColumn = (sortColumn, sortType) => {
        handleSort({column:sortColumn, order:sortType});
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const handleSearch = () => {
        handleSort({search: search});
    }

    if (checkedKeys.length === items.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < items.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? items.map(item => item) : [];
        setCheckedKeys(keys);
    };

    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

    const rowClick = (rowData) => {
        if(checkedKeys.length == 1 && checkedKeys.includes(rowData)) {
            setCheckedKeys([]);
            return;
        }
        setCheckedKeys([rowData]);
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-end'>
                <InputGroup className='w-1/3'>
                    <Input value={search} onChange={setSearch}/>
                    <InputGroup.Addon className='hover:bg-blue-500 hover:text-white hover:cursor-pointer' onClick={handleSearch}>
                        <SearchIcon />
                    </InputGroup.Addon>
                </InputGroup>
            </div>
            <Table height={500}
                data={items}
                loading={(loading || dataLoading)}
                hover={true}
                bordered
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                onRowClick={rowClick}
            >
                <Column width={40} align="center" fixed>
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
                <Column width={270} fullText sortable fixed>
                    <HeaderCell>Name</HeaderCell>
                    <NameCell dataKey='name' dataKeyNote='note' />
                </Column>

                <Column width={240}>
                    <HeaderCell>Tags</HeaderCell>
                    <TagGroupCell dataKey="tags" />
                </Column>
                <Column width={100} sortable>
                    <HeaderCell>Status</HeaderCell>
                    <ConstantCell dataKey="status" constant={ConnectionStatus} colors={['red', 'green', 'yellow']} />
                </Column>
                <Column width={150} sortable>
                    <HeaderCell>Owner</HeaderCell>
                    <BaseCell dataKey="owner" />
                </Column>
                <Column width={220}>
                    <HeaderCell>Users</HeaderCell>
                    <UsersCell dataKey="users" />
                </Column>
                <Column width={90} fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell onEdit={onEdit} onDelete={onDelete} />
                </Column>
            </Table>
        </div>           
    );
}
export default BaseTable