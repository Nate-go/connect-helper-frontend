import { Grid, Row, Col, Panel, Button, ButtonToolbar, useToaster } from 'rsuite';
import { useState, useEffect } from 'react';

import { EmailScheduleTable } from '@components/table';
import { emailScheduleEndpoints } from '@/apis'
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination, AutoLoader } from '@/components';
import { getIds } from '@/helpers/dataHelpers';
import { useConfirmation, useApi } from '@/hooks';
import { PopupConfirm } from '@/components/popups';
import { ConfirmType, ScheduleMailStatus } from '@/constants';
import { EmailScheduleToolbar, DrawerEditEmailSchedule } from './components';
import { getAuthentication } from '@/helpers/authenHelpers';

const EmailSchedule = () => {
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

    const [fetchEmailSchedule, setFetchEmailSchedule] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [editEmailSchedule, setEditEmailSchedule] = useState({
        open: false,
        item: null,
    })

    const { data: emailScheduleData, callApi: handleGetEmailSchedules, loading: emailScheduleLoading } = useApi();
    const { callApi: handleDeleteEmailSchedules, loading: deleteEmailScheduleLoading } = useApi();
    const { callApi: handleUpdateEmailSchedules } = useApi();

    useEffect(() => {
        if (!fetchEmailSchedule) return;
        handleGetEmailSchedules(emailScheduleEndpoints.get, {
            params: {
                ...pagination,
            }
        })
        setFetchEmailSchedule(false);
        setCheckedKeys([]);
    }, [fetchEmailSchedule]);

    const handlePagination = (data) => {
        setPagination((prevPagination) => ({ ...prevPagination, ...data }));
        setFetchEmailSchedule(true);
    };

    const deleteEmailSchedules = async (ids) => {
        await handleDeleteEmailSchedules(
            emailScheduleEndpoints.delete,
            {
                method: 'DELETE',
                data: { ids }
            }
        );

        setFetchEmailSchedule(true);
    };


    const updateEmailSchedules = async (updateData, ids) => {
        await handleUpdateEmailSchedules(
            emailScheduleEndpoints.update,
            {
                "method": "PUT",
                data: {
                    ids,
                    data: updateData
                }
            }
        );

        setFetchEmailSchedule(true);
    }

    const confirmDeleteEmailSchedule = (rowData) => {
        openConfirmation(deleteEmailSchedules, [[rowData.id]], 'Are you sure to delete this template group ?');
    }

    const onEdit = (rowData) => {
        setEditEmailSchedule({
            open: true,
            item: {
                ...rowData
            }
        });
    }

    const confirmChangeStatus = () => {
        openConfirmation(
            updateEmailSchedules,
            [{ 'status': confirmValue }, getIds(checkedKeys)],
            'Select status to finish action change status',
            Object.entries(ScheduleMailStatus).map(([label, value]) => ({ label, value })),
            ConfirmType.ONE_SELECTION
        );
    }

    const confirmDeleteEmailSchedules = () => {
        openConfirmation(deleteEmailSchedules, [getIds(checkedKeys)], 'Are you sure to delete ' + checkedKeys.length + ' selected connection ?');
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
            {editEmailSchedule.item &&
                <DrawerEditEmailSchedule
                    open={editEmailSchedule.open}
                    handleClose={() => { 
                        setEditEmailSchedule({ open: false, item: null });
                        setFetchEmailSchedule(true);
                    }}
                    openConfirmation={openConfirmation}
                    emailScheduleItem={editEmailSchedule.item}
                />
            }
            <Panel header='Template groups' shaded className='w-full h-full'>
                <EmailScheduleToolbar
                    checkedKeys={checkedKeys}
                    deleteEmailSchedules={confirmDeleteEmailSchedules}
                    changeStatus={confirmChangeStatus}
                    openConfirmation={openConfirmation}
                    setFetch={setFetchEmailSchedule}
                />
                <AutoLoader
                    display={emailScheduleData?.data}
                    component={
                        <>
                            <EmailScheduleTable items={emailScheduleData?.data?.items} dataLoading={(emailScheduleLoading || deleteEmailScheduleLoading )} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={confirmDeleteEmailSchedule} onEdit={onEdit} />
                            <BasePagination pagination={emailScheduleData?.data?.pagination} handlePagination={handlePagination} />
                        </>
                    }
                />
            </Panel>
        </Grid>
    );
};

export default EmailSchedule