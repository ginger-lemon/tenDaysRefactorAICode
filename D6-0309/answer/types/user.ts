interface User {
    id: number;
    name: string;
    email: string;
    /**
     * 用 age?: number; 也可以，api 不會回 unknown
     */
    age: number | 'unknown';

}

export type { User }