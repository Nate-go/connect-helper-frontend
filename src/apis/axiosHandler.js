const errorHandler = (error) => {

  return Promise.reject(error);
};

const successHandler = (response) => {
  return response.data;
};

export { errorHandler, successHandler };
