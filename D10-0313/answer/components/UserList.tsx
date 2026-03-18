import { FetchStatus } from "../types/fetchType";
import { User } from "../types/userTypes";

interface MainProps {
    keyword: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    userStatus: FetchStatus<User[]>;
    filteredUsers: User[]
    handleClick: (u: User) => void
}
export default function UserList({
    keyword, 
    handleChange, 
    userStatus,  
    filteredUsers,
    handleClick
}: MainProps) {

    return (
        <div>

        <h2>User List</h2>
        <Input
            value={keyword}
            handleChange={handleChange}
         />

        {userStatus.status === 'loading' && <p>loading users...</p>} 
        {userStatus.status === 'success' && <UserCard data={filteredUsers} handleClick={handleClick} />}


      </div>
    )
}

interface Props {
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
}
export function Input({value, handleChange}: Props) {
    return (
        <input
          placeholder="search user"
          value={value}
          onChange={handleChange}
        />
    )
}

interface ItemProps {
    data: User[],
    handleClick: (u: User) => void
}
function UserCard({data, handleClick}: ItemProps) {
    return (
        <ul>
        {data.map((u, i) => (
          <li key={u.id} onClick={() => handleClick(u)}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    )
}