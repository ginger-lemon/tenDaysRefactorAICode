import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { useUser } from "../hooks/useUser";
import { User } from "../types/userType";
import { useLog } from "../hooks/userLog";
import { SelectedCard } from "../components/SelectedCard";
import { List } from "../components/List";

export default function Dashboard() {
    const {
        data: userData, 
        keyword,
        setKeyword, 
        selectedId, 
        setSelectedId, 
        filteredUsers,
        fetchUsers
    } = useUser()
    const {data: logData, fetchLogs} = useLog()

  function handleSelect(user: User) {
    setSelectedId(user.id)
    fetchLogs(user.id)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)
  }


  return (
    <div>
      <h1>User Dashboard</h1>

      <Input 
        value={keyword} 
        handleChange={handleSearch} 
      />
    
      {userData.status === 'loading' && <p>loading...</p>}

      {userData.status === 'error' && <p>error</p>}

      <button onClick={fetchUsers}>refresh</button>

      <List 
        filteredUsers={filteredUsers}
        handleClick={handleSelect}
      />

      {selectedId && (
        <SelectedCard 
            users={userData.status === 'success' ? userData.data : []}
            selectedId={selectedId}
            logs={logData?.status === 'success' ?logData.data : []}
        />
      )}
    </div>
  )
}