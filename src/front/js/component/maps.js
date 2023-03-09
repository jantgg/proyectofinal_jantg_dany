import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function Maps(props) {
  const [response, setResponse] = useState(null);
  const [directionsOptions, setDirectionsOptions] = useState({
    origin: props.origin,
    destination: props.destination,
    travelMode: "DRIVING",
  });

  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  const center = {
    lat: 40.41584347263048,
    lng: -3.707348573835935,
  };

  const directionsCallback = (res) => {
    if (res != null) {
      setResponse(res);
    }
  };

  useEffect(() => {
    setDirectionsOptions({
      origin: props.origin,
      destination: props.destination,
      travelMode: "DRIVING",
    });
  }, [props.origin, props.destination]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4"
      onLoad={() => console.log("API loaded")}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        {directionsOptions.origin && directionsOptions.destination && (
          <DirectionsService
            options={directionsOptions}
            callback={directionsCallback}
          />
        )}
        {response !== null && (
          <DirectionsRenderer options={{ directions: response }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Maps;
