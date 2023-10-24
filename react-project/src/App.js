import './App.css';
import ItemComponent from './components/item';

function App () {
  const arr = [12, 34, 23, 45, 678, 34, 5, 6, 7, 7, 7,56,34,56,56];
  return (
    <div className="App">
      <ItemComponent count={89} />
      {
        arr.map(el => {
          return <ItemComponent count={el} />;
        })
      }
    </div>
  );
}

export default App;
