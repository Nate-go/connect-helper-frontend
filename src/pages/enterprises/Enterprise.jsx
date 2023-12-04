import { enterpriseEndpoints } from "@/apis";
import { useEffect, useState } from "react";

import { useApi, useConfirmation } from "@/hooks";
import { EnterpriseTable } from "@/components/table";
import { Grid, Panel, Button, ButtonToolbar } from 'rsuite';

import { GroupTemplateTable } from '@components/table';
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination, AutoLoader, BaseLoader } from '@/components';
import { PopupConfirm } from '@/components/popups';
import { getAuthentication } from '@/helpers/authenHelpers';

const Enterprise = () => {
  const { data: enterpriseData, loading: enterpriseLoading, callApi: handldeEnterprise } = useApi();

  const [pagination, setPagination] = useState({
    page: PaginationDefault.PAGE,
    limit: PaginationDefault.LIMIT,
    order: PaginationDefault.ORDER,
    column: PaginationDefault.COLUMN,
    search: PaginationDefault.SEARCH,
  });

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [fetchEnterprises, setFetchEnterprises] = useState(true);

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

  const handlePagination = (data) => {
    setPagination((prevPagination) => ({ ...prevPagination, ...data }));
    setFetchEnterprises(true);
  };

  const getUser = () => {
    handldeEnterprise(
      enterpriseEndpoints.get,
      {
        params: {
          ...pagination,
        }
      }
    );
  }

  const onEdit = (rowData) => {

  }

  useEffect(() => {
    if(!fetchEnterprises) return;
    getUser();
    setFetchEnterprises(false);
  }, [fetchEnterprises])

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
      <Panel header='Enterprises' shaded className='w-full h-full'>
        <AutoLoader
          display={enterpriseData?.data}
          component={
            <>
              <EnterpriseTable items={enterpriseData?.data?.items} dataLoading={enterpriseLoading} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onEdit={onEdit}/>
              <BasePagination pagination={enterpriseData?.data?.pagination} handlePagination={handlePagination} />
            </>
          }
        />
      </Panel>
    </Grid>
  );
};

export default Enterprise;
