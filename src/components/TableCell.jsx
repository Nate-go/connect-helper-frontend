import { 
    Table, 
    Button,
    TagGroup,
    Tag,
    Checkbox 
} from 'rsuite';
import React from 'react';

import { getDataTimeFormat } from '@/helpers/dateTimeHelpers';
import { getConstantTitle } from '@/helpers/constantHelpers';

const { Cell } = Table;

export const NameCell = ({ rowData, dataKey, dataKeyNote, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p className='text-base'>{rowData[dataKey]}</p>
                <p className='text-xs text-gray-400'>{rowData[dataKeyNote]}</p>
            </div>
        </Cell>

    );
}

export const BaseCell = ({ rowData, dataKey, data = null, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p>{data ?? rowData[dataKey]}</p>
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

export const ConstantCell = ({ rowData, dataKey, constant, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <p>{getConstantTitle(constant, rowData[dataKey])}</p>
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

export const ActionCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                    Edit
                </Button>
            </div>
        </Cell>

    );
}

export const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: '46px' }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some(item => item === rowData[dataKey])}
            />
        </div>
    </Cell>
);

export const TagCell = ({ rowData, dataKey, ...props }) => {
    const tags = rowData[dataKey];

    if (!tags) {
        return (
            <Cell {...props}>
                <div className='flex flex-col justify-center w-full h-full'>

                </div>
            </Cell>
        );
    }

    const Tags = tags.map((tag) => (
        <Tag key={tag.id} size="md">{tag.name}</Tag>
    ));

    return (
        <Cell {...props}>
            <div className='flex flex-col justify-center w-full h-full'>
                <TagGroup>
                    {Tags}
                </TagGroup>
            </div>
        </Cell>

    );
}