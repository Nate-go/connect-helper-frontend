import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Checkbox, CheckboxGroup, Panel, ButtonToolbar, Button, Modal, Input, Grid, Col, Row, List } from 'rsuite';
import { PlusIcon, EditIcon, TrashIcon } from '@/components/icons';
import tagEndpoints from '@/apis/enpoints/tag';
import connectionEndpoints from '@/apis/enpoints/connection';
import { AutoLoader } from '@/components';
import { useApi } from '@/hooks';
import { getIds } from '@/helpers/dataHelpers';
import { ConfirmAction, ConfirmActionSelect } from '@/components/confirms';

const ConnectionTags = ({ tagData, setTags }) => {
    const data = tagData;
    const [groupValue, setGroupValue] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);

    const [tagName, setTagName] = useState('');
    const { data: createTagData, loading: createTagLoading, error: createTagError, callApi: handleCreateTag } = useApi();
    const { data: editTagData, loading: editTagLoading, error: editTagError, callApi: handleEditTag } = useApi();
    const { data: tagDetailData, loading: tagDetailLoading, error: tagDetailError, callApi: handleTagDetail } = useApi();
    const { data: deleteTagData, loading: deleteTagLoading, error: deleteTagError, callApi: handleDeleteTag } = useApi();
    const { data: deleteConnectionTagData, loading: deleteConnectionTagLoading, error: deleteConnectionTagError, callApi: handleDeleteConnectionTag } = useApi();

    const handleCloseCreate = () => {
        setTags([]);
        setOpenCreate(false);
    };

    const handleCloseEdit = () => {
        setTags([]);
        setOpenEdit(false);
    };

    const deleteConnectionTag = async (connectionIds, tagIds) => {
        await handleDeleteConnectionTag(
            connectionEndpoints.deleteTags,
            {
                method: 'POST',
                data: {
                    connectionIds,
                    tagIds
                }
            }
        );
    }

    const handleCheckAll = (value, checked) => {
        setGroupValue(checked ? getIds(data) : []);
        setTags(getIds(checked ? data : []));
    };

    const handleChange = (value) => {
        setGroupValue(value);
        setTags(value);
    }

    const createTag = async () => {
        await handleCreateTag(
            tagEndpoints.create,
            {
                method:"POST",
                data: {
                    name: tagName
                }
            }
        );
    }

    const editTag = async () => {
        await handleCreateTag(
            tagEndpoints.create,
            {
                method: "POST",
                data: {
                    name: tagName
                }
            }
        );
    }

    const deleteTag = async (id) => {
        await handleDeleteTag(
            tagEndpoints.delete,
            {
                method: 'DELETE',
                data: {
                    ids: [id]
                }
            }
        );

        setOpenEdit(false);
    }

    useEffect(() => {
        if(!createTagError) return;
        
        toast.error(createTagError.data.message);

    }, [createTagError])

    useEffect(() => {
        if (!createTagData) return;

        toast.success(createTagData.data.message);

        setTagName('');

    }, [createTagData])

    const onEdit = async (item) => {
        setOpenEdit(true);
        await handleTagDetail(tagEndpoints.get + '/' + item.id, {});
        setTagName(tagDetailData?.tag?.name);
    }

    const confirmDeleteConnectionTag = (connectionId, tagId) => {
        setConfirmAction(() => {onDeleteConnectionTag([connectionId], [tagId])});
        setConfirmMessage('Are you sure to remove ' + checkedKeys.length + ' connections?');
        setOpenConfirm(true);
    }

    const onDeleteConnectionTag = (connectionIds, tagIds) => {
        // deleteConnectionTag(connectionIds, tagIds)
    }

    const confirmDeleteTag = (id) => {

    }

    return (
        <Panel header={'Tags (' + data.length + ')'} bodyFill className='-mt-6'>
            <ConfirmAction confirmAction={confirmAction} message={confirmMessage} open={openConfirm} setOpen={setOpenConfirm} />
            <ButtonToolbar className='pb-4'>
                <Button color="blue" className='bg-blue-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => setOpenCreate(true)}>
                    New tag
                </Button>
            </ButtonToolbar>
            {data.length > 0 ? <Checkbox
                indeterminate={groupValue.length > 0 && groupValue.length < data.length}
                checked={groupValue.length === data.length}
                onChange={handleCheckAll}
            >
                Check all
            </Checkbox> : <p>Empty data</p>}
            <CheckboxGroup name="checkboxList" value={groupValue} onChange={handleChange}>
                {data.map(item => (
                    // <Checkbox key={item.id} value={item.id}>
                    //         {item.name}
                    // </Checkbox>
                    <div key={item.id} className='flex justify-between' value={item}>
                        <Checkbox key={item.id} value={item.id}>
                            {item.name}
                        </Checkbox>
                        <Button appearance="link" onClick={() => onEdit(item)} startIcon={<EditIcon />} className='hover:text-lg'>
                        </Button>
                    </div>
                ))}
            </CheckboxGroup>
            <Modal size='md' open={openCreate} onClose={handleCloseCreate}>
                <Modal.Header>
                    <Modal.Title>Add tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input placeholder="Tag's name" onChange={setTagName}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseCreate} appearance="subtle">
                        Cancel
                    </Button>
                    <AutoLoader 
                        display={!createTagLoading} 
                        component={
                            <Button onClick={createTag} appearance="primary" className='bg-blue-500'>
                                Add
                            </Button>
                        }
                    />
                </Modal.Footer>
            </Modal>

            <Modal size='md' open={openEdit} onClose={handleCloseEdit}>
                <Modal.Header>
                    <Modal.Title>Edit tag</Modal.Title>
                </Modal.Header>
                <AutoLoader
                    display={!tagDetailLoading}
                    component={
                        <>
                            <Modal.Body>
                                <Input placeholder="Tag's name" onChange={setTagName} value={tagName} />
                                <Panel header="Connections" bordered className='mt-5'>
                                    {tagDetailData?.connections?.length > 0 ?
                                        <List size="md">
                                            {tagDetailData?.connections?.map((item, index) => (
                                                <List.Item key={index} index={index} className='flex justify-between w-full'>
                                                    <p>{item.name}</p>
                                                    <Button appearance="link" onClick={() => onDeleteConnectionTag(item.id, tagDetailData?.tag?.id)} startIcon={<TrashIcon />} className='hover:text-red-600'>
                                                    </Button>
                                                </List.Item>
                                            ))}
                                            </List>
                                        
                                        :
                                        <p>Empty data</p>
                                    }
                                </Panel>
                            </Modal.Body>
                            <Modal.Footer>
                                <AutoLoader
                                    display={!(deleteTagLoading || editTagLoading)}
                                    component={
                                        <>
                                            <Button onClick={confirmDeleteTag(tagDetailData?.tag?.id)} appearance="primary" className='bg-red-600 hover:bg-red-700'>
                                                Delete
                                            </Button>
                                            <Button onClick={handleCloseEdit} appearance="subtle">
                                                Cancel
                                            </Button>
                                            <Button onClick={editTag} appearance="primary" className='bg-blue-500'>
                                                Save
                                            </Button>
                                        </>
                                    }
                                />
                                
                            </Modal.Footer>
                        </>
                    }
                />
            </Modal>
        </Panel>
    );
};

export default ConnectionTags