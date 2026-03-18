import { useEffect, useState } from "react"
import { User } from "../types/user"
import { userService } from "../services/userService"


type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

interface UseUserResult {
    users: User[] | null;
    status: FetchStatus;
    error: Error | null;
    fetchUsers: () => Promise<void>
}

export function useUser(): UseUserResult {
    const [users, setUser ] = useState<User[] | null>(null)
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers(): Promise<void> {
        setStatus('loading')
        setError(null)

        try {
            const data = await userService()
            setStatus('success')
            setUser(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setStatus('error')
                setError(error)
            }
        } 
    }

    return {
        users, status, error, fetchUsers
    }
}