import { useState, useEffect } from "react";
import api from "@/apis/axiosConfig";

export default function useFetch(endpoint, options, isCall) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      console.log('setLoading')
      setLoading(true);
      const response = await api.request(endpoint, options);
      setLoading(false);
      setData(response);
    } catch (error) {
      setLoading(false);
      setError(error.response);
    }
  };

  return { data, error, loading, fetchData };
}
