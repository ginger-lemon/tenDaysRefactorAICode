import { User, UserAPIResponse, UsersAPIResponse } from "../types/userType"

async function getAll(): Promise<User[]> {
    const res = await fetch("/api/users")
    if (!res.ok) {
        throw new Error('network')
    }
    const data: UsersAPIResponse = await res.json()
    return data.data.map(item => mapping(item))
}

export const userServices = {
    getAll
}

function mapping(item: UserAPIResponse) {
    return {
        id: item.id,
        name: item.name
    }
}