import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
  Box,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleMap, Marker, useLoadScript, Polyline } from "@react-google-maps/api";
import FormField from "../Form/FormField";
import { updateEshopLocation } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";

const API_KEY = process.env.REACT_APP_GOOGLE_API;
const mapContainerStyle = { width: "100%", height: "350px" };

function PinDropPopup({
  open,
  onClose,
  optionalCname,
  lat = 31.6356659,
  lng = 74.8787496,
  onLocationSelect,
  shop_access_token,
  distance_from_pin,
  location_pin_drop,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const [radius, setRadius] = useState(""); // Pre-filled with distance_from_pin
  const [points, setPoints] = useState([]); // Stores clicked points
  const [totalDistance, setTotalDistance] = useState(0);

  const mapRef = useRef(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["geometry"],
  });

  useEffect(() => {
    console.log("location_pin_drop received:", location_pin_drop); // Debugging log

    if (lat && lng) {
      setLocation({ lat, lng });
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
      }
    }

    // Set initial radius if distance_from_pin exists
    if (distance_from_pin) {
      setRadius(distance_from_pin.toFixed(2));
      setTotalDistance(distance_from_pin);
    }

    // Ensure location_pin_drop is an array before setting points
    if (Array.isArray(location_pin_drop) && location_pin_drop.length > 0) {
      setPoints(location_pin_drop.map((point) => ({ lat: point.lat, lng: point.lng })));
    }
  }, [lat, lng, distance_from_pin, location_pin_drop]);

  console.log("Markers to be displayed:", points); // Debugging log

  // Calculate total distance when points change
  useEffect(() => {
    if (isLoaded && window.google?.maps?.geometry?.spherical && points.length > 0) {
      const { computeDistanceBetween } = window.google.maps.geometry.spherical;
      let distance = 0;
      const firstMarkerLatLng = new window.google.maps.LatLng(lat, lng);

      points.forEach((point) => {
        distance += computeDistanceBetween(
          firstMarkerLatLng,
          new window.google.maps.LatLng(point.lat, point.lng)
        );
      });

      const cappedDistance = Math.min(distance, 100);
      setTotalDistance(cappedDistance.toFixed(2));
    }
  }, [isLoaded, points, lat, lng]);

  // Handle map click to add points dynamically
  const onMapClick = useCallback((event) => {
    if (!window.google?.maps?.geometry?.spherical) {
      console.warn("Google Maps geometry library not loaded yet.");
      return;
    }

    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const newPoints = [...points, newPoint];
    const { computeDistanceBetween } = window.google.maps.geometry.spherical;

    let newDistance = 0;
    const firstMarkerLatLng = new window.google.maps.LatLng(lat, lng);

    newPoints.forEach((point) => {
      newDistance += computeDistanceBetween(
        firstMarkerLatLng,
        new window.google.maps.LatLng(point.lat, point.lng)
      );
    });

    if (newDistance <= 100) {
      setPoints(newPoints);
    }
  }, [points, lat, lng]);

  const onMarkerDragEnd = useCallback((index, event) => {
    const newPoints = [...points];
    newPoints[index] = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setPoints(newPoints);
  }, [points]);

  const onMarkerClick = useCallback((index) => {
    setPoints((prevPoints) => prevPoints.filter((_, i) => i !== index));
  }, []);

  const handleOnChange = (e) => {
    let value = e.target.value;
    if (value > 100) {
      value = 100;
    }
    setRadius(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalDistance && points.length > 0 && shop_access_token) {
      try {
        setLoading(true);
        const data = {
          location_pin_drop: points,
          distance_from_pin: parseFloat(totalDistance),
          shop_access_token,
        };
        await updateEshopLocation(data);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loadError) return <p>Error loading maps.</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth maxWidth="sm" className={optionalCname}>
      {loading && <Box className="loading"><CircularProgress /></Box>}
      <DialogContent className="content">
        <Box id="confirm-message">
          Pin Drop
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={{ lat: location.lat, lng: location.lng }}
          onClick={onMapClick}
          onLoad={(map) => (mapRef.current = map)}
        >
          <Marker position={{ lat: location.lat, lng: location.lng }} draggable={false} />

          {points.length > 0 && points.map((point, index) => (
            <Marker
              key={index}
              position={point}
              draggable
              onDragEnd={(event) => onMarkerDragEnd(index, event)}
              onClick={() => onMarkerClick(index)}
            />
          ))}

          {points.length > 0 && (
            <Polyline
              path={points}
              options={{
                strokeColor: "black",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>

        <Box component="form" onSubmit={handleSubmit}>
          <FormField
            hiddenLabel
            variant="outlined"
            name="radius"
            type="number"
            value={radius}
            onChange={handleOnChange}
            required={true}
            className="input_field"
            placeholder="Enter radius in meters"
            fullWidth
            inputProps={{
              min: 0,
              max: 100,
            }}
          />

          <Button type="submit" className="submitBtn">
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default PinDropPopup;
