/** 
 * 下面這段是刻意寫壞的 React + JS 程式碼。
 * 請你：
 * 改成 TypeScript
 * 為所有 state 加上明確 generic 型別
 * 移除隱式 any
 * 修正不安全的型別行為
 * 保留功能（不要改邏輯，只改結構與型別安全）
*/

import React, { useState, useEffect } from "react";

export default function UserPanel() {
  const [user, setUser] = useState();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    setLoading(true);
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUser(data);
      setList(data.items);
    } catch (e) {
      setError("failed");
    } finally {
      setLoading(false);
    }
  }

  function addItem(item) {
    setList([...list, item]);
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  const filtered = list.filter((x) =>
    x.name.includes(filter)
  );

  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {user && <h2>{user.name}</h2>}

      <input value={filter} onChange={handleFilterChange} />

      <ul>
        {filtered.map((item, i) => (
          <li key={i}>
            {item.name} - {item.age}
          </li>
        ))}
      </ul>

      <button onClick={() => addItem({ name: "New", age: 18 })}>
        Add
      </button>
    </div>
  );
}