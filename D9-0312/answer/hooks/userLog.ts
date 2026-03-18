import { useState } from "react";
import { FetchStatus } from "../types/fetchType";
import { Log } from "../types/logTypes";
import { logServices } from "../services/logServices";

type LogFetchStatus = FetchStatus<Log[]>
export function useLog() {
    const [data, setData] = useState<LogFetchStatus>({status: 'idle'})

    async function fetchLogs(id: number) {
        setData({status: 'loading'})
        try {
            const data: Log[] = await logServices.getUser(id)
            setData({status: 'success', data: data})
        } catch (error) {
            if (error instanceof Error) {
                setData({status: 'error', error: error})
            }
        }
    }

    return { data, fetchLogs }
}