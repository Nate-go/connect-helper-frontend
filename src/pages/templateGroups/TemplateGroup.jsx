import { Grid, Row, Col, Panel, Button, ButtonToolbar, useToaster } from 'rsuite';
import { useState, useEffect } from 'react';

import { GroupTemplateTable } from '@components/table';
import { templateGroupEndpoints } from '@/apis'
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination, AutoLoader } from '@/components';
import { getIds } from '@/helpers/dataHelpers';
import { useConfirmation, useApi } from '@/hooks';
import { PopupConfirm } from '@/components/popups';
import { ConfirmType, ConnectionStatus } from '@/constants';
import { TemplateGroupToolbar, DrawerEditTemplateGroup } from './components';
import { getAuthentication } from '@/helpers/authenHelpers';

const TemplateGroup = () => {
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
        search: PaginationDefault.SEARCH,
        statuses: []
    });

    const [fetchTemplateGroup, setFetchTemplateGroup] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [editTemplateGroup, setEditTemplateGroup] = useState({
        open: false,
        item: null,
    })

    const { data: templateGroupData, callApi: handleGetTemplateGroups, loading: templateGroupLoading } = useApi();
    const { callApi: handleDeleteTemplateGroups, loading: deleteTemplateGroupLoading } = useApi();
    const { callApi: handleUpdateTemplateGroups } = useApi();

    useEffect(() => {
        if (!fetchTemplateGroup) return;
        handleGetTemplateGroups(templateGroupEndpoints.get, {
            params: {
                ...pagination,
            }
        })
        setFetchTemplateGroup(false);
        setCheckedKeys([]);
    }, [fetchTemplateGroup]);

    const handlePagination = (data) => {
        setPagination((prevPagination) => ({ ...prevPagination, ...data }));
        setFetchTemplateGroup(true);
    };

    const deleteTemplateGroups = async (ids) => {
        await handleDeleteTemplateGroups(
            templateGroupEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );

        setFetchTemplateGroup(true);
    };


    const updateTemplateGroups = async (updateData, ids) => {
        await handleUpdateTemplateGroups(
            templateGroupEndpoints.update,
            {
                "method": "PUT",
                data: {
                    ids,
                    data: updateData
                }
            }
        );

        setFetchTemplateGroup(true);
    }

    const confirmDeleteTemplateGroup = (rowData) => {
        openConfirmation(deleteTemplateGroups, [[rowData.id]], 'Are you sure to delete this template group ?');
    }

    const onEdit = (rowData) => {
        setEditTemplateGroup({
            open: true,
            item: {
                ...rowData
            }
        });
    }

    const confirmChangeStatus = () => {
        openConfirmation(
            updateTemplateGroups,
            [{ 'status': confirmValue }, getIds(checkedKeys)],
            'Select status to finish action change status',
            Object.entries(ConnectionStatus).map(([label, value]) => ({ label, value })),
            ConfirmType.ONE_SELECTION
        );
    }

    const confirmDeleteTemplateGroups = () => {
        openConfirmation(deleteTemplateGroups, [getIds(checkedKeys)], 'Are you sure to delete ' + checkedKeys.length + ' selected connection ?');
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
            {editTemplateGroup.item &&
                <DrawerEditTemplateGroup
                    open={editTemplateGroup.open}
                    handleClose={() => { 
                        setEditTemplateGroup({ open: false, item: null });
                        setFetchTemplateGroup(true);
                    }}
                    openConfirmation={openConfirmation}
                    templateGroupItem={editTemplateGroup.item}
                />
            }
            <Panel header='Template groups' shaded className='w-full h-full'>
                <TemplateGroupToolbar
                    checkedKeys={checkedKeys}
                    deleteTemplateGroups={confirmDeleteTemplateGroups}
                    changeStatus={confirmChangeStatus}
                    openConfirmation={openConfirmation}
                    setFetch={setFetchTemplateGroup}
                />
                <AutoLoader
                    display={templateGroupData?.data}
                    component={
                        <>
                            <GroupTemplateTable items={templateGroupData?.data?.items} dataLoading={(templateGroupLoading || deleteTemplateGroupLoading )} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteTemplateGroup} onEdit={onEdit} />
                            <BasePagination pagination={templateGroupData?.data?.pagination} handlePagination={handlePagination} />
                        </>
                    }
                />
            </Panel>
        </Grid>
    );
};

export default TemplateGroup