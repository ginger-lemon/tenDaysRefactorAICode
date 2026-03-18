import React, { useEffect, useState } from "react";
import { User } from "./types/user";
import { useUser } from "./hooks/useUser";
import UserList from "./components/UserList";
import UserCard from "./components/UserCard";
import { UserListContainer } from "./container/UserListContainer";


 
export default function UserDashboard() {
  const { users, status, error } = useUser()
  const [selected, setSelected] = useState<User| null>(null);
  const [keyword, setKeyword] = useState<string>("");

  function handleSelect(user: User) {
    console.log("select", user);
    setSelected(user);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  /**
   * const filtered: (Users ?? []) = users...
   */
  const filtered = users?.filter((u) => {
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

      {status === "loading" && <p>Loading...</p>}
      {/* 假設是 FastAPI 回傳格式統一用 message */}
      {error && <p>{error?.message}</p>}

      <UserListContainer>

        {filtered?.map((user, i) => (
            <UserList 
            key={user.id} 
            user={user} 
            selected={selected} 
            handleClick={() => handleSelect(user)} />
        ))}

      </UserListContainer>

      {selected && (
        <UserCard  selected={selected}/>
      )}
    </div>
  );
}