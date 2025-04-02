import React, { useCallback, useEffect, useState } from "react";
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
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import FormField from "../Form/FormField";
import Button2 from "../Home/Button2";
import { updateEshopLocation } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";

const API_KEY = process.env.REACT_APP_GOOGLE_API;

const mapContainerStyle = { width: "100%", height: "350px" };

function PinDropPopup({ open, onClose, optionalCname, lat = 31.6356659, lng = 74.8787496, onLocationSelect, shop_access_token, distance_from_pin }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [radius, setRadius] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });


  
  // Ensure marker is set to default lat/lng when the map loads or when lat/lng props change
  useEffect(() => {
    setSelectedLocation({ lat, lng });
    if (distance_from_pin) {
      setRadius(distance_from_pin);
    }
  }, [lat, lng]);

  // Handle map click to update marker position
  const onMapClick = useCallback(
    (event) => {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      console.log("New Marker Location:", newLocation);

      setSelectedLocation(newLocation);

      if (onLocationSelect) {
        onLocationSelect(newLocation);
      }
    },
    [onLocationSelect]
  );

  // Handle input field change
  const handleOnChange = (e) => {
    setRadius(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(radius && selectedLocation && shop_access_token){
      try{
        setLoading(true);
        const data = {
          location_pin_drop: selectedLocation,
          distance_from_pin: radius,
          shop_access_token
        }
        const resp = await updateEshopLocation(data);
        console.log(resp);
        setSnackbar({
          open: true,
          message: "E-shop location successfully updated.",
          severity: "success",
        });                
      }catch(e){
        console.error(e);
      }finally{
        setLoading(false);
      }
    }
  }

  if (loadError) return <p>Error loading maps.</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      className={optionalCname}
    >
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <DialogContent className="content">
        <Box id="confirm-message">
          Pin Drop
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={selectedLocation || { lat, lng }} // Ensure the map centers on the default position
          onClick={onMapClick}
        >
          {/* Ensure the marker is always rendered at the selected location */}
          {selectedLocation && <Marker key={`${selectedLocation.lat}-${selectedLocation.lng}`} position={selectedLocation} />}
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
        />


        <Button type="submit" className="submitBtn" onClick={handleSubmit}>Submit</Button>
      </Box>
         
      </DialogContent>
      <CustomSnackbar
                open={snackbar.open}
                handleClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                severity={snackbar.severity}
              />
    </Dialog>
  );
}

export default PinDropPopup;
