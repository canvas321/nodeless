import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFect = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMuounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMuounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMuounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMuounted && setTimeout(() => setIsLoading(false));
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMuounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFect;
