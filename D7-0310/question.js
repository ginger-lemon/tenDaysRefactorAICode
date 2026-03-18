import React, { useEffect, useState } from "react";

/**
 * 本日重點：
 * 1. fetch API
 * 2. 資料處理
 * 3. 錯誤處理
 * 4. 混亂型別
 * 5. 定義 interface / type + service layer
 */
/**
 * 任務：
 * - 建立 API response type
 * - 建立 domain model type
 * - 把 fetch 拆到 service
 * - 加上 error handling
 * - component 只處理 UI
 */


export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadUsers() {
    setLoading(true);

    try {
      const res = await fetch("https://api.example.com/users");

      const data = await res.json();

      const list = data.data.map((u) => {
        return {
          id: u.id,
          name: u.first_name + " " + u.last_name,
          email: u.email,
          isActive: u.status === "active",
          score: Math.round(u.points / 10),
        };
      });

      setUsers(list);
    } catch (e) {
      console.log("error loading users", e);
      setError("failed");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <div>loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User list</h1>

      {users.map((u) => (
        <div key={u.id}>
          <b>{u.name}</b>
          <div>{u.email}</div>
          <div>{u.isActive ? "active" : "inactive"}</div>
          <div>score: {u.score}</div>
        </div>
      ))}
    </div>
  );
}