import "./App.css";
import { useState } from "react";
import styled from "styled-components";

const RoundedButton = styled.button`
  background-color: #396362;
  color: #FFFFFF;
  font-size: 30px;
  font-family: 'Jersey 10', sans-serif;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
  letter-spacing: 3px;
  border: 2px solid #FFFFFF;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

function App() {
  // custom font stuff
  // referenced from https://ej2.syncfusion.com/react/documentation/rich-text-editor/styling#:~:text=Font%20name%20and%20size,-By%20default%2C%20the&text=To%20change%20it%2C%20select%20a,changes%20to%20the%20selected%20text.

  // labels
  const labelTitle = {
    fontFamily: '"Jersey 10", sans-serif',
    fontSize: "80px",
    fontWeight: "bold",
    color: "#FFE7D1",
    textShadow:
      "-1px -1px 0 #000, 1px 1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    letterSpacing: "8px",
  };
  const labelLat = {
    fontFamily: '"Jersey 10", sans-serif',
    fontSize: "50px",
    fontWeight: "bold",
    color: "#FFE7D1",
    textShadow:
      "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    letterSpacing: "3px",
  };
  const labelLong = {
    fontFamily: '"Jersey 10", sans-serif',
    fontSize: "50px",
    fontWeight: "bold",
    color: "#FFE7D1",
    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
    letterSpacing: "3px",
  };
  const labelDisplay = {
    fontFamily: '"Jersey 10", sans-serif',
    fontSize: "50px",
    fontWeight: "bold",
    color: "#FFE7D1",
    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
    letterSpacing: "3px",
  };

  // input variables
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [elevationData, setElevationData] = useState(null);

  // button
  const handleClick = async () => {
    try {
      const payload = {
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
      };

      const response = await fetch("http://127.0.0.1:5000/get_elevation", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const data = await response.json();

        setElevationData(data.elevation.toString());
        // setError(null);
      } else {
        // setError('Error fetching elevation data');
      }
    } catch (err) {
      // setError('Error fetching elevation data');
    }
  };

  return (
    <div className="App-header">
      <div style={{ ...labelTitle, marginTop: "50px", marginBottom: "0px" }}>
        <span className="gradient-text">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Image Classification
          </div>
        </span>
      </div>

      <div style={{ ...labelLat, marginTop: "50px", marginBottom: "0px" }}>
        Input Latitude:
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ ...labelLat, marginTop: "-10px", marginBottom: "10px" }}
          >
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              style={{
                fontFamily: '"Jersey 10", sans-serif',
                fontSize: "20px",
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ ...labelLong, marginTop: "20px", marginBottom: "30px" }}>
        Input Longitude:
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ ...labelLong, marginTop: "-10px", marginBottom: "10px" }}
          >
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              style={{
                fontFamily: '"Jersey 10", sans-serif',
                fontSize: "20px",
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
      </div>

      <RoundedButton
        type="button"
        onClick={handleClick}
      >
        Retrieve DEM
      </RoundedButton>
      <div style={{ ...labelDisplay, marginTop: "80px", marginBottom: "50px" }}>
        <div>
          Display Elevation Data
          {elevationData !== null && (
            <pre>{JSON.stringify(elevationData, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
