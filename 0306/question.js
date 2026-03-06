import { useState, useEffect } from "react";

/**
 * 1️⃣ 為 hook 定義 return type
 * 2️⃣ 確保 state / data 型別一致
 * 3️⃣ 改寫為 generic hook（可重用）
 */

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function fetchData() {
    setLoading(true);

    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
    reload: fetchData
  };
}