# 解題 memo 

> 3/9 的忘記補解題架構思考流程，今天補一下！

## 分析

### 核心流程

頁面 mount 時顯示使用者列表
使用者互動頻率：幾乎沒有

### 狀態

資料 users<Object[]>
User<Object> = { id, name, email, isActive, score }

資料的非同步狀態 status idle, loading, success, error

### 事件定義

頁面 mount 

### 副作用(資料怎麼來)

接API

### UI

UserCard 
UserPage


## 架構

- service API 模組
- type (ts 需要定義型別)
- ui
今天練習比較沒拿麼複雜所以先拆這三層
拆太多層不見得比較好維護 