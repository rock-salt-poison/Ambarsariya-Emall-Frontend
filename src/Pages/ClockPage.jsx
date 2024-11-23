import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import clockBgImg from '../Utils/images/clock-bg.webp';
import Sidebar from '../Components/Home/ClockPageComponents/Sibebar';
import Clock from '../Components/Home/Clock';
import Button2 from '../Components/Home/Button2';
import TravelNeeds from '../Components/Home/ClockPageComponents/TravelNeeds';
import Date_Time_Weather from '../Components/Home/ClockPageComponents/Date_Time_Weather';
import CalendarIcon from '../Utils/images/calendarIcon.png';
import CloudsIcon from '../Utils/images/cloudsIcon.png';
import CurrencyAndTimeComponent from '../Components/Home/ClockPageComponents/CurrencyAndTimeComponent';
import { fetchWeatherData } from '../API/weatherAPI2';
import useHeight from '../customHooks/useHeight';

function ClockPage() {
  const [weather, setWeather] = useState(null);
  const [ref, height] = useHeight();

  console.log(height);

  useEffect(() => {
    // Fetch weather details when component mounts
    const city = 'Amritsar'; // Replace 'YourCity' with the city name you want to fetch weather for
    fetchWeather(city);
  }, []);

  const fetchWeather = async (city) => {
    try {
      const data = await fetchWeatherData(city);
      setWeather(data); // Set weather details in state
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <Box className="clock-wrapper">
      <Box className="col-1">
        <Sidebar
          backButton={<Box ref={ref}>
              <Button2 text="Back" redirectTo="/AmbarsariyaMall" /></Box>}
          componentToRender={<TravelNeeds text="All your travel needs" />} componentToRender2={<Date_Time_Weather imgSrc={CalendarIcon} text1="Wednesday" text2="04 June" />} currencyAndTimeComponent={<CurrencyAndTimeComponent />} />
      </Box>
      <Box className="col-2">
        <Box component="img" src={clockBgImg} className="clockBgImg" alt="clock-bg-img" />
        <Box className="wrapper-2">
          <Clock />
        </Box>
      </Box>
      <Box className="col-1">
        <Sidebar 
        backButton={
          <Box sx={{ height: `${height}px`,width:'100%' }}></Box>}
        componentToRender={<TravelNeeds text="ESPN Feed" optionalButton={<Button2 text="Sports" />} />}
        componentToRender2={<Date_Time_Weather imgSrc={CloudsIcon} text1={weather ? weather.type : 'Loading...'} text2={weather ? `${weather.temp} °C` : 'Loading...'} />} 
        currencyAndTimeComponent={<CurrencyAndTimeComponent optionalCName="currency-wrapper-2" />}
        />
      </Box>
    </Box>
  );
}

export default ClockPage;
