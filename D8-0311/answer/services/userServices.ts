import { User, UserAPIResponse, UserApiItem, UsersAPIResponse } from "../types/userTypes";


async function getAll(): Promise<User[]> {
    const res = await fetch("https://api.example.com/users");

    if (!res.ok) {
      throw new Error("network");
    }

    const data: UsersAPIResponse = await res.json();

    return data.data.map(item => mapping(item))
}
async function get(id:number): Promise<User> {
    const res = await fetch("https://api.example.com/users/" + id);

    if (!res.ok) {
        throw new Error('network')
    }
    
    const data: UserAPIResponse = await res.json();

    return mapping(data.data)
}
async function toggle(id: number): Promise<void>  {
    await fetch("https://api.example.com/users/" + id + "/toggle", {
        method: "POST",
      });
}


export const userServices = {
    getAll,
    get,
    toggle
}

// 將 API 回傳格式化成 app 用的資料
function mapping(responseData: UserApiItem): User {
    return {
        id: responseData.id,
        name: responseData.name,
        email: responseData.email,
        active: responseData.active,
        role: responseData.role,
      }
}