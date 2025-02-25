import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  useTheme,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function StreetViewPopup({ open, onClose, message, optionalCname, lat = 31.6356659, lng = 74.8787496 }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const API_KEY = process.env.REACT_APP_GOOGLE_API;
  
  const [streetViewImg, setStreetViewImg] = useState("");

  useEffect(() => {
    if (open) fetchStreetView();
  }, [open]); // Fetch data when dialog opens

  const fetchStreetView = async () => {
    try {
      const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=${API_KEY}`;
      setStreetViewImg(imageUrl);
    } catch (error) {
      console.error("Error fetching street view:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      className={optionalCname}
    >
      <DialogContent className="content">
        <Box id="confirm-message">
        
          Street View
          <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton></Box>
        {streetViewImg && (
          <Box
            component="img"
            src={streetViewImg}
            alt="Street View"
            sx={{ width: "100%", borderRadius: "8px", marginTop: 2 }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default StreetViewPopup;
