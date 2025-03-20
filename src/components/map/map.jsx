import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import image from "./img/bike.png";
import image0 from "./img/deli4.png";

const containerStyle = {
  width: "50vw",
  height: "400px",
  position: "relative",
  borderRadius: 25,
  boxShadow: "0 10px 8px rgba(0, 0, 0, 0.3)",
  left: 80,
  top: 100,
};

const inputStyle = {
  boxSizing: "border-box",
  border: "1px solid transparent",
  width: "300px",
  height: "35px",
  padding: "0 12px",
  borderRadius: "3px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  fontSize: "14px",
  outline: "none",
  textOverflow: "ellipsis",
  position: "absolute",
  top: "28%",
  left: "18%",
  transform: "translate(-50%, -50%)",
  zIndex: 999,
};

const MapRoute = () => {
  const autocomplete = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [mapZoom, setMapZoom] = useState(18);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const setCurrentLocationMarker = (position) => {
      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log("Current location:", currentLocation);
      setCurrentLocation(currentLocation);
      setMapZoom(18);
    };

    navigator.geolocation.getCurrentPosition(
      setCurrentLocationMarker,
      (error) => {
        console.error("Error getting current location:", error);
      }
    );

    const watchId = navigator.geolocation.watchPosition(
      setCurrentLocationMarker,
      (error) => {
        console.error("Error getting current location:", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const onLoadAutocomplete = (autocompleteInstance) => {
    autocomplete.current = autocompleteInstance;
  };

  const onPlaceChanged = () => {
    if (autocomplete.current) {
      const place = autocomplete.current.getPlace();
      if (place && place.geometry) {
        const destination = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setDestination(destination);
        setMapZoom(18);
        calculateDirections(currentLocation, destination);
      }
    }
  };

  const calculateDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          const route = result.routes[0];
          const legs = route.legs[0];
          setDistance(legs.distance.text);
          setDuration(legs.duration.text);
        } else {
          console.error("Directions request failed due to ", status);
        }
      }
    );
  };

  return (
    <div style={{ backgroundImage: `url(${image0})`, height: "100vh" }}>
      <LoadScript
        googleMapsApiKey="AIzaSyDfVQzBHlXDkSgvLZUHHbutEh5Y5WmlHPA"
        libraries={["places"]}
        async={true}
      >
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter a location"
            style={inputStyle}
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={mapZoom}
        >
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: image,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
          {destination && (
            <Marker
              position={origin}
              icon={{
                url: image,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#008c9f",
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      {distance && duration && (
        <div
          style={{
            marginTop: "22vh",
            position: "absolute",
            fontWeight: "600",
            border: 1,
            backgroundColor: "yellow",
            width: "10%",
            borderRadius: 20,
            padding: 5,
            left: 93,
            top: 80,
            height: "auto",
          }}
        >
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}
    </div>
  );
};

export default MapRoute;