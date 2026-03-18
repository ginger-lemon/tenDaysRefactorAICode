import { User } from "../types/user";


export async function userService():Promise<User[]> {
    const res = await fetch("/api/users");

  
    if (!res.ok) {
        throw new Error()
    }

    const data: User[] = await res.json();
    return data 
}