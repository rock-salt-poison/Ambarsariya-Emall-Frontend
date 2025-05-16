import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import map_img from "../../Utils/images/Sell/shop_details/map.svg";
import contact_img from "../../Utils/images/Sell/shop_details/contact_us.svg";
import home_img from "../../Utils/images/Sell/shop_details/home.svg";
import { Link } from "react-router-dom";
import StreetViewPopup from "./StreetViewPopup";
import PinDropPopup from "./PinDropPopup";
import { useSelector } from "react-redux";
import { getUser } from "../../API/fetchExpressAPI";

function GetInTouch({ data }) {
  const [openStreetView, setOpenStreetView] = useState(false);
  const [openPinDrop, setOpenPinDrop] = useState(false);
  console.log(data);

  const token = useSelector((state) => state.auth.userAccessToken);
  const [openDashboard, setOpenDashboard] = useState(false);

  useEffect(()=> {
    if(token){
      fetch_user(token);
    }
  },[token]);

  const fetch_user = async (token) => {
    const res = await getUser(token);
    if(data.shop_access_token === res[0].shop_access_token){
      setOpenDashboard(true);
    }else {
      setOpenDashboard(false);
    }
  }
  
  const details = [
    {
      id: 1,
      icon: map_img,
      text: data.address,
      onClick: () => setOpenStreetView(true), // Open dialog when clicked
    },
    {
      id: 2,
      icon: contact_img,
      text: data.phone_no_1,
      redirectTo: `tel:${data.phone_no_1}`,
    },
    openDashboard
    ? {
        id: 3,
        icon: home_img,
        text: data.address,
        onClick: () => setOpenPinDrop(true), // Open PinDrop dialog when clicked
      }
    : {
        id: 3,
        icon: home_img,
        text: data.address,
        redirectTo: `https://www.google.com/maps?q=${data.address}`, // Redirect to Google Maps when clicked
        target: "_blank",
      },
  ];

  console.log(data);
  
  return (
    <Box className="get_in_touch_wrapper">
      <Box className="contact_row">
        {details.map((item) =>
          item.onClick ? ( // If onClick exists, render as button
            <Link
              key={item.id}
              className="col"
              component="button"
              onClick={item.onClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box component="img" src={item.icon} className="icon" />
              <Typography className="text">{item.text}</Typography>
            </Link>
          ) : (
            <Link
              className="col"
              key={item.id}
              to={item.redirectTo}
              target={item.target}
            >
              <Box component="img" src={item.icon} className="icon" />
              <Typography className="text">{item.text}</Typography>
            </Link>
          )
        )}
      </Box>

      {/* Dialog */}
      <StreetViewPopup
        open={openStreetView}
        onClose={() => setOpenStreetView(false)}
        message="Are you sure you want to logout?"
        optionalCname="map-popup-dialog"
        lat={data.latitude}
        lng={data.longitude}
        shop_no={data.shop_no}
        openDashboard={openDashboard}
        shop_access_token={data.shop_access_token}
      />

      <PinDropPopup
        open={openPinDrop}
        onClose={() => setOpenPinDrop(false)}
        lat={parseFloat(data?.location_pin_drop?.[0]?.lat ? data?.location_pin_drop?.[0]?.lat : data.latitude)}
        lng={parseFloat(data?.location_pin_drop?.[0]?.lng ? data?.location_pin_drop?.[0]?.lng : data.longitude)}
        optionalCname="map-popup-dialog"
        shop_access_token={data.shop_access_token}
        distance_from_pin={data.distance_from_pin}
        location_pin_drop={data.location_pin_drop}
      />
    </Box>
  );
}

export default GetInTouch;
