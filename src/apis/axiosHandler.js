import { getAuthentication, setAuthentication, signOut } from "@/helpers/authenHelpers";
import api from "./axiosConfig";
import authenticationEndpoints from "./enpoints/authentication";

let isRefreshing = false;
let refreshQueue = [];

const recallApi = async (rememberToken) => {
  try {
    const newAuth = await api.post(authenticationEndpoints.refresh, { remember_token: rememberToken });

    if (!newAuth.original?.error) {
      await setAuthentication(newAuth.original);
    }

    refreshQueue.forEach((request) => request());
    
    refreshQueue = [];

    return api.request(error.config); 
  } catch (refreshError) {
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

const queueRequestPush = (error) => {
  return new Promise((resolve, reject) => {
    refreshQueue.push(() => {
      try {
        resolve(api.request(error.config));
      } catch (queueError) {
        reject(queueError);
      }
    });
  });
}

const errorHandler = async (error) => {
  if (error.response?.status === 401) {
    const rememberToken = getAuthentication().remember_token;

    if (rememberToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        recallApi(rememberToken);
        return queueRequestPush(error);
      } else {
        return queueRequestPush(error);
      }
    }
  }

  return Promise.reject(error);
};

const successHandler = (response) => {
  return response.data;
};

export { errorHandler, successHandler };
