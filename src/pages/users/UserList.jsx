import { userEndpoints } from "@/apis";

import { useFetch } from "@/hooks";
import { BaseLoader } from "@/components";

const UserList = () => {
  const { data: users, loading: userLoading } = useFetch(
    userEndpoints.getAll,
    {}
  );
  if (userLoading || !users) return <BaseLoader/>;

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
