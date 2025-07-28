import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Slider, Typography } from '@mui/material';
import CircularText from '../Home/CircularText';
import UserBadge from '../../UserBadge';
import { getUser, updateEshopParkingStatus, updateEshopStatus } from '../../API/fetchExpressAPI';
import CustomSnackbar from '../CustomSnackbar';
import { useSelector } from 'react-redux';

function BusinessHours({ data }) {
  const [sliderValue, setSliderValue] = useState(typeof data?.is_open === 'boolean' ? Number(data.is_open) : 0); // 0 = Closed, 1 = Open
  const [parkingSliderValue, setParkingSliderValue] = useState(data?.parking_availability || 0); 
  const [loading, setLoading] =  useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  const token = useSelector((state) => state.auth.userAccessToken);
    const [openDashboard, setOpenDashboard] = useState(false);
  
    useEffect(()=> {
      if(token){
        fetch_user(token);
      }
    },[token]);
  
    const fetch_user = async (token) => {
      const res = (await getUser(token))?.find((u)=>u.shop_no !== null);
      if(data.shop_access_token === res?.shop_access_token){
        setOpenDashboard(true);
      }else {
        setOpenDashboard(false);
      }
    }

  // Convert time to 12-hour format
  const convertTo12HourFormat = (time24) => {
    if (!time24) return '';
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  // Calculate initial value based on time
  useEffect(() => {
  const now = new Date();
  const [onHour, onMinute] = data.ontime?.split(':').map(Number) || [0, 0];
  const [offHour, offMinute] = data.offtime?.split(':').map(Number) || [0, 0];

  const onTime = new Date();
  const offTime = new Date();
  onTime.setHours(onHour, onMinute, 0);
  offTime.setHours(offHour, offMinute, 0);

  // If offTime is earlier than onTime, assume it's next day
  if (offTime < onTime) {
    offTime.setDate(offTime.getDate() + 1);
  }

  // If is_open is explicitly 0 or 1 (boolean-like), use it
  if (typeof data.is_open === 'boolean' || data.is_open === 0 || data.is_open === 1) {
    setSliderValue(Number(data.is_open));
  } else {
    // Otherwise, compute based on current time
    const isOpen = now >= onTime && now <= offTime;
    setSliderValue(isOpen ? 1 : 0);
  }
}, [data]);

  

  // Handle slider toggle
  const handleSliderChange = async (event, newValue) => {
    try{
      setLoading(true);
      const obj = {
        isOpen: Boolean(newValue),
        shop_access_token : data?.shop_access_token,
      }

      const resp = await updateEshopStatus(obj);
       setSnackbar({
          open: true,
          message: resp.message,
          severity: 'success',
        });
      setSliderValue(newValue);
    }catch(e){
       setSnackbar({
          open: true,
          message: e.response.data.message,
          severity: 'error',
        });
    }finally{
      setLoading(false);
    }
  };


  const handleParkingSliderChange = async (event, newValue) => {
    try{
      setLoading(true);
      const obj = {
        parking_availability: newValue,
        shop_access_token : data?.shop_access_token,
      }

      const resp = await updateEshopParkingStatus(obj);
       setSnackbar({
          open: true,
          message: resp.message,
          severity: 'success',
        });
      setParkingSliderValue(newValue);
    }catch(e){
       setSnackbar({
          open: true,
          message: e.response.data.message,
          severity: 'error',
        });
    }finally{
      setLoading(false);
    }
  };

  console.log(data);
  
  return (
    <Box className="business_hours_container">
      {loading && <Box className="loading"><CircularProgress/></Box>}

      <UserBadge
        handleBadgeBgClick={`../support/shop?token=${data.shop_access_token}`}
        handleLogin="../login"
        handleLogoutClick="../../"
      />

      <Box className="business_hours_wrapper">
        <CircularText text="Business Hours" />
        <Box className="hours_container">
        {!openDashboard ? <Box className="h_line"></Box> : <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          min={0}
          max={1}
          step={1}
          marks={[
            { value: 0, },
            { value: 1,  },
          ]}
          size="large"
          className="input_field open_close_slider"
        />}

        

        <Box className="open_close">
          <Typography className="status">
            {sliderValue === 1 ? 'Open' : 'Closed'}
          </Typography>
        </Box>
        </Box>

        <Box className="parking_status_container">
          <Box className="open_close">
          <Typography className="status">
            Parking
          </Typography>
        </Box>
        {!openDashboard ? (
  <Slider
    value={parkingSliderValue}
    min={0}
    max={2}
    step={1}
    marks={[
      { value: 0 },
      { value: 1 },
      { value: 2 },
    ]}
    size="large"
    disabled
    className="input_field parking_slider"
  />
) : (
  <Slider
    value={parkingSliderValue}
    onChange={handleParkingSliderChange}
    min={0}
    max={2}
    step={1}
    marks={[
      { value: 0 },
      { value: 1 },
      { value: 2 },
    ]}
    size="large"
    className="input_field parking_slider"
  />
)}

        </Box>

        <Typography className="time">
          {data?.ontime && data?.offtime
            ? `${convertTo12HourFormat(data.ontime)} - ${convertTo12HourFormat(data.offtime)}`
            : '00:00 - 00:00'}
        </Typography>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}

export default BusinessHours;
