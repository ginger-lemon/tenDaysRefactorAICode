# 10 Days of Frontend Refactoring Practice

本專案是基於實務開發經驗進行的 10 天前端重構刻意練習。

使用 ChatGPT 產生混亂程式碼，並將邏輯重構為分層結構（UI / Hooks / Service），專注於系統設計本身。

練習過程除觀念問題輔助詢問AI，其餘皆**官方文件、網路資源查詢後自行編寫**。

透過拆分練習，避免業務邏輯干擾，專注各層級的責任與結構設計，藉此加強底下能力：

- TypeScript 型別設計
- React 分層架構
- 前後端複雜資料流處理 

本練習由 TypeScript 型別定義循序漸進至功能頁面重構，尤其後續重構練習有搭配 `note.md` 紀錄分析過程。

第十天整合所有練習，並加入實務中自己手寫封裝的服務層處理（僅處理請求基本錯誤）。

> **本專案核心不在功能實作，而在於將實務經驗抽象化，強化系統設計與重構決策能力。**


## 📅 10 天練習內容

⭐：建議從 Day10-0313 開始閱讀

| Day | 主題 | 重點 | note.md |
|-----|------|------| ------|
| D1-0302 | Props + 型別 | 拆 props、建立 interface | 無 |
| D2-0303 | useState | 泛型與型別明確化 | 無 |
| D3-0304 | useEffect + async | async flow + error handling | 無 |
| D4-0305 | useReducer | action / state 型別設計 | 無 |
| D5-0306 | custom hook | hook 抽象與回傳型別 | 無 |
| D6-0309 | Component 拆分 | UI vs Container | 無 |
| D7-0310 | Service Layer | API 型別與資料轉換 | 有 |
| D8-0311 | 綜合重構 1 | 拆分大型混亂 component | 有，對 hooks 用途更清楚 |
| D9-0312 | 綜合重構 2 | 加入測試 / 驗證 | 有，將資料與資料狀態 state 統一處理 |
| ⭐ D10-0313 | 重構總整 | 結構優化 + 可展示版本 | 有，加入原生 fetch 函數封裝 |

---

## ⭐ Highlight：D10-0313⭐ 

Day 10 是集大成！
包含：

- 重構前幾天的程式碼
- 建立清晰的專案結構
- 封裝原生 fetch 的基本 request （實務上有使用，練習回顧概念重寫一次）

