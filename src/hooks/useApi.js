import { useState } from "react";
import api from "@/apis/axiosConfig";
import { toast } from 'react-toastify';

const useApi = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint, options) => {
    try {
      setLoading(true);
      const response = await api.request(endpoint, options);
      setLoading(false);
      setData(response);

      if(response.message) {
        toast.success(response.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response);

      if(error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return { data, error, loading, callApi };
}

export default useApi