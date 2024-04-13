import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {RichTextEditorComponent} from '@syncfusion/ej2-react-richtexteditor';
import axios from 'axios';

function App() {

  // custom font style, size, color, and background color
  // referenced from https://ej2.syncfusion.com/react/documentation/rich-text-editor/styling#:~:text=Font%20name%20and%20size,-By%20default%2C%20the&text=To%20change%20it%2C%20select%20a,changes%20to%20the%20selected%20text.
  let toolbarSettings = {
    items: ['FontName', 'FontSize', 'FontColor', 'BackgroundColor']
  };
  let fontFamily = {
    items:[{text: 'Courier New', value: 'Courier New, Courier, monospace'},
      {text: 'Times New Roman', value: 'Times New Roman, Times, serif'}
  ],
    width: '100px'
  };
  let fontSize = {
    items:[{text: '8', value: '8pt'},
      {text: '12', value: '12pt'},
      {text: '20', value: '20pt'}
    ],
    width: '100px'
  };
  let fontColor = {
    modeSwitcher: true
  };
  let backgroundColor = {
    modeSwitcher: true
  };

  // label
  const labelLat = {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'red'
  };
  const labelLong = {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'green'
  };

  // input variables
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [elevationData, setElevationData] = useState(null);
  const inputLat = (event) => {setLat(event.target.value);
    event.target.style.fontFamily = fontFamily.items[0].value;
    event.target.style.fontSize = fontSize.items[1].value;
  };
  const inputLong = (event) => {setLong(event.target.value);
    event.target.style.fontFamily = fontFamily.items[0].value;
    event.target.style.fontSize = fontSize.items[1].value;
  };

  // button
  const handleClick = () => {
    const data = {
      latitude: lat,
      longitude: long,
    };
    
    const url = `http://localhost:3000/get_elevation`;
    console.log("Request URL:", url); // Debugging line
    
    axios.post(url, data)
      .then(response => {
        console.log("Request successful:", response);
        setElevationData(response.data);
      })
      .catch(error => {
        console.error("Error with elevation data:", error);
        setElevationData(null);
      });
  };
  

  return (
    <div className="App">
        <div style={labelLat}>
          <pre>{'\n'}</pre>
          Input Latitude: 
          <input type="text" name="name" value={lat} onChange={inputLat}/>
        </div>
        <div style={labelLong}>
          <pre>{'\n'}</pre>
          Input Longitude: 
          <input type="text" name="name" value={long} onChange={inputLong}/>
        </div>
        <pre>{'\n'}</pre>
        <button type="button" onClick={handleClick}>
          Retrieve DEM
        </button>
        <div style={labelLong}>
          <div>
            <pre>{'\n'}</pre>
            Display Elevation Data
            <pre>
              {JSON.stringify(elevationData, null, 2)}
            </pre>
          </div>
        </div>

    </div>
  );
}

export default App;

