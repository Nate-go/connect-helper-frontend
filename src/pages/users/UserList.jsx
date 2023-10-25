import { userEndpoints } from "@/apis";
import { useEffect } from "react";

import { useApi } from "@/hooks";
import { BaseLoader } from "@/components";

const UserList = () => {
  const { data: users, loading: userLoading, error: userError, callApi: handldeUser } = useApi();
  if (userLoading || !users) return <BaseLoader/>;

  useEffect(() => {
    handldeUser(
      userEndpoints.getAll,
      {}
    );
  }, [])

  return (
    <div>
      <h1>Home</h1>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <h2>name: {user.title}</h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
