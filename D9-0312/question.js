import React, { useEffect, useState } from "react";

/**
 * 面對混亂 React + TS code
 * 完整重構結構
 * 補上型別安全
 * 再加上簡單測試 / 型別驗證
 */

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [error, setError] = useState(null)

  async function loadUsers() {
    setLoading(true)

    try {
      const res = await fetch("/api/users")
      const data = await res.json()

      setUsers(data)
    } catch (e) {
      setError(e)
    }

    setLoading(false)
  }

  async function loadLogs(userId) {
    const res = await fetch("/api/logs?user=" + userId)
    const data = await res.json()

    setLogs(data)
  }

  function handleSelect(user) {
    setSelectedUser(user)
    loadLogs(user.id)
  }

  function handleSearch(e) {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <div>
      <h1>User Dashboard</h1>

      <input
        placeholder="search"
        value={keyword}
        onChange={handleSearch}
      />

      {loading && <p>loading...</p>}

      {error && <p>error</p>}

      <button onClick={loadUsers}>refresh</button>

      <ul>
        {filtered.map((u) => (
          <li key={u.id} onClick={() => handleSelect(u)}>
            {u.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h2>{selectedUser.name}</h2>

          <ul>
            {logs.map((log, i) => (
              <li key={i}>{log.action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}