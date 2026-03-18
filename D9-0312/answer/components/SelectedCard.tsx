import { Log } from "../types/logTypes";
import { User } from "../types/userType"

interface Props {
    users: User[];
    selectedId: number;
    logs: Log[]
}

export function SelectedCard({users, selectedId , logs}: Props) {
    const selectedUser = users?.find(({id}) => selectedId === id)
    return (
        <div>
        <h2>{selectedUser?.name}</h2>

        <ul>
          {logs.map((log, i) => (
            <li key={i}>{log.action}</li>
          ))}
        </ul>
      </div>
    )
}