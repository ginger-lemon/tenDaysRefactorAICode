import { User } from "../types/user";



interface Props {
    user: User;
    selected: User | null;
    handleClick: () => void;
}
export default function UserList({
    user,
    selected,
    handleClick,
}: Props) {


    return (
        <div
        key={user.id}
        style={{
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10,
          cursor: "pointer",
          background:
            selected && selected.id === user.id
              ? "#eee"
              : "#fff",
        }}
        onClick={handleClick}
      >
        <h3>{user.name}</h3>
        <p>{user.email}</p>

        {user.age && <p>Age: {user.age}</p>}

        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Send email to " + user.email);
          }}
        >
          Send Email
        </button>
      </div>
    );
  }