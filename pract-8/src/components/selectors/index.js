import { useContext, useEffect } from 'react';
import SearchContext from '../../context/search.context';
import './style.css';

/**
 * 
 * @param {Object} props 
 * @param {string} props.title
 * @param {string} props.keyName
 * @param {Array<{ value: string, name: string }>} props.dataSet
 * @returns 
 */
const SelectorComponent = (props) => {

 const { addSearchParams } = useContext(SearchContext);

 const dataSet = props.dataSet || [];

 useEffect(() => {
  addSearchParams(props.keyName, dataSet[0].value);
 }, []);

 const onChange = (event) => {
  const value = event.target.value;
  addSearchParams(props.keyName, value);
 };

 return (
  <div className='selector-wrapper'>
   {props.title}:
   <select onChange={onChange}>
    {dataSet.map(el => (<option value={el.value}>{el.name}</option>))}
   </select>
  </div>
 );
};

export default SelectorComponent;