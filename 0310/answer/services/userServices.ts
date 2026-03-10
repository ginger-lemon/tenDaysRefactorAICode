import { User, UserApiResponse, UserItemApi } from "../types/users";

interface UserApiModule {
    getAll: () => Promise<User[]>
}

async function getAll():Promise<User[]> {
    const res = await fetch("https://api.example.com/users");

    if (!res.ok) {
        throw new Error
    }

    const data: UserApiResponse = await res.json();

    return data.data.map(mapUser)
}

/**
 * map函數功能：把api回傳回來的資料型別轉變成可以讓UI使用的型別
 */
function mapUser(responseData: UserItemApi): User {
    return {
        id: responseData.id,
        name: `${responseData.first_name} ${responseData.last_name}`,
        email: responseData.email,
        isActive: responseData.status === "active",
        score: Math.round(responseData.points / 10),
    }
}

export const UserApi: UserApiModule = {
    getAll
}

/**
 * 因為直接在 getAll 
 */