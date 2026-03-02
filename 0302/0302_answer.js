import React, { useState } from "react";

// 直接在參數解構並賦予預設值
/**
 * @param {Object} param0
 * @property {String} title 
 * @property {String} subtitle
 * @property {Object[]} items
 * @property {Boolean} showSomething
 * @returns {HTMLElement}
 */
export default function MegaCard({
  title = 'No title',
  subtitle = '',
  items = [],
  showSomething = true
}) {
  // 沒有預設值，先給定 0 
  const [count, setCount] = useState(0);
  
  // 維持 function 宣告提升可讀性
  // 參數名稱調整
  /**
   * @param {Number} number 
   * @param {Array} items 
   */
  function handleClick(number, items = []) {
    setCount((prev) => prev + number + items.length)
    console.log('clicked', number, items, count)
  }

  return (
    <div style={divStyle}>
      <h1>{title}</h1>

      {/* 更換 props */}
      {subtitle && <h2>{subtitle}</h2>}

      <ul>
        {items.map((i, idx) => (
          // key 可以改成 i.id 但我還是習慣用 idx
          <li key={idx}>{i.name} - {i.value}</li>
        ))}
      </ul>
      {/* 改 props 參數 */}
      {showSomething && 
        <button onClick={() => handleClick(2, items)}>
          Add
        </button>
      }

      {/* count 沒有被用到 */}
      <p>count: {count}</p>
    </div>
  );
}

const divStyle = {
  border: "1px solid black", 
  padding: 10
}