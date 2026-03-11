// Day 8 - Chaos React System
// 故意寫得很亂：state、api、UI、logic 全混在一起

/**
 * 任務是拆成：
 * - hooks
 * - services
 * - types
 * - components
 */

import React, { useEffect, useState } from "react";

export default function UserDashboard() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);

  async function loadUsers() {
    setLoading(true);

    try {
      const res = await fetch("https://api.example.com/users");

      if (!res.ok) {
        throw new Error("network");
      }

      const data = await res.json();

      const list = data.data || data;

      const mapped = list.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        active: u.active,
        role: u.role,
      }));

      setUsers(mapped);

      setLogs((l) => [...l, "users loaded"]);
    } catch (e) {
      console.error(e);
      setError(e);
    }

    setLoading(false);
  }

  async function loadUserDetail(id) {
    try {
      const res = await fetch("https://api.example.com/users/" + id);
      const data = await res.json();

      setSelectedUser(data);
    } catch (e) {
      console.log("detail error");
    }
  }

  async function toggleUser(id) {

    const user = users.find((u) => u.id === id);

    if (!user) return;

    try {
      await fetch("https://api.example.com/users/" + id + "/toggle", {
        method: "POST",
      });

      setUsers(
        users.map((u) => {
          if (u.id === id) {
            return { ...u, active: !u.active };
          }
          return u;
        })
      );
    } catch (e) {
      console.error(e);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function filteredUsers() {
    if (!search) return users;

    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function renderUser(u, idx) {

    const color = u.active ? "green" : "red";

    return (
      <div
        key={idx}
        style={{
          border: "1px solid #ccc",
          marginBottom: 8,
          padding: 8,
        }}
      >
        <div style={{ fontWeight: "bold" }}>
          {u.name}
        </div>

        <div>{u.email}</div>

        <div style={{ color }}>
          {u.active ? "active" : "inactive"}
        </div>

        <button
          onClick={() => {
            setSelectedUser(u);
            loadUserDetail(u.id);
          }}
        >
          detail
        </button>

        <button
          onClick={() => {
            toggleUser(u.id);
          }}
        >
          toggle
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>User Dashboard</h1>

      {loading && <div>Loading...</div>}

      {error && (
        <div style={{ color: "red" }}>
          Error loading users
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="search user"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div>
        {filteredUsers().map((u, idx) => {
          return renderUser(u, idx);
        })}
      </div>

      <hr />

      {selectedUser && (
        <div style={{ marginTop: 20 }}>

          <h2>User Detail</h2>

          <div>
            <b>ID:</b> {selectedUser.id}
          </div>

          <div>
            <b>Name:</b> {selectedUser.name}
          </div>

          <div>
            <b>Email:</b> {selectedUser.email}
          </div>

          <div>
            <b>Role:</b> {selectedUser.role}
          </div>

          <div>
            <b>Status:</b>{" "}
            {selectedUser.active ? "active" : "inactive"}
          </div>

        </div>
      )}

      <hr />

      <div>

        <h3>Logs</h3>

        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}

      </div>

    </div>
  );
}