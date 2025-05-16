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
  CircularProgress,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GeneralLedgerForm from "../Form/GeneralLedgerForm";
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import { get_nearby_areas_for_shop, get_support_page_famous_areas, put_near_by_shops } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";


function StreetViewPopup({ open, onClose, message, optionalCname, lat = 31.6356659, lng = 74.8787496, shop_no, shop_access_token, openDashboard }) {
  const API_KEY = process.env.REACT_APP_GOOGLE_API;
  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
  };
  const theme = createCustomTheme(themeProps);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  
  const [streetViewImg, setStreetViewImg] = useState("");
  const [nearByAreas, setNearByAreas] = useState([]);
  const [nearByArea, setNearByArea] = useState(null);

  console.log(nearByArea);
  
  useEffect(() => {
    if (open && shop_no && shop_access_token){
      fetchStreetView();
      fetchFamousAreas();
      fetch_near_by_area(shop_no, shop_access_token);
    }
  }, [open, shop_no, shop_access_token]); // Fetch data when dialog opens

  const fetchStreetView = async () => {
    try {
      const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=${API_KEY}`;
      setStreetViewImg(imageUrl);
    } catch (error) {
      console.error("Error fetching street view:", error);
    }
  };

  const fetchFamousAreas = async () => {
    try{
      setLoading(true);
      const resp = await get_support_page_famous_areas();
      if(resp){
        setNearByAreas(resp);
      }
    }catch(e){

    }finally{
      setLoading(false);
    }
  }

  const fetch_near_by_area = async (shop_no, shop_access_token) => {
    try{
      setLoading(true);
      const resp = await get_nearby_areas_for_shop(shop_access_token, shop_no);
      if(resp){
         const selectedArea = resp[0];
        setNearByArea(selectedArea);
        // Set the default selected option
        setFormData(prev => ({
          ...prev,
          nearByArea: selectedArea?.area_title
        }));
      }  
    }catch(e){
      console.error(e);
    }finally{
      setLoading(false);
    }
  }

  const initialData = {
      nearByArea:'',
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  const formFields = [
      {
          id: 1,
          label: 'Near-by area',
          name: 'nearByArea',
          type: openDashboard ? 'select':'text',
          options:nearByAreas?.map((area)=>`${area.area_title}`),
          readOnly: openDashboard ? nearByArea ? true : false : false
      },
      
  ];



  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });

      // Clear any previous error for this field
      setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission
      try{
        setLoading(true);
        const data = {
          shop_no,
          famous_area:formData?.nearByArea
        }
        const resp = await put_near_by_shops(data);
        if(resp?.success){
          setSnackbar({
            open: true,
            message: resp?.message,
            severity: 'success',
          });
          setTimeout(()=>{
            onClose();
          },800);
        }

        
      }catch(e){
        console.error(e);
        setSnackbar({
          open: true,
          message: e.response.data.message,
          severity: 'error',
        });
      }finally{
        setLoading(false);
      }
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
      {loading && <Box className="loading"><CircularProgress/></Box>}
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
        {openDashboard ? <GeneralLedgerForm
          formfields={formFields}
          handleSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
          errors={errors}
          submitBtnVisibility={openDashboard ? nearByArea ? false : true : false}
        /> : formData?.nearByArea && <GeneralLedgerForm
          formfields={formFields}
          handleSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
          errors={errors}
          submitBtnVisibility={openDashboard ? nearByArea ? false : true : false}
        />}
      </DialogContent>
    <CustomSnackbar
            open={snackbar.open}
            handleClose={() => setSnackbar({ ...snackbar, open: false })}
            message={snackbar.message}
            severity={snackbar.severity}
          />
    </Dialog>
    </ThemeProvider>
  );
}

export default StreetViewPopup;
