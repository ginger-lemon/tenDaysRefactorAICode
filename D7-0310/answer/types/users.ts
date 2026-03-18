// 給ＵＩ用的
export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    score: number
}

// 定義ＡＰＩ型別
export interface UserItemApi {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    points: number;
  }

/**
 * API 回傳的欄位資料
 * 如果 API 改 schema 可以保護不會因為換欄位壞掉
 */
export interface UserApiResponse {
    data: UserItemApi[]
}