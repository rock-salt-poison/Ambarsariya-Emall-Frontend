import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
  Box,
  IconButton,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import FormField from "../Form/FormField";
import { updateEshopLocation } from "../../API/fetchExpressAPI";

const API_KEY = process.env.REACT_APP_GOOGLE_API;
const mapContainerStyle = { width: "100%", height: "350px" };

const PinDropPopup = ({
  open,
  onClose,
  optionalCname,
  lat = 31.6356659,
  lng = 74.8787496,
  shop_access_token,
  distance_from_pin,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [radius, setRadius] = useState((distance_from_pin ).toString() || "1"); // in km
  const circleRef = useRef(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });

  const markerPosition = { lat, lng };
  const validLength = parseFloat(radius) || 0;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }

    if (validLength > 0 && mapRef.current) {
      circleRef.current = new window.google.maps.Circle({
        center: markerPosition,
        radius: validLength,
        fillColor: "rgba(255, 0, 0, 0.33)",
        strokeColor: "red",
        map: mapRef.current,
      });
    }
  }, [validLength, lat, lng]);

  const handleOnChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value > 100000) value = 100000;
    setRadius(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validLength && shop_access_token) {
      try {
        setLoading(true);
        await updateEshopLocation({
          distance_from_pin: validLength,
          location_pin_drop: [{ lat, lng }],
          shop_access_token,
        });
        onClose();
      } finally {
        setLoading(false);
      }
    }
  };

  if (loadError) return <p>Error loading maps.</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  console.log("Lat:", lat, "Lng:", lng);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      className={optionalCname}
    >
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <DialogContent className="content">
        <Box id="confirm-message" display="flex" justifyContent="space-between">
          <Typography variant="h6">Select Coverage Area</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={markerPosition}
          onLoad={(map) => (mapRef.current = map)}
        >
          <MarkerF position={markerPosition} />
        </GoogleMap>

        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <FormField
            hiddenLabel
            variant="outlined"
            name="radius"
            type="number"
            value={radius}
            onChange={handleOnChange}
            required
            className="input_field"
            placeholder="Enter radius in meters"
            fullWidth
            inputProps={{ min: 0, max: 100000 }}
          />
          <Button type="submit" className="submitBtn" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PinDropPopup;
