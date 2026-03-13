import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useLog } from "../hooks/useLog";
import UserLogs from "../components/UserLogs";
import UserList from "../components/UserList";
import { User } from "../types/userTypes";

export default function Dashboard() {
    const {
        data: userData, 
        selectedId, 
        setSelectedId,
        keyword, 
        setKeyword,
        filteredUsers
    } = useUser()
    const { data:logData, fetchLogs } = useLog()
    
    // 原本那個 useEffect 不需要 應該改同時送就好
    function handleClick(u: User) {
        setSelectedId(u.id)
        fetchLogs(u.id)
    }

  return (
    <div style={{ display: "flex", gap: 40 }}>

      {/* UerList */}
      <UserList
        keyword={keyword}
        handleChange={e => setKeyword(e.target.value)}
        userStatus={userData}
        filteredUsers={filteredUsers}
        handleClick={handleClick}
      />

      {/* UserLogs */}
      <UserLogs 
        selectedId={selectedId}
        logStatus={logData}
      />

      {userData.status === 'error' && (
        <div style={{ color: "red" }}>
          {String(userData?.error)}
        </div>
      )}

    </div>
  )
}