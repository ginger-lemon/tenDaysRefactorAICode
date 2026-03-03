import React, { useState, useEffect } from "react";

/**
 * React 使用 ts 目的：
 * - 讓資料流在編譯時就可被驗證
 * - 確保資料流在元件樹中型別一致
 * 思考步驟：
 * 1. 定義資料模型
 * 2. 定義 API 回傳型別
 * 3. 定義 state 型別
 * 4. 定義 props （若有子元件）
 * 5. 定義函數型別
 */

interface UserItem {
  name: string;
  age: number;
}
interface User {
  name: string;
  items: UserItem[];
}


export default function UserPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [list, setList] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser(): Promise<void> {
    setLoading(true);
    try {
      const res = await fetch("/api/user");
      const data: User = await res.json();
      setUser(data);
      setList(data.items);
    } catch (e) {
      setError("failed");
    } finally {
      setLoading(false);
    }
  }

  function addItem(item: UserItem) {
    // 改用 updater function 可以拿到最新值（如果是會頻繁更新的情況）
    // setList([...list, item]);
    setList(prev => [...prev, item])
  }

  // 事件的型別也太長⋯⋯
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
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