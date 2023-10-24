import { useState } from 'react';
import './style.css';

/**
 * 
 * @param {Object} props 
 * @param {number} props.count 
 * @returns 
 */
const ItemComponent = (props) => {

 let [count, setCount] = useState(props.count);
 const increase = () => {
  setCount(count + 1);
  console.log('increase', count);
 };

 const decrease = () => {
  setCount(count - 1);
  console.log('decrease', count);
 };

 return (
  <div className="item">
   This item component {count}
   <div className="buttons">
    <button id="inc-1" onClick={increase}>+</button>
    <button id="dec-1" onClick={decrease}>-</button>
   </div>
  </div>
 );
};

export default ItemComponent;