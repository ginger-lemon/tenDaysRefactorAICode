// UI
export interface Log {
    id: number;
    action: string;
    time: string; // 假設 YYYY-MM-DD
}

export interface LogAPIResponse {
    id: number;
    action: string;
    time: string; // 假設 YYYY-MM-DD
}
export interface LogsAPIResponse {
    data: LogAPIResponse[]
}