import { Table, Checkbox } from 'rsuite';
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

const { Column, HeaderCell} = Table;

const BaseTable = ({ items, dataLoading, handleSort, checkedKeys, setCheckedKeys, onEdit, onDelete }) => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
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
            <Column width={100}>
                <HeaderCell>Status</HeaderCell>
                <ConstantCell dataKey="status" constant={ConnectionStatus} colors={['red', 'green']}/>
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
                <ActionCell onEdit={onEdit} onDelete={onDelete}/>
            </Column>
        </Table>            
    );
}
export default BaseTable