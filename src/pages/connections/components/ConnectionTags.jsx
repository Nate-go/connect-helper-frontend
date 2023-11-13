import React, { useState, useEffect } from 'react';
import { Checkbox, CheckboxGroup, Panel, ButtonToolbar, Button, Modal, Input, Grid, Col, Row, List } from 'rsuite';
import { PlusIcon, EditIcon, TrashIcon } from '@/components/icons';
import { getIds } from '@/helpers/dataHelpers';
import { ModalCreateTag, ModalTagDetail } from '.';

const ConnectionTags = ({ tagData, setTags, openConfirmation, setFetchTag}) => {
    const data = tagData;
    const [groupValue, setGroupValue] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const handleCloseCreate = () => {
        setTags([]);
        setFetchTag(true);
        setOpenCreate(false);
    };

    const handleCloseEdit = () => {
        setTags([]);
        setFetchTag(true);
        setOpenEdit(false);
    };

    const handleCheckAll = (value, checked) => {
        setGroupValue(checked ? getIds(data) : []);
        setTags(getIds(checked ? data : []));
    };

    const handleChange = (value) => {
        setGroupValue(value);
        setTags(value);
    }

    const onEdit = (item) => {
        setOpenEdit(true);
        setEditItem(item);
    }

    return (
        <Panel header={'Tags (' + data.length + ')'} bodyFill className='-mt-6'>
            <ButtonToolbar className='pb-4'>
                <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => setOpenCreate(true)}>
                    New tag
                </Button>
            </ButtonToolbar>

            {(!data || data.length <= 0) ? <p> Empty data</p>: <>
                <Checkbox
                    indeterminate={groupValue.length > 0 && groupValue.length < data.length}
                    checked={groupValue.length === data.length}
                    onChange={handleCheckAll}
                >
                    Check all
                </Checkbox>
                <CheckboxGroup name="checkboxList" value={groupValue} onChange={handleChange}>
                    {data.map(item => (
                        <div key={item.id} className='flex justify-between' value={item}>
                            <Checkbox key={item.id} value={item.id}>
                                {item.name}
                            </Checkbox>
                            <Button appearance="link" onClick={() => onEdit(item)} startIcon={<EditIcon />} className='hover:text-lg'>
                            </Button>
                        </div>
                    ))}
                </CheckboxGroup>

                <ModalTagDetail
                    open={openEdit}
                    handleClose={handleCloseEdit}
                    item={editItem}
                    openConfirmation={openConfirmation}
                />
            </>}

            <ModalCreateTag
                open={openCreate}
                handleClose={handleCloseCreate}
            />

            
        </Panel>
    );
};

export default ConnectionTags