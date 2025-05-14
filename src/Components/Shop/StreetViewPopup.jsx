import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  useTheme,
  Box,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GeneralLedgerForm from "../Form/GeneralLedgerForm";
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';


function StreetViewPopup({ open, onClose, message, optionalCname, lat = 31.6356659, lng = 74.8787496 }) {
  const API_KEY = process.env.REACT_APP_GOOGLE_API;
  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };
  const theme = createCustomTheme(themeProps);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  
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

  const initialData = {
      availability:'',
      location:'',
      hours:'',
      instructions:'',
      estimated_pickup_time:'',
      confirmation:'',
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});


  const formFields = [
      {
          id: 1,
          label: 'Near-by areas',
          name: 'nearByAreas',
          type: 'select',
          options:[]
      },
      
  ];



  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });

      // Clear any previous error for this field
      setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
            console.log(formData);
            // Proceed with further submission logic, e.g., API call
    };

  return (
    <ThemeProvider theme={theme}>
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
        <GeneralLedgerForm
          formfields={formFields}
          handleSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />
      </DialogContent>
    </Dialog>
    </ThemeProvider>
  );
}

export default StreetViewPopup;
