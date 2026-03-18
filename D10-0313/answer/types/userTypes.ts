// UI
export interface User{
    id: number;
    name: string;
    email: string;
}

// API
export interface UserAPIResponse {
    id: number;
    name: string;
    email: string;
}
export interface UsersAPIResponse {
    data: UserAPIResponse[]
}