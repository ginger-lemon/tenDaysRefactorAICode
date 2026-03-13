import { useEffect, useState } from "react";
import { User } from "../types/userTypes";
import { FetchStatus } from "../types/fetchType";
import { userServices } from "../services/userServices";

type UserFetchStatus = FetchStatus<User[]>

export function useUser() {
    const [data, setData] = useState<UserFetchStatus>({status:'idle'})
    const [selectedId, setSelectedId] = useState<number|null>(null)
    const [keyword, setKeyword] = useState<string>('')

    const filteredUsers = data.status === 'success' ? data.data.filter(u => {
        if (!keyword) return true
        return u.name.toLowerCase().includes(keyword.toLowerCase())
      }) : []
 
    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
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
        fetchUser,
        selectedId, 
        setSelectedId,
        keyword, 
        setKeyword,
        filteredUsers
    }
}