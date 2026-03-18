export type FetchStatus<T> = {status: 'idle'} 
| {status: 'loading'}
| {status: 'success', data: T}
| {status: 'error' , error: Error}