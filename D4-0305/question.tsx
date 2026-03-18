import React, { useReducer } from "react";

/**
 * 🔥 重點：Reducer 的 state / action 型別設計
 * 目標：
 * 拆清楚 State 結構
 * 用 enum 限制 action.type
 * 建立 discriminated union
 * 消滅 any 與模糊 payload
 */

const initialState = {
  items: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        items: state.items.concat(action.payload),
      };

    case "remove":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };

    case "loading":
      return {
        ...state,
        loading: action.value,
      };

    case "error":
      return {
        ...state,
        error: action.errorMessage,
      };

    case "reset":
      return initialState;

    default:
      return state;
  }
}

export default function ReducerMess() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fakeAdd() {
    dispatch({
      type: "add",
      payload: { id: Date.now(), name: "Item " + Date.now() },
    });
  }

  function fakeError() {
    dispatch({
      type: "error",
      errorMessage: "Something went wrong",
    });
  }

  return (
    <div>
      <button onClick={fakeAdd}>Add</button>
      <button onClick={() => dispatch({ type: "loading", value: true })}>
        Loading
      </button>
      <button onClick={fakeError}>Error</button>
      <button onClick={() => dispatch({ type: "reset" })}>
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