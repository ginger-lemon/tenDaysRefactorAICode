import { User } from "../types/user";

interface Props {
    selected: User;
}

export default function UserCard({selected} : Props) {
    return (
        <div style={{ marginTop: 30 }}>
        <h2>Selected User</h2>

        <p>Name: {selected.name}</p>
        <p>Email: {selected.email}</p>
        <p>Age: {selected.age}</p>
      </div>
    );
  }