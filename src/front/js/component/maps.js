import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "400px",
};

const center = {
  lat: 40.41584347263048,
  lng: -3.707348573835935,
};

const directionsOptions = {
  origin: "Madrid, Spain",
  destination: "London, UK",
  travelMode: "DRIVING",
};

function Maps(props) {
  const [response, setResponse] = useState(null);

  const directionsCallback = (res) => {
    if (res != null) {
      setResponse(res);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4"
      onLoad={() => console.log("API loaded")}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        <DirectionsService
          options={directionsOptions}
          callback={directionsCallback}
        />
        {response !== null && (
          <DirectionsRenderer options={{ directions: response }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Maps);
