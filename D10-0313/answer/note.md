# 解題 memo 

## 分析

### 核心流程

- 讀取 users 
- 點選 user
- 顯示 user detail
- 顯示 logs
- 可以 refresh

### 狀態

server data
- users 
- logs
fetch state
- fetch state: idle, loading, success, error
- error 
frontend state/ui state
- selectedUserId
- keyword

### 事件定義

- input change: get keyword
 
### 副作用(資料怎麼來)

- users/user: api
- logs: api

### UI

- Input
- UserList
- LogList

## 架構

types/
    - userTypes.ts // 現在 type 不多 api 跟 ui 先放一起
    - logTypes.ts
services/
    - userServices.ts
    - logsServices.ts // 從 api 來看應該是 log 但會拿 users 相關的 log
hooks/ 
    - useUser.ts
    - useLog.ts
components/
    - UserList
    - UserLog