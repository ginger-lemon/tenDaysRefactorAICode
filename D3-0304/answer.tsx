import React, { useEffect, useState } from "react";


interface User {
  name: string;
  email: string;
}

// fetch 狀態 idle | loading | success | error
type FetchState = 'idle' | 'loading' | 'error'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // 可替換的
  const [fetchState, setFetchState] = useState<FetchState>('idle')

  // 沒有回傳東西
  async function fetchUsers():Promise<void> {
    setFetchState('loading')
    // setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      if (!res.ok) {
        // 假設後端是 FastAPI 且錯誤訊息統一格式
        throw new Error(data.message) 
      }

      
      setUsers(data)
      
    } catch (err: unknown) {
      
      setFetchState('error')
      // 不會處理⋯⋯
      setError(err.message)
      
    } finally {
      setFetchState('idle')
      // setLoading(false)
    }
    
  }

  useEffect(() => {
    fetchUsers();

    // ＊避免 unmount state stack 
  
    return () =>  setUsers([])
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User List</h1>
      {users.map((u, idx) => (
        <div key={idx}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}