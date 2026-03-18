// UI 層
export interface User {
    id: number,
    name: string,
    email: string,
    active: boolean,
    role: string,
}

// API 層
// 單一
export interface UserApiItem {
    id: number,
    name: string,
    email: string,
    active: boolean,
    role: string,
}
export interface UsersAPIResponse {
    data: UserApiItem[]
}
export interface UserAPIResponse {
    data: UserApiItem
}