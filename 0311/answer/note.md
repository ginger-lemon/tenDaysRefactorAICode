# 解題 memo 

> 拆完對 hooks 管理 state 更清楚一點，拆的過程發現太多層的 state 混在一起，難怪會需要用 react query 或是 reducer 管理 state 

## 分析

### 核心流程

點選按鈕切換使用者資料
取得紀錄

### 狀態

伺服器回傳回來的資料
- users 
- selectedUser
 
資料的狀態
- users fetch status
- logs (users fetch 成功的紀錄)

UI 或前端互動產生的狀態
- search

### 事件定義

- 元件 mount：觸發API 取得使用者
- button click：取得 selectedUser =>  取得使用者詳細資料
- input change ：取得 search => 過濾使用者

### 副作用(資料怎麼來)

- users: api
- selectedUser: api

### UI

- UserCard
- SelectedUserCard
- logs 

## 架構

components/
    - Input.tsx
    - UserDetailCard.tsx
    - UserList.tsx
hooks/
    - useUser.ts
pages/
    - UserDashboard.tsx
services/
    - userServices.ts
types/
    - userTypes.ts