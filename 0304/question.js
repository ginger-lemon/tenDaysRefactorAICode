import React, { useEffect, useState } from "react";

/**
 * 重點：async side effect 型別
 * 任務：AI 生成 fetch / async code → 你加 return type + error type handling
 */
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function fetchUsers() {
    setLoading(true);

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setUsers(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
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