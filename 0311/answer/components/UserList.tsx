import { User } from "../types/userTypes";

interface Props {
    idx: number; // 如果是改id這邊就可以吵一個參數
    user: User;
    onSelected: () => void;
    onToggle: () => void;
}
interface ListProps {
  list: User[];
  handleSelected: (user: User) => void;
  handleToggle: (id: number) => void;
 }


export  function UserCard({idx, user, onSelected, onToggle}: Props) {
    const color = user.active ? "green" : "red";

    return ( <div
        key={idx}
        style={{
          border: "1px solid #ccc",
          marginBottom: 8,
          padding: 8,
        }}
      >
        <div style={{ fontWeight: "bold" }}>
          {user.name}
        </div>

        <div>{user.email}</div>

        <div style={{ color }}>
          {user.active ? "active" : "inactive"}
        </div>

        <button
          onClick={onSelected}
        >
          detail
        </button>

        <button
          onClick={onToggle}
        >
          toggle
        </button>
      </div>)
}

export default function UserList ({list, handleSelected, handleToggle}: ListProps) {
    return (
      <div>{list.map((u,i) => <UserCard 
        idx={i} // 這邊其實改 u.id 會比較好
        user={u} 
        onSelected={() => handleSelected(u)}
        onToggle={() => handleToggle(u.id)}
        />)}</div>
    )
}