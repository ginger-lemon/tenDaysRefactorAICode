
// 先不考慮加上 token 
export async function request<T>(path:string, options: RequestInit):Promise<T> {
    const res = await fetch(path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    })
    if (res.status === 401) throw new Error('權限不足')

    if (!res.ok) throw new Error('network error')
    
    return res.json()
}

