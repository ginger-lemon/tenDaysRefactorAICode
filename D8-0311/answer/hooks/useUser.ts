import { useEffect, useState } from "react"
import { User } from "../types/userTypes"
import { userServices } from "../services/userServices"

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

// 和資料有關就放 hooks 
export function useUser() {
    const [users, setUsers] = useState<User[]>([])
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [error, setError] = useState<Error | null>(null)
    // 前端 UI 互動後的 state （會牽涉到 data 改變
    /**
     * selectedUser 其實直接存 id 就好（但這次重點在重構和ts就沒在額外處理）
     */
    const [selectedUser, setSelectedUser] = useState<User|null>(null)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers(): Promise<void> {
        setStatus('loading')
        setError(null)
        try {
            const data = await userServices.getAll()
            setStatus('success')
            setUsers(data)
        } catch (error:unknown) {
            if (error instanceof Error) {
                setStatus('error')
                setError(error)
            }
        }
    }
    async function fetchUserDetail(id: number):Promise<void>  {
        try {
            const data = await userServices.get(id)
            setSelectedUser(data)
        } catch (error:unknown) {
            if (error instanceof Error) {
                setError(error)
            }
        }
    }
    async function toggleUser(id:number):Promise<void> {
        try {
            await userServices.toggle(id)
            setUsers(prev => prev.map(u => {
                if (u.id === id) {
                    return {...u, active: !u.active}
                } else return u
            }))
        } catch (error:unknown) {
            if (error instanceof Error) {
                setStatus('error')
                setError(error)
            }
        }
    }
    // 這支函數如果資料筆數龐大直接 return 在元件用可能會有效能問題，可能用 useMemo 依賴 users 和search會比較妥當？
    function filteredUsers() {
        if (!search) return users
        return users.filter((u) => {
            return (
              u.name.toLowerCase().includes(search.toLowerCase()) ||
              u.email.toLowerCase().includes(search.toLowerCase())
            );
          });
    }
  
    return {
        // 資料
        users, 
        status, 
        error, 
        
        // 會影響資料的
        search,
        setSearch, 
        selectedUser, 
        setSelectedUser,

        // 函數
        fetchUsers,
        fetchUserDetail,
        toggleUser,
        filteredUsers,
    }
}



