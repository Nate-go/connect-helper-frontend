import { Table, Checkbox, InputGroup, Input } from 'rsuite';
import React, { useState } from 'react';

import { ScheduleMailStatus } from '@/constants';
import {
    BaseCell,
    ConstantCell,
    ActionCell,
    CheckCell,
    SelectCell,
    DateTimeCell
} from './TableCell';
import { SearchIcon } from '@/components/icons';
import { MultiSelect } from '@/components/selects';
import { getConstantData } from '@/helpers/constantHelpers';

const { Column, HeaderCell } = Table;

const EmailScheduleTable = ({ items, dataLoading, handleSort, checkedKeys, setCheckedKeys, onEdit, onDelete }) => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    let checked = false;
    let indeterminate = false;

    const handleSortColumn = (sortColumn, sortType) => {
        handleSort({ column: sortColumn, order: sortType });
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

    const handleSearch = () => {
        handleSort({ search: search });
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
        if (checkedKeys.length == 1 && checkedKeys.includes(rowData)) {
            setCheckedKeys([]);
            return;
        }
        setCheckedKeys([rowData]);
    }

    const handleStatuses = (value) => {
        handleSort({ statuses: value, page: 1 });
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
                <MultiSelect
                    data={getConstantData(ScheduleMailStatus)}
                    setStatuses={handleStatuses}
                    loading={dataLoading}
                    label='Status'
                />

                <InputGroup className='w-1/3'>
                    <Input value={search} onChange={setSearch} />
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
                <Column width={350} fullText sortable fixed>
                    <HeaderCell>Name</HeaderCell>
                    <BaseCell dataKey='name' />
                </Column>
                <Column width={120}>
                    <HeaderCell>Status</HeaderCell>
                    <ConstantCell dataKey="status" constant={ScheduleMailStatus} colors={['green', 'gray']} />
                </Column>
                <Column width={185}>
                    <HeaderCell>Start</HeaderCell>
                    <DateTimeCell dataKey="started_at" />
                </Column>
                <Column width={250}>
                    <HeaderCell>After time</HeaderCell>
                    <BaseCell dataKey="after_second" />
                </Column>
                <Column width={185}>
                    <HeaderCell>Next time</HeaderCell>
                    <DateTimeCell dataKey="nextTime_at" />
                </Column>
                <Column width={90} fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell onEdit={onEdit} onDelete={onDelete} />
                </Column>
            </Table>
        </div>

    );
}
export default EmailScheduleTable