import { useCallback, useEffect, useState } from "react";

const useFetch = (fetchFunction, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchFunction(...params);

        setData(response);

        return response;
      } catch (err) {
        console.error(err);
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  useEffect(() => {
    if (!autoFetch) return;

    const loadData = async () => {
      await execute();
    };

    loadData();
  }, [autoFetch, execute]);

  return {
    data,
    loading,
    error,
    execute,
    setData,
  };
};

export default useFetch;