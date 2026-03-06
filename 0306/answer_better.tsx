import { useState, useEffect } from "react";

// <T> 泛型型別參數，使用時在定義，現在先不定義
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  /**
   * Error 內會有 
   * ├─ message
   * ├─ stack
   * └─ name
   * 會比較詳細
   */
  error: Error | null;
  reload: () => Promise<void>;
}

// useFetch<T> => 這個函數不會先定義回傳的型別？用 <T> 標註
export function useFetch<T>(url:string): UseFetchResult<T> { // 回傳 UseFetchResult<T> 
  const [data, setData] = useState<T | null>(null);
  /**
   * ts 看到 false 會推導 false => boolean 所以 boolean 可以省略
   */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData(): Promise<void> {
    /**
     * 重新連線時清除 error
     */
    setError(null)
    setLoading(true);

    try {
      const res = await fetch(url);

      /**
       * 忘記補 因為可能是 404 500 不會回傳 json 所以可以提早寫讓錯誤被抓到
       */
      if (!res.ok) {
        throw new Error()
      }
      
      /**
       * 這邊可以直接用泛型就好，因為 res 不會回傳 null
       */
      const json: T = await res.json();



      setData(json);
    } catch (e:unknown) {
      if (e instanceof Error) {
        /**
         * 因為型別改成 Error 所以只需要帶原本的就好
         */
        setError(e);
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