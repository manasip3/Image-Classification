import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const inputLat = (event) => {setLat(event.target.value)};
  const inputLong = (event) => {setLong(event.target.value)};

  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
        <label>
          Latitude:
          <input type="text" name="name" value={lat} onChange={inputLat}/>
          Longitude:
          <input type="text" name="name" value={long} onChange={inputLong}/>
        </label>
        <button type="button" onClick={handleClick}>
          Click Me
        </button>
        {count}
    </div>
  );
}

export default App;
