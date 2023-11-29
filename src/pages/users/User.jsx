import { userEndpoints } from "@/apis";
import { useEffect, useState } from "react";

import { useApi, useConfirmation } from "@/hooks";
import { UserTable } from "@/components/table";
import { Grid, Panel, Button, ButtonToolbar } from 'rsuite';

import { GroupTemplateTable } from '@components/table';
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination, AutoLoader, BaseLoader } from '@/components';
import { PopupConfirm } from '@/components/popups';
import { getAuthentication } from '@/helpers/authenHelpers';

const User = () => {
  const { data: userData, loading: userLoading, callApi: handldeUser } = useApi();
  const { data: deleteUserData, loading: deleteUserLoading, callApi: handldeDeleteUser } = useApi();

  const [pagination, setPagination] = useState({
    page: PaginationDefault.PAGE,
    limit: PaginationDefault.LIMIT,
    order: PaginationDefault.ORDER,
    column: PaginationDefault.COLUMN,
    search: PaginationDefault.SEARCH,
  });

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [fetchUsers, setFetchUsers] = useState(true);

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
    setFetchUsers(true);
  };

  const getUser = () => {
    handldeUser(
      userEndpoints.get,
      {
        params: {
          ...pagination,
        }
      }
    );
  }

  const deleteUsers = (ids) => {
    handldeDeleteUser(userEndpoints.delete, 
      {
        method: "DELETE",
        data: {
          ids
        }
      }
    )

    setFetchUsers(true);
  }

  const confirmDeleteUsers = () => {
    openConfirmation(deleteUsers, [checkedKeys], "Are you sure to delete " + checkedKeys.length + " users ?");
  }

  const confirmDeleteUser = (id) => {
    openConfirmation(deleteUsers, [[id]], "Are you sure to delete this user ?");
  }

  useEffect(() => {
    if(!fetchUsers) return;
    getUser();
    setFetchUsers(false);
  }, [fetchUsers])

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
      <Panel header='Template groups' shaded className='w-full h-full'>
        <AutoLoader
          display={userData?.data}
          component={
            <>
              <UserTable items={userData?.data?.items} dataLoading={userLoading} handleSort={handlePagination} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} onDelete={(rowData) => confirmDeleteUser(rowData.id)} onDeletes={confirmDeleteUsers}/>
              <BasePagination pagination={userData?.data?.pagination} handlePagination={handlePagination} />
            </>
          }
        />
      </Panel>
    </Grid>
  );
};

export default User;
