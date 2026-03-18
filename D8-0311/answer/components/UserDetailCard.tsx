import { User } from "../types/userTypes"


interface Props {
    user: User
}

export function UserDetailCard({user}: Props) {
    return (
        <div style={{ marginTop: 20 }}>

        <h2>User Detail</h2>

        <div>
          <b>ID:</b> {user.id}
        </div>

        <div>
          <b>Name:</b> {user.name}
        </div>

        <div>
          <b>Email:</b> {user.email}
        </div>

        <div>
          <b>Role:</b> {user.role}
        </div>

        <div>
          <b>Status:</b>{" "}
          {user.active ? "active" : "inactive"}
        </div>

      </div>
    )
}