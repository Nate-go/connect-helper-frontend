import { useState } from "react";
import api from "@/apis/axiosConfig";
import { signOut } from "@/helpers/authenHelpers";
import { useNavigate } from "react-router-dom";

const useApi = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const callApi = async (endpoint, options) => {
    try {
      setLoading(true);
      const response = await api.request(endpoint, options);
      setLoading(false);
      setData(response);
    } catch (error) {
      setLoading(false);
      setError(error.response);
      if (error.response?.status == 401) {
          signOut();
          navigate('/login');
      }
    }
  };

  return { data, error, loading, callApi };
}

export default useApi