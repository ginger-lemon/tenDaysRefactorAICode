import { User } from "../types/userType"

interface Props {
    filteredUsers: User[];
    handleClick: (u: User) => void;
}
export function List({filteredUsers,handleClick } : Props) {
    return (
        <ul>
        {filteredUsers.map((u) => (
          <li key={u.id} onClick={() => handleClick(u)}>
            {u.name}
          </li>
        ))}
      </ul>
    )
}