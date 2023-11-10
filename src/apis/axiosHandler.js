import { refreshToken, getAuthentication, setAuthentication, signOut } from "@/helpers/authenHelpers";

const recallApi = async (rememberToken) => {
  try {
    const newAuth = await refreshToken(rememberToken);

    if (!newAuth.original?.error) {
      await setAuthentication(newAuth.original);
    }

    return api.request(error.config); // Use api here, not axios
  } catch (error) {
    // Handle any errors that may occur during the refresh process
    return Promise.reject(error);
  }
}

const errorHandler = async (error) => {
  if (error.response?.status == 401) {
    console.log(1);
    const rememberToken = getAuthentication().remember_token;
    console.log(2);
    if (rememberToken) {
      console.log(3);
      try {
        return await recallApi(rememberToken);
      } catch (refreshError) {
        // Handle errors that occur during the refresh process
        return Promise.reject(refreshError);
      }
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
