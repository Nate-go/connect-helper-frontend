import { useState } from "react";
import api from "@/apis/axiosConfig";

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
    } catch (error) {
      setLoading(false);
      setError(error.response);
    }
  };

  return { data, error, loading, callApi };
}

export default useApi