import React, { useReducer } from "react";

interface Item {
  id: number;
  name: string;
}
interface State {
  items: Item[];
  loading: boolean;
  error: string|null;
}

const initialState: State = {
  items: [],
  loading: false,
  error: null
};

/**
 * 如果之後拆檔案的話這個要 import 
 * 通常大型專案會
 * domain
 *  - todo/
 *    - type.ts => 專門 export 
 *    - reducer.ts
 *    - actions.ts
 */
/**
 * 因為 enum 在 js 會產生 runtime code 
 * 實際上會寫成
 * export const ActionType = {
 *    ADD: "ADD",
 *    REMOVE: "REMOVE",
 *  } as const;
 * type ActionType = typeof ActionType[keyof typeof ActionType];
 * ＊ as const = 讓 TypeScript 把值推論成「最窄的不可變字面量型別」
 */
/**
 * memo.type ActionType = typeof ActionType[keyof typeof ActionType]
 * 等號右邊形同 Action[key] ，找出 key 對應的 value 型別
 */ 

// 使用 enum 枚舉/限制只能有這些動作
enum ActionEnum {
  add = 'add',
  remove = 'remove',
  loading = 'loading',
  error = 'error',
  reset = 'reset'
}


type StateAction = {type: ActionEnum.add, payload: Item} 
| {type: ActionEnum.remove, payload: Item["id"]} 
| {type: ActionEnum.loading, payload: State["loading"]}
| {type: ActionEnum.error, payload: State["error"]}
| {type: ActionEnum.reset}

function reducer(state:State , action:StateAction): State{
  switch (action.type) {
    case ActionEnum.add:
      return {
        ...state,
        items: state.items.concat(action.payload),
      };

    case ActionEnum.remove:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case ActionEnum.loading:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionEnum.error:
      return {
        ...state,
        error: action.payload,
      };

    case ActionEnum.reset:
      /**
       * GPT 助教建議用 {...initialState} 會更好（若有巢狀）
       */
      return initialState;

    default:
      /**
       * GPT助教建議加上這一行
       * const _exhaustive: never = action;
       * 如果有 ActionEnum 忘記寫 case ，Ts會噴錯
       */
      const _exhaustive: never = action;
      return state;
  }
}

export default function ReducerMess() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fakeAdd() {
    dispatch({
      type: ActionEnum.add, // 要強制用枚舉的 enum
      payload: { id: Date.now(), name: "Item " + Date.now() },
    });
  }

  function fakeError() {
    dispatch({
      type: ActionEnum.error,
      payload: "Something went wrong",
    });
  }

  return (
    <div>
      <button onClick={fakeAdd}>Add</button>
      <button onClick={() => dispatch({ type: ActionEnum.loading, payload: true })}>
        Loading
      </button>
      <button onClick={fakeError}>Error</button>
      <button onClick={() => dispatch({ type: ActionEnum.reset })}>
        Reset
      </button>

      <div>
        {state.loading && <p>Loading...</p>}
        {state.error && <p>{state.error}</p>}
        <ul>
          {state.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}