import { useEffect, useState } from "react"
import { User } from "../types/users"
import { UserApi } from "../services/userServices";

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'
interface UserUserResult {
    users: User[];
    status: FetchStatus;
    error: Error | null;
    fetchData: () => Promise<void>;
}

export function useUser():UserUserResult {
    const [users, setUsers] = useState<User[]>([])
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [error, setError] = useState<Error| null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(): Promise<void> {
        setStatus('loading')
        setError(null)
        try {
            const data = await UserApi.getAll()
            setStatus('success')
            setUsers(data)
        } catch (error) {
            if (error instanceof Error) {
                setStatus('error')
                setError(error)
            }
        }
    }


    return {
        users, status, error, fetchData
    }
}