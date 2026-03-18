import React, { useEffect, useState } from "react";

/**
 * 今日重點
 * 1. UI component 不能有 fetch
 * 2. container 負責資料 flow
 * 3. hook 負責 state + async
 * 4. service 只負責 API
 */
/**
 * 
 * components/
 *  UserCard.tsx
 *  UserList.tsx
 * 
 * containers/
 *  UserListContainer.tsx
 * 
 * hooks/
 *  useUsers.ts
 * 
 * services/
 *  userService.ts
 * 
 * types/
 *  user.ts
 */

export default function UserDashboard(props) {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [keyword, setKeyword] = useState("");

  async function fetchUsers() {
    setLoading(true);

    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      console.log("users", data);

      setUsers(data);
    } catch (e) {
      console.error("fetch error", e);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleSelect(user) {
    console.log("select", user);
    setSelected(user);
  }

  function handleSearch(e) {
    setKeyword(e.target.value);
  }

  const filtered = users.filter((u) => {
    if (!keyword) return true;

    return (
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.email.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  return (
    <div style={{ padding: 20 }}>

      <h1>User Dashboard</h1>

      <input
        placeholder="search..."
        value={keyword}
        onChange={handleSearch}
      />

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: 20 }}>

        {filtered.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              cursor: "pointer",
              background:
                selected && selected.id === user.id
                  ? "#eee"
                  : "#fff",
            }}
            onClick={() => handleSelect(user)}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>

            {user.age && <p>Age: {user.age}</p>}

            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Send email to " + user.email);
              }}
            >
              Send Email
            </button>
          </div>
        ))}

      </div>

      {selected && (
        <div style={{ marginTop: 30 }}>
          <h2>Selected User</h2>

          <p>Name: {selected.name}</p>
          <p>Email: {selected.email}</p>
          <p>Age: {selected.age || "unknown"}</p>
        </div>
      )}
    </div>
  );
}