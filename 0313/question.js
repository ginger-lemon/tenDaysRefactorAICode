import React, { useEffect, useState } from "react";

export default function Dashboard() {

  const [users, setUsers] = useState([])
  const [logs, setLogs] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [keyword, setKeyword] = useState("")
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingLogs, setLoadingLogs] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoadingUsers(true)

    fetch("https://api.example.com/users")
      .then(r => r.json())
      .then(data => {
        setUsers(data.data)
        setLoadingUsers(false)
      })
      .catch(e => {
        setError(e)
        setLoadingUsers(false)
      })
  }, [])

  useEffect(() => {
    if (!selectedUser) return

    setLoadingLogs(true)

    fetch("https://api.example.com/logs?user=" + selectedUser.id)
      .then(r => r.json())
      .then(data => {
        setLogs(data.logs)
        setLoadingLogs(false)
      })
      .catch(e => {
        setError(e)
        setLoadingLogs(false)
      })
  }, [selectedUser])

  const filteredUsers = users.filter(u => {
    if (!keyword) return true
    return u.name.toLowerCase().includes(keyword.toLowerCase())
  })

  function renderUsers() {
    if (loadingUsers) return <p>loading users...</p>

    return (
      <ul>
        {filteredUsers.map((u, i) => (
          <li key={i} onClick={() => setSelectedUser(u)}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    )
  }

  function renderLogs() {

    if (!selectedUser) return <p>select user</p>

    if (loadingLogs) return <p>loading logs...</p>

    if (!logs.length) return <p>no logs</p>

    return (
      <ul>
        {logs.map((l, i) => (
          <li key={i}>
            {l.action} - {l.time}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div style={{ display: "flex", gap: 40 }}>

      <div>

        <h2>User List</h2>

        <input
          placeholder="search user"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        {renderUsers()}

      </div>

      <div>

        <h2>User Logs</h2>

        {renderLogs()}

      </div>

      {error && (
        <div style={{ color: "red" }}>
          {String(error)}
        </div>
      )}

    </div>
  )
}