import { Grid, Row, Col, Panel, Button, ButtonToolbar, useToaster } from 'rsuite';
import { ConnectionTags, ConnectionStatuses } from './components';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { BaseTable } from '@components/table';
import useApi from '@/hooks/useApi';
import {connectionEndpoints, tagEndpoints} from '@/apis'
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination, AutoLoader } from '@/components';
import { TrashIcon, CombinationIcon, TbStatusChange, PlusIcon, AiOutlineTags } from '@/components/icons';
import ConnectionStatus from '@/constants/ConnectionStatus';
import {ConfirmAction, ConfirmActionSelect} from '@/components/confirms';
import { getIds } from '@/helpers/dataHelpers';

const Connection = () => {
    const [tags, setTags] = useState([]);

    const [confirmPopup, setConfirmPopup] = useState({
        open: false,
        onConfirm: () => {},
        message: ''
    })
    
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);
    const [callDelete, setCallDelete] = useState(false);

    const [openSelect, setOpenSelect] = useState(false);
    const [selectMessage, setSelectMessage] = useState('');
    const [selectAction, setSelectAction] = useState(null);
    const [selectData, setSelectData] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [callUpdate, setCallUpdate] = useState(false);
    const [callMerge, setCallMerge] = useState(false);
    const [callAddTags, setCallAddTags] = useState(false);

    const [pagination, setPagination] = useState({
        page: PaginationDefault.PAGE,
        limit: PaginationDefault.LIMIT,
    });
    const [sort, setSort] = useState({
        order: PaginationDefault.ORDER,
        column: PaginationDefault.COLUMN
    });
    const [statuses, setStatuses] = useState([]);
    const [fetchConnection, setFetchConnection] = useState(true);
    const [fetchTag, setFetchTag] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const { data: connectionData, callApi: handleGetConnections, loading: connectionLoading } = useApi();
    const { callApi: handleDeleteConnections, loading: deleteConnectionLoading } = useApi();
    const { data: mergeConnectionData, callApi: handleMergeConnections, loading: mergeConnectionLoading } = useApi();
    const { data: updateConnectionData, callApi: handleUpdateConnections } = useApi();
    const { data: tagData, callApi: handleGetTags } = useApi();
    const { data: addTagToConnectionData, callApi: handleAddTagToConnections, loading: addTagToConnectionsLoading } = useApi();

    useEffect(() => {
        if(!fetchConnection) return;
        handleGetConnections(connectionEndpoints.get, {
            params: {
                ...pagination,
                ...sort,
                tags,
                statuses
            }
        })
        setFetchConnection(false);
        setCheckedKeys([]);
    }, [fetchConnection]);

    useEffect(() => {
        handleGetTags(tagEndpoints.get, {});
    }, [fetchTag]);

    useEffect(() => {
        if(!callDelete) return;
        confirmDelete();
        setCallDelete(false);
    }, [callDelete]);

    useEffect(() => {
        if (!callUpdate) return;
        updateStatusData();
        setCallUpdate(false);
    }, [callUpdate]);

    useEffect(() => {
        if (!callMerge) return;
        getMergeValue();
        setCallMerge(false);
    }, [callMerge]);

    useEffect(() => {
        if (!callAddTags) return;
        addTagToConnections(selectValue);
        setCallAddTags(false);
    }, [callAddTags]);

    const handleTags = (newTags) => {
        setTags(newTags);
        setPagination(1, pagination.limit);
        setFetchConnection(true);
    }

    const handleStatuses = (newStatuses) => {
        setStatuses(newStatuses);
        setPagination(1, pagination.limit);
        setFetchConnection(true);
    }

    const handlePagination = (page, limit) => {
        setPagination({
            page,
            limit,
        })
        setFetchConnection(true);
    };

    const handleSort = (column, order) => {
        setSort({
            order,
            column
        })
        setFetchConnection(true);
    };

    const deleteConnection = async () => {
        await handleDeleteConnections(
            connectionEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids: getIds(checkedKeys) } 
            }
        );

        setFetchConnection(true);
    };

    const mergeConnection = async (mainConnection) => {
        await handleMergeConnections(
            connectionEndpoints.merge,
            {
                params: {
                    ids: getIds(checkedKeys),
                    main: mainConnection
                }
            }
        );

        setFetchConnection(true);
    };

    const updateConnection = async (updateData) => {
        await handleUpdateConnections(
            connectionEndpoints.update,
            {
                "method":"PUT",
                data: { 
                    ids: getIds(checkedKeys),
                    data: updateData 
                }
            }
        );

        setFetchConnection(true);
    }

    const addTagToConnections = async (tagIds) => {
        await handleAddTagToConnections(
            connectionEndpoints.addTags,
            {
                method: "POST",
                data: {
                    connectionIds: getIds(checkedKeys),
                    tagIds
                }
            }
        );

        setFetchConnection(true);
    }

    const confirmDelete = () => {
        setConfirmAction(() => deleteConnection);
        setConfirmMessage('Are you sure to delete ' + checkedKeys.length + ' connections?');
        setOpenConfirm(true);
    }

    const getMergeValue = () => {
        mergeConnection(selectValue);
    }

    const singleDelete = (rowData) => {
        setCheckedKeys([rowData]);
        setCallDelete(true);
    }

    const onEdit = (rowData) => {
        alert(rowData['id']);
    }

    const changeStatus = () => {
        setSelectAction(() => setCallUpdate);
        setSelectData(Object.entries(ConnectionStatus).map(([label, value]) => ({ label, value })));
        setSelectMessage('Select status to finish action change status');
        setOpenSelect(true);
    }

    const selectMergeConnection = () => {
        setSelectAction(() => setCallMerge);
        setSelectData(checkedKeys.map(item => ({
            label: item.name,
            value: item.id
        })));
        setSelectMessage('Select main connection to finish action merge');
        setOpenSelect(true);
    }

    const updateStatusData = () => {
        updateConnection({
            'status': selectValue
        });
    }

    const addTag = () => {
        setSelectAction(() => setCallAddTags);
        setSelectData(tagData?.map(item => ({
            label: item.name,
            value: item.id
        })));
        setSelectMessage('Select multi tags to finish action add tag to connection');
        setOpenSelect(true);
    }

    useEffect(() => {
        if(!mergeConnectionData) return;

        toast.success(mergeConnectionData.message);

    }, [mergeConnectionData])

    useEffect(() => {
        if (!updateConnectionData) return;

        toast.success(updateConnectionData.message);

    }, [updateConnectionData])

    useEffect(() => {
        if (!addTagToConnectionData) return;

        toast.success(addTagToConnectionData.message);

    }, [addTagToConnectionData]);

    return (
        <Grid fluid>
            <ConfirmAction confirmAction={confirmAction} message={confirmMessage} open={openConfirm} setOpen={setOpenConfirm}/>
            <ConfirmActionSelect confirmAction={selectAction} message={selectMessage} open={openSelect} setOpen={setOpenSelect} data={selectData} setValue={setSelectValue}/>
            <Row className="show-grid">
                <Col xs={24} sm={24} md={5} className='sm:mb-4'>
                    <Panel header='Actions' shaded className='w-full h-full'>
                        <div className='flex flex-col w-full h-full gap-4'>
                            <ConnectionStatuses setStatuses={handleStatuses} />
                            <hr />
                            <AutoLoader 
                                display={tagData} 
                                component={
                                    <ConnectionTags tagData={tagData} setTags={handleTags} />
                                }
                            />
                        </div>
                    </Panel>
                </Col>
                <Col xs={24} sm={24} md={19}>
                    <div className='w-full h-full'>
                        <Panel header='Connections' shaded className='w-full h-full'>
                            <ButtonToolbar className='pb-4'>
                                <Button color="green" className='bg-green-600' appearance="primary" startIcon={<PlusIcon />} onClick={() => {}}>
                                    New connection
                                </Button>
                                <Button disabled={!checkedKeys.length} color="red" className='bg-red-600' appearance="primary" startIcon={<TrashIcon />} onClick={() => setCallDelete(true)}>
                                    Delete
                                </Button>
                                <Button disabled={checkedKeys.length < 2} color="yellow" className='bg-yellow-500' appearance="primary" startIcon={<CombinationIcon />} onClick={selectMergeConnection}>
                                    Merge
                                </Button>
                                <Button disabled={!checkedKeys.length} color="cyan" className='bg-cyan-500' appearance="primary" startIcon={<TbStatusChange />} onClick={changeStatus}>
                                    Change status
                                </Button>
                                <Button disabled={!checkedKeys.length} color='violet' className='bg-violet-700' appearance="primary" startIcon={<AiOutlineTags />} onClick={addTag}>
                                    Add tag
                                </Button>
                            </ButtonToolbar>
                            <AutoLoader
                                display={connectionData?.data}
                                component={
                                    <>
                                        <BaseTable items={connectionData?.data?.items} dataLoading={(connectionLoading || deleteConnectionLoading || mergeConnectionLoading || addTagToConnectionsLoading)} handleSort={handleSort} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={singleDelete} onEdit={onEdit}/>
                                        <BasePagination pagination={connectionData?.data?.pagination} handlePagination={handlePagination} />
                                    </>
                                }
                            />
                        </Panel>
                    </div>
                </Col>
            </Row>
        </Grid>
    );
};

export default Connection