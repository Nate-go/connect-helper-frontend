import { Grid, Row, Col, Panel, Button, ButtonToolbar, useToaster } from 'rsuite';
import { ConnectionTags, ConnectionStatuses, ConnectionToolbar } from './components';
import { useState, useEffect } from 'react';

import { BaseTable } from '@components/table';
import {connectionEndpoints, tagEndpoints} from '@/apis'
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination, AutoLoader } from '@/components';
import { getIds } from '@/helpers/dataHelpers';
import { useConfirmation, useApi } from '@/hooks';
import { PopupConfirm } from '@/components/popups';
import { ConfirmType, AccessStatus } from '@/constants';
import { DrawerEditConnection } from './components';


const Connection = () => {
    const [tags, setTags] = useState([]);
    const {
        isConfirmationOpen,
        openConfirmation,
        handleConfirm,
        handleCancel,
        confirmType,
        confirmData,
        confirmValue,
        setConfirmValue,
        message
    } = useConfirmation();

    const [pagination, setPagination] = useState({
        page: PaginationDefault.PAGE,
        limit: PaginationDefault.LIMIT,
        order: PaginationDefault.ORDER,
        column: PaginationDefault.COLUMN,
        search: PaginationDefault.SEARCH
    });

    const [statuses, setStatuses] = useState([]);
    const [fetchConnection, setFetchConnection] = useState(true);
    const [fetchTag, setFetchTag] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [editConnection, setEditConnection] = useState({
        open: false,
        id: null,
    })

    const { data: connectionData, callApi: handleGetConnections, loading: connectionLoading } = useApi();
    const { callApi: handleDeleteConnections, loading: deleteConnectionLoading } = useApi();
    const { callApi: handleMergeConnections, loading: mergeConnectionLoading } = useApi();
    const { callApi: handleUpdateConnections } = useApi();
    const { data: tagData, callApi: handleGetTags } = useApi();
    const { callApi: handleAddTagToConnections, loading: addTagToConnectionsLoading } = useApi();

    useEffect(() => {
        if(!fetchConnection) return;
        handleGetConnections(connectionEndpoints.get, {
            params: {
                ...pagination,
                tags,
                statuses
            }
        })
        setFetchConnection(false);
        setCheckedKeys([]);
    }, [fetchConnection]);

    useEffect(() => {
        if(!fetchTag) return;
        handleGetTags(tagEndpoints.get, {});
        setFetchTag(false);
    }, [fetchTag]);

    const handleTags = (newTags) => {
        setTags(newTags);
        handlePagination({ page: 1 });
    }

    const handleStatuses = (newStatuses) => {
        setStatuses(newStatuses);
        handlePagination({ page: 1 });
    }

    const handlePagination = (data) => {
        setPagination({
            ...pagination,
            ...data
        })
        setFetchConnection(true);
    };

    const deleteConnections = async (ids) => {
        await handleDeleteConnections(
            connectionEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids } 
            }
        );

        setFetchConnection(true);
    };

    const mergeConnections = async (main, ids) => {
        await handleMergeConnections(
            connectionEndpoints.merge,
            {
                params: {
                    ids,
                    main
                }
            }
        );

        setFetchConnection(true);
    };

    const updateConnection = async (updateData, ids) => {
        await handleUpdateConnections(
            connectionEndpoints.update,
            {
                "method":"PUT",
                data: { 
                    ids,
                    data: updateData
                }
            }
        );

        setFetchConnection(true);
    }

    const addTagToConnections = async (tagIds, connectionIds) => {
        await handleAddTagToConnections(
            connectionEndpoints.addTags,
            {
                method: "POST",
                data: {
                    connectionIds,
                    tagIds
                }
            }
        );

        setFetchConnection(true);
    }

    const confirmDeleteConnection = (rowData) => {
        openConfirmation(deleteConnections, [[rowData.id]], 'Are you sure to delete this connection ?');
    }

    const onEdit = (rowData) => {
        setEditConnection({
            open: true,
            id: rowData['id']
        })
    }

    const confirmChangeStatus = () => {
        openConfirmation(
            updateConnection,
            [{ 'status': confirmValue }, getIds(checkedKeys)],
            'Select status to finish action change status',
            Object.entries(AccessStatus).map(([label, value]) => ({ label, value })),
            ConfirmType.ONE_SELECTION
        );
    }

    const confirmMergeConnections = () => {
        openConfirmation(
            mergeConnections,
            [confirmValue, getIds(checkedKeys)],
            'Select main connection to finish action merge',
            checkedKeys.map(item => ({
                label: item.name,
                value: item.id
            })),
            ConfirmType.ONE_SELECTION
        );
    }

    const confirmDeleteConnections = () => {
        openConfirmation(deleteConnections, [getIds(checkedKeys)], 'Are you sure to delete ' + checkedKeys.length + ' selected connection ?');
    }

    const confirmAddTags = () => {
        openConfirmation(
            addTagToConnections,
            [confirmValue, getIds(checkedKeys)],
            'Select multi tags to finish action add tag',
            tagData?.map(item => ({
                label: item.name,
                value: item.id
            })),
            ConfirmType.MULTI_SELECTION
        );
    }

    return (
        <Grid fluid>
            <PopupConfirm
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                type={confirmType}
                data={confirmData}
                message={() => message()}
                setValue={setConfirmValue}
                open={isConfirmationOpen}
            />
            {editConnection.id && 
                <DrawerEditConnection
                    open={editConnection.open}
                    handleClose={() => { setEditConnection({open:false, id:null}); setFetchConnection(true) }}
                    openConfirmation={openConfirmation}
                    tagData={tagData}
                    setFetchTag={setFetchTag}
                    connectionId={editConnection.id}
                />
            }
            

            <Row className="show-grid">
                <Col xs={24} sm={24} md={5} className='sm:mb-4'>
                    <Panel header='Actions' shaded className='w-full h-full'>
                        <div className='flex flex-col w-full h-full gap-4'>
                            <ConnectionStatuses setStatuses={handleStatuses} />
                            <hr />
                            <AutoLoader 
                                display={tagData} 
                                component={
                                    <ConnectionTags tagData={tagData} setTags={handleTags} openConfirmation={openConfirmation} setFetchTag={setFetchTag} />
                                }
                            />
                        </div>
                    </Panel>
                </Col>

                <Col xs={24} sm={24} md={19}>
                    <div className='w-full h-full'>
                        <Panel header='Connections' shaded className='w-full h-full'>
                            <ConnectionToolbar 
                                checkedKeys={checkedKeys} 
                                deleteConnections={confirmDeleteConnections}
                                changeStatus={confirmChangeStatus}
                                mergeConnections={confirmMergeConnections}
                                addTags={confirmAddTags}
                                openConfirmation={openConfirmation}
                                tagData={tagData}
                                setFetchTag={setFetchTag}
                                setFetchData={setFetchConnection}
                            />
                            <AutoLoader
                                display={connectionData?.data}
                                component={
                                    <>
                                        <BaseTable items={connectionData?.data?.items} dataLoading={(connectionLoading || deleteConnectionLoading || mergeConnectionLoading || addTagToConnectionsLoading)} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteConnection} onEdit={onEdit}/>
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