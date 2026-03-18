import { useState, useEffect } from "react";

// <T> 泛型型別參數，使用時在定義，現在先不定義
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

// useFetch <T> => 這個函數不會先定義回傳的型別？用 <T> 標註
export function useFetch<T>(url:string): UseFetchResult<T> { // 回傳 UseFetchResult<T> 
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData(): Promise<void> {
    setLoading(true);

    try {
      const res = await fetch(url);
      const json: UseFetchResult<T>["data"] = await res.json();
      setData(json);
    } catch (e:unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
      
    } finally {
      setLoading(false);
    }

    
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