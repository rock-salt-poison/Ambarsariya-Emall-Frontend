import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import clockBgImg from "../Utils/images/clock-bg.webp";
import Sidebar from "../Components/Home/ClockPageComponents/Sibebar";
import Clock from "../Components/Home/Clock";
import Button2 from "../Components/Home/Button2";
import TravelNeeds from "../Components/Home/ClockPageComponents/TravelNeeds";
import Date_Time_Weather from "../Components/Home/ClockPageComponents/Date_Time_Weather";
import CalendarIcon from "../Utils/images/calendarIcon.png";
import CloudsIcon from "../Utils/images/cloudsIcon.png";
import CurrencyAndTimeComponent from "../Components/Home/ClockPageComponents/CurrencyAndTimeComponent";
import { fetchWeatherData } from "../API/weatherAPI2";
import useHeight from "../customHooks/useHeight";
import { get_countries } from "../API/fetchExpressAPI";
import Coupon from "../Components/Home/TimeTablePopupComponents/Coupon";
import clockPageNeonBg from "../Utils/images/clock-page-neon-shadow.png";
import UserBadge from "../UserBadge";

function ClockPage() {
  const [weather, setWeather] = useState(null);
  const [ref, height] = useHeight();
  const [data, setData] = useState([]);

  console.log(height);

  useEffect(() => {
    // Fetch weather details when component mounts
    const city = "Amritsar"; // Replace 'YourCity' with the city name you want to fetch weather for
    fetchWeather(city);
    fetch_countries_from_database();
  }, []);

  const fetchWeather = async (city) => {
    try {
      const data = await fetchWeatherData(city);
      setWeather(data); // Set weather details in state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetch_countries_from_database = async () => {
    try {
      const res = await get_countries();
      if (res.message === "Valid") {
        const data = res.data;
        if (data) {
          setData(data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderComponent = () => {
    return (
      <Box className="travelWrapper">
        <Box
          component="img"
          src={clockPageNeonBg}
          className="neonBorderImg"
          alt="neon-border"
        />
        {/* <Coupon page='clock'/> */}
      </Box>
    );
  };

  const updatedAt = data?.[0]?.updated_at 
  ? new Date(data[0].updated_at.replace("Z", ""))  // Remove 'Z' to prevent UTC assumption
  : null;

const formattedTime = updatedAt
  ? updatedAt.toLocaleTimeString('en-IN', {
      day:'2-digit',
      month:'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  : "N/A";


  return (
    <Box className="clock-wrapper">
      <Box className="col-1">
        <Sidebar
          backButton={
            <Box ref={ref}>
              {/* <Button2 text="Back" redirectTo="/" /> */}
            </Box>
          }
          componentToRender={renderComponent()}
          componentToRender2={
            <Date_Time_Weather
              text1="Last Updated Currency"
              text2={formattedTime}
            />

          }
          currencyAndTimeComponent={
            <CurrencyAndTimeComponent data={data ? data.slice(0, 3) : ""} />
          }
        />
      </Box>
      <Box className="col-2">
        <Box
          component="img"
          src={clockBgImg}
          className="clockBgImg"
          alt="clock-bg-img"
        />
        <Box className="wrapper-2">
          <Clock />
        </Box>
        <UserBadge
                handleBadgeBgClick="/"
                handleLogin="sell/login"
                handleLogoutClick="../../"
              />
      </Box>
      <Box className="col-1">
        <Sidebar
          backButton={<Box sx={{ height: `${height}px`, width: "100%" }}></Box>}
          componentToRender={
            <>
              <UserBadge
                handleBadgeBgClick="/"
                handleLogin="sell/login"
                handleLogoutClick="../../"
              />
              <TravelNeeds
                text="ESPN Feed"
                optionalButton={<Button2 text="Sports" />}
              />
            </>
          }
          componentToRender2={
            <Date_Time_Weather
              imgSrc={CloudsIcon}
              text1={weather ? weather.type : "Loading..."}
              text2={weather ? `${weather.temp} °C` : "Loading..."}
            />
          }
          currencyAndTimeComponent={
            <CurrencyAndTimeComponent
              optionalCName="currency-wrapper-2"
              data={data ? data.slice(3) : ""}
            />
          }
        />
      </Box>
    </Box>
  );
}

export default ClockPage;
