import { useState, useEffect } from "react";
import api from "@/apis/axiosConfig";

export default function useFetch(endpoint, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.request(endpoint, options);

        setLoading(false);
        setData(response);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
}
