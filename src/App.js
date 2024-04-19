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
      {text: 'Times New Roman', value: 'Times New Roman, Times, serif'}, 
      {text: 'Jersey 10', value: '"Jersey10", sans-serif'}
  ],
    width: '100px'
  };
  let fontSize = {
    items:[{text: '8', value: '8pt'},
      {text: '12', value: '12pt'},
      {text: '20', value: '20pt'}, 
      {text: '30', value: '30pt'}, 
      {text: '50', value: '50pt'}
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
    fontFamily: '"Jersey 10", sans-serif',
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#EDDFB3',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    letterSpacing: '3px'
  };
  const labelLong = {
    fontFamily: '"Jersey 10", sans-serif',
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#EDDFB3',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
    letterSpacing: '3px'
  };
  const labelDisplay = {
    fontFamily: '"Jersey 10", sans-serif',
    fontSize: '50px',
    fontWeight: 'bold',
    color: '#EDDFB3',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
    letterSpacing: '3px'
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
    
    const url = `/get_elevation`;
    console.log("Request URL:", url); // Debugging line
    
    axios.post(url, data)
      .then(response => {
        console.log("Request successful:", response);
        setElevationData(response.data);
      })
      .catch(error => {
        console.error("Error with elevation data:", error.response.data);
        setElevationData(null);
      });
  };
  

  return (
    <div className="App-header">
        <div style={{...labelLat, marginTop: '50px', marginBottom: '0px'}}>
          Input Latitude: 
          <input type="text" name="name" value={lat} onChange={inputLat}/>
        </div>
        <div style={{...labelLong, marginTop: '20px', marginBottom: '30px'}}>
          Input Longitude: 
          <input type="text" name="name" value={long} onChange={inputLong}/>
        </div>
        <button type="button" 
        onClick={handleClick}
        className="rounded-button"
        style={{
          backgroundColor: '#876445', // background color
          color: '#FFFFFF', // text color
          fontSize: '30px', // font size
          fontFamily: '"Jersey 10", sans-serif', // font family
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',  // text outline
          letterSpacing: '3px', // text spacing
          
          border: '2px solid #FFFFFF', // border and border color
          padding: '10px 20px', // padding
          borderRadius: '4px', // border radius
          cursor: 'pointer' // cursor style
        }}
        >
          Retrieve DEM
        </button>
        <div style={{...labelDisplay, marginTop: '80px', marginBottom: '50px'}}>
          <div>
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

