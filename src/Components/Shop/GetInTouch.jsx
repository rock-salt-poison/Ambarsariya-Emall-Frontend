import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import map_img from "../../Utils/images/Sell/shop_details/map.svg";
import contact_img from "../../Utils/images/Sell/shop_details/contact_us.svg";
import home_img from "../../Utils/images/Sell/shop_details/home.svg";
import { Link } from "react-router-dom";
import StreetViewPopup from "./StreetViewPopup";

function GetInTouch({ data }) {
  const [openDialog, setOpenDialog] = useState(false);

  console.log(data);
  
  const details = [
    {
      id: 1,
      icon: map_img,
      text: data.address,
      onClick: () => setOpenDialog(true), // Open dialog when clicked
    },
    {
      id: 2,
      icon: contact_img,
      text: data.phone_no_1,
      redirectTo: `tel:${data.phone_no_1}`,
    },
    {
      id: 3,
      icon: home_img,
      text: data.address,
      redirectTo: `https://www.google.com/maps?q=${data.address}`,
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
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        message="Are you sure you want to logout?"
        optionalCname="street-view-dialog"
        lat={data.latitude}
        lng={data.longitude}
      />
    </Box>
  );
}

export default GetInTouch;
