import { 
    Table, 
    Button,
    TagGroup,
    Tag,
    Checkbox,
    SelectPicker 
} from 'rsuite';
import React from 'react';

import { getDataTimeFormat } from '@/helpers/dateTimeHelpers';
import { getConstantTitle } from '@/helpers/constantHelpers';
import { TrashIcon, EditIcon } from '@/components/icons';
import { useState } from 'react';

const { Cell } = Table;

export const NameCell = ({ rowData, dataKey, dataKeyNote, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p className='text-base -mb-2 -mt-1'>{rowData[dataKey]}</p>
                <p className='text-xs text-gray-400'>{rowData[dataKeyNote]}</p>
            </div>
        </Cell>

    );
}

export const BaseCell = ({ rowData, dataKey, attributes=[], ...props }) => {
    let value = rowData[dataKey];

    attributes.forEach(element => {
        value = value[element]
    });

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p>{value}</p>
            </div>
        </Cell>

    );
}

export const TagCell = ({ rowData, dataKey, data = null, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <Tag key={rowData['id']} size="md">{rowData[dataKey]}</Tag>
            </div>
        </Cell>

    );
}

export const UsersCell = ({ rowData, dataKey, ...props }) => {
    const users = rowData[dataKey];

    if(!users) {
        return (
            <Cell {...props}>
                <div className='flex flex-col justify-center w-full h-full'>
                    
                </div>
            </Cell>
        );
    }

    const Users = users.map((user, index) => (
        <Tag key={index} size="md">{user}</Tag>
    ));

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <TagGroup>
                    {Users}
                </TagGroup>
            </div>
        </Cell>

    );
}

export const ConstantCell = ({ rowData, dataKey, constant, colors, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <TagGroup>
                    <Tag color={colors[rowData[dataKey]]} key={rowData['id']} size="md">{getConstantTitle(constant, rowData[dataKey])}</Tag>
                </TagGroup>
            </div>
        </Cell>

    );
}

export const SelectCell = ({ rowData, dataKey, handleChange, name, ...props }) => {
    const data = rowData[dataKey]?.map(item => ({
        label: item.name,
        value: item.id
    })) ?? [];

    const [open, setOpen] = useState(false);

    const handleSelectClick = (event) => {
        setOpen(!open);
        event.stopPropagation();
    };

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <SelectPicker data={data} onChange={handleChange} onClick={handleSelectClick} open={open} placeholder={name + '(' + data.length + ')'} />

            </div>
        </Cell>

    );
}

export const DateTimeCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p>{getDataTimeFormat(rowData[dataKey])}</p>
            </div>
        </Cell>

    );
}

export const ActionCell = ({ rowData, dataKey, onEdit, onDelete, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-row justify-center w-full h-full'>
                <Button appearance="link" onClick={() => onEdit(rowData)} startIcon={<EditIcon/>} className='hover:text-lg hover:text-blue-700'>
                </Button>
                <Button appearance="link" onClick={() => onDelete(rowData)} startIcon={<TrashIcon />} className='hover:text-lg hover:text-red-600'>
                </Button>
            </div>
        </Cell>

    );
}

export const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: '46px' }}>
            <Checkbox
                value={rowData}
                inline
                onChange={onChange}
                checked={checkedKeys.some(item => item.id === rowData[dataKey])}
            />
        </div>
    </Cell>
);

export const TagGroupCell = ({ rowData, dataKey, ...props }) => {
    const tags = rowData[dataKey];
    if (!tags) {
        return (
            <Cell {...props}>
                <div className='flex flex-col justify-center w-full h-full'>

                </div>
            </Cell>
        );
    }


    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <TagGroup>
                    {
                        tags.map((item) => (
                            <Tag key={item.id} size="md">{item.name}</Tag>
                        ))
                    }
                </TagGroup>
            </div>
        </Cell>

    );
}

