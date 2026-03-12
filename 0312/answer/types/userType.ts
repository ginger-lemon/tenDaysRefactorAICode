// UI
export interface User{
    id: number;
    name: string;
}

// API
export interface UserAPIResponse {
    id: number;
    name: string;
}
export interface UsersAPIResponse {
    data: UserAPIResponse[]
}

