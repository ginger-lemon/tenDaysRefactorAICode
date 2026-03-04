import React, { useEffect, useState } from "react";

/**
 * TypeScript 能保證程式操作型別正確
 * 但不能保證外部輸入資料符合型別
 */


interface User {
  name: string;
  email: string;
}

/**
 * 用狀態機的方式思考不同狀態會有哪些資料/state出現
 */
// fetch 狀態 idle | loading | success | error
type FetchState = {status: 'idle'} 
| {status: 'loading'} 
| {status: 'success', data: User[] }
| {status: 'error', message: string;}

export default function UserList() {
  // 可替換的
  const [fetchState, setFetchState] = useState<FetchState>({status: 'idle'})

  // 沒有回傳東西


  useEffect(() => {
    const controller = new AbortController()
    fetchUsers();

    async function fetchUsers():Promise<void> {
      setFetchState({status: 'loading'})
  
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users",
          // 如果要用 abortcontroller 要加
          { signal: controller.signal }
          
        );
        const data = await res.json();
  
        if (!res.ok) {
          // 假設後端是 FastAPI 且錯誤訊息統一格式
          throw new Error(data?.message) 
        }
  
        /**
         * 因為 fetch 會有 http 和 業務層的錯誤
         * 可以針對API回傳的欄位寫成 interface
         * interface ApiResponse<T> {
         *  ...
         * }
         * ...
         * const data: ApiResponse<User[]> = await res.json()
         * ...
         * ＊這種方式是API回傳封裝成一個函數並有明確回傳值，而非像現在這樣直接呼叫
         */
        
        setFetchState({status: 'success', data: data})
        
      } catch (err: unknown) {
        if (err instanceof Error) {
          setFetchState({status: 'error', message: err.message})
        }
        
      } finally {
        setFetchState({status: 'idle'})
      }
      
    }

    // ＊避免 unmount state stack 
    // 用 controller.abort 取消請求
    return () => controller.abort()
   
  }, []);

  if (fetchState.status === 'loading') return <div>Loading...</div>;

  if (fetchState.status === 'error') return <div>Error: {fetchState?.message}</div>;

  return (
    <div>
      <h1>User List</h1>
      {fetchState.status === 'success' && fetchState.data.map((u, idx) => (
        <div key={idx}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}


/**
 * GPT 提供的工程合理版
 */
function Answer() {
  const [fetchState, setFetchState] = useState<FetchState>({status: 'idle'})

  useEffect(() => {
    const controller = new AbortController()
  
    async function fetchUsers(): Promise<void> {
      setFetchState({ status: 'loading' })
  
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        )
  
        const raw: unknown = await res.json()
  
        if (!res.ok) {
          throw new Error(
            typeof raw === "object" && raw && "message" in raw
              ? String((raw as any).message)
              : "Network error"
          )
        }
  
        if (!Array.isArray(raw)) {
          throw new Error("Invalid response format")
        }
  
        setFetchState({
          status: 'success',
          data: raw as User[]
        })
  
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setFetchState({ status: 'error', message: err.message })
          }
        } else {
          setFetchState({ status: 'error', message: 'Unknown error' })
        }
      }
    }
  
    fetchUsers()
  
    return () => controller.abort()
  }, [])

  return (<>...</>)
}
