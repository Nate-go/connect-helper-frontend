import { Table, Checkbox, InputGroup, Input, Button } from 'rsuite';
import React, { useState } from 'react';

import { Gender } from '@/constants';
import {
    BaseCell,
    ConstantCell,
    ActionCell,
    CheckCell,
    DateTimeCell,
    UserCell
} from './TableCell';
import { SearchIcon, TrashIcon, PlusIcon } from '@/components/icons';
import { InviteEmployee } from "@/components/selects";


const { Column, HeaderCell} = Table;

const UserTable = ({ items, dataLoading, handleSort, checkedKeys, setCheckedKeys, onDelete, onDeletes }) => {
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

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
        if(checkedKeys.length == 1 && checkedKeys.includes(rowData)) {
            setCheckedKeys([]);
            return;
        }
        setCheckedKeys([rowData]);
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
                {open && <InviteEmployee open={open} handleClose={() => setOpen(false)} />}
                <div className='flex flex-row items-center gap-3'>
                    <Button color="green" className='bg-green-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => setOpen(true)}>
                        Invite employee
                    </Button>
                    <Button disabled={!checkedKeys.length} color="red" className='bg-red-600' appearance="primary" startIcon={<TrashIcon />} onClick={onDeletes}>
                        Delete
                    </Button>
                    
                </div>
                
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
                <Column width={300} fullText sortable fixed>
                    <HeaderCell>Name</HeaderCell>
                    <UserCell dataKeys={["name"]} images={["image_url"]} />
                </Column>
                <Column width={270}>
                    <HeaderCell>Email</HeaderCell>
                    <BaseCell dataKey="email" />
                </Column>
                <Column width={150}>
                    <HeaderCell>Gender</HeaderCell>
                    <ConstantCell dataKey="gender" constant={Gender} colors={['blue', 'cyan', 'violet']} />
                </Column>
                <Column width={200}>
                    <HeaderCell>Phonenumber</HeaderCell>
                    <BaseCell dataKey="phonenumber"/>
                </Column>
                <Column width={375}>
                    <HeaderCell>Date of birth</HeaderCell>
                    <DateTimeCell dataKey="date_of_birth" />
                </Column>
                <Column width={90} fixed="right">
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell onDelete={onDelete} elements={{delete:true}}/>
                </Column>
            </Table>
        </div>
                    
    );
}
export default UserTable