// UI
export interface Log {
    id: number;
    action: string;
}

// API
export interface LogAPIResponse{
    id: number;
    action: string;
}
export interface LogsAPIResponse {
    data: LogAPIResponse[]
}