const errorHandler = (error) => {
  const statusCode = error.response?.status;
  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }
  return Promise.reject(error);
};

const successHandler = (response) => {
  return response.data;
};

export { errorHandler, successHandler };
