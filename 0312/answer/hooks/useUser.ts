import { useEffect, useMemo, useState } from "react"
import { User } from "../types/userType"
import { FetchStatus } from "../types/fetchType"
import { userServices } from "../services/userServices"

type UserFetchStatus = FetchStatus<User[]>

export function useUser() {
    const [data, setData] = useState<UserFetchStatus>({status: 'idle'})
    // ui/前端的資料state
    const [selectedId, setSelectedId] = useState<number|null>(null)
    const [keyword, setKeyword] = useState<string>('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredUsers = data.status === 'success' ? data.data.filter(u =>  u.name.toLowerCase().includes(keyword.toLowerCase())) : []

    async function fetchUsers():Promise<void> {
        setData({status: 'loading'})
        try {
            const data: User[] = await userServices.getAll()
            setData({status: 'success', data: data})
        } catch (error) {
            if (error instanceof Error) {
                setData({status: 'error', error: error})
            }
        }
    }
    
    return {
        data, 
        keyword,
        setKeyword,
        selectedId, 
        setSelectedId, 
        filteredUsers,
        fetchUsers
    }
}