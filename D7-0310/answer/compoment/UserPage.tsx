import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { User } from "../types/users";

export default function UserPage() {
  const {users, status, error} = useUser()

  if (status === 'loading') return <div>loading...</div>;
  if (status === 'error') return <div>{error?.message}</div>;

  return (
    <div>
      <h1>User list</h1>

      {users.map((u) => (
        <UserCard 
        key={u.id} 
        id={u.id}
        name={u.name}
        email={u.email}
        isActive={u.isActive}
        score={u.score} />
      ))}
    </div>
  );
}

/**
 * 這邊補 interface UserCardProps { user: User } 比較恰當
 * 注意不同 type 要對應哪些資料
 */
interface UserCardProps {
  id: User["id"];
  name: User["name"];
  email: User["email"];
  isActive: User["isActive"];
  score: User["score"]
}
function UserCard({id, name, email, isActive, score}: UserCardProps) {
  return (
    <div key={id}>
          <b>{name}</b>
          <div>{email}</div>
          <div>{isActive ? "active" : "inactive"}</div>
          <div>score: {score}</div>
        </div>
  )
}