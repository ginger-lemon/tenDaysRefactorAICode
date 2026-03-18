import { Log, LogAPIResponse, LogsAPIResponse } from "../types/logTypes"

async function getUser(userId: number): Promise<Log[]> {
    const res = await fetch("/api/logs?user=" + userId)
    if (!res.ok) throw new Error('network')
    const data: LogsAPIResponse = await res.json()

    return data.data.map(item => mapping(item))
}

export const logServices = {
    getUser,
}

function mapping(item: LogAPIResponse) {
    return {
        id: item.id,
        action: item.action
    }
}