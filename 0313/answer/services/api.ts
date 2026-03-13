import { request } from "./request"


function get<Res>(path: string):Promise<Res> {
    return request(path, {method: 'GET'})
}
function post<Res, Req>(path:string, params: Req):Promise<Res> {
    return request(path, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
}
function put<Req, Res>(path:string, item: Req):Promise<Res> {
    return request(path, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}
function del<T>(path:string, item:T):Promise<void> {
    return request(`${path}/${item}`, {method: 'DELETE'})
}

export const api = {
    get, post, put, delete: del
}