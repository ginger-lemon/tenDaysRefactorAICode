import { Log, LogAPIResponse, LogsAPIResponse } from "../types/logTypes"
import { api } from "./api"

async function getUser(userId: number): Promise<Log[]> {
    const data: LogsAPIResponse = await api.get('https://api.example.com/logs?user=' + userId)
    return data.data.map(item => mapping(item))
}

export const logServices = {
    getUser
}

function mapping(item: LogAPIResponse) {
    return {
        id: item.id,
        action: item.action,
        time: item.time, // 假設 YYYY-MM-DD
    }

}