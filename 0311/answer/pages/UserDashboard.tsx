import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { UserDetailCard } from "../components/UserDetailCard";
import { Input } from "../components/Input";
import { User } from "../types/userTypes";
import UserList from "../components/UserList";

export default function UserDashboard() {
    const {
        status, 
        error, 
        selectedUser, 
        setSelectedUser,
        search, 
        setSearch,         
        fetchUserDetail,
        toggleUser,
        filteredUsers} = useUser()

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>):void {
    setSearch(e.target.value);
  }
  function handleSelected(user: User):void {
    setSelectedUser(user);
    fetchUserDetail(user.id);
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>User Dashboard</h1>

      {status === 'loading' && <div>Loading...</div>}

      {error && (
        <div style={{ color: "red" }}>
          Error loading users
        </div>
      )}

      <Input search={search} onChange={handleSearch} />

      <UserList 
        list={filteredUsers()}
        handleSelected={handleSelected}  
        handleToggle={toggleUser}
     />

      {selectedUser && (
        <UserDetailCard user={selectedUser} />
      )}

    </div>
  );
}