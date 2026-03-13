import { User, UserAPIResponse, UsersAPIResponse } from "../types/userTypes"
import { api } from "./api"

async function getAll(): Promise<User[]> {
    const data: UsersAPIResponse = await api.get('https://api.example.com/users')
    return data.data.map(item => mapping(item))
}

export const userServices = {
    getAll
}

function mapping(item: UserAPIResponse) {
    return {
        id: item.id,
        name: item.name,
        email: item.email,
    }

}