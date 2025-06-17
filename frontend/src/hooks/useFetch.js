import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        // console.log(res);

        if (!res.ok) {
          setError("Failed To Fetch");
          toast.error("Failed To Fetch");
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};
export default useFetch;
