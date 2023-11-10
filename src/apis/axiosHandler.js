import { refreshToken, getAuthentication, setAuthentication, signOut } from "@/helpers/authenHelpers";

const errorHandler = async (error) => {
  if (error.response?.status == 401) {
    console.log(1);
    const rememberToken = getAuthentication().remember_token;
    console.log(2);
    if (rememberToken) {
      console.log(3);
      const newAuth = refreshToken(rememberToken);
      console.log(4);

      if (!newAuth.original?.error) {
        console.log(5);

        await setAuthentication(newAuth.original);
      }
      console.log(6);

      console.log(getAuthentication());
      return axios.request(error.config);
    }
    // signOut();
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

const successHandler = (response) => {
  return response.data;
};

export { errorHandler, successHandler };
