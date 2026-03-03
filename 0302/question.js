// Day 1 練習用亂 JS + React component
// 注意：刻意很亂、props 全部混在一起、沒有型別、函數寫法混亂

import React, { useState } from "react";

export default function MegaCard(props) {
  const [count, setCount] = useState();
  
  function handleClick(x, y) {
    setCount(count + x + (y ? y.length : 0));
    console.log("clicked", x, y, count);
  }
  
  const title = props.title || "No title";
  const sub = props.subtitle;
  const items = props.items || [];
  const show = props.showSomething ? props.showSomething : true;
  
  return (
    <div style={{ border: "1px solid black", padding: 10 }}>
      <h1>{title}</h1>
      {sub && <h2>{sub}</h2>}
      <ul>
        {items.map((i, idx) => (
          <li key={idx}>{i.name} - {i.value}</li>
        ))}
      </ul>
      {show && <button onClick={() => handleClick(2, items)}>Add</button>}
    </div>
  );
}