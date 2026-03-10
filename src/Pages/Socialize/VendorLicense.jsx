import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/mca_logo.webp";
import left_col from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/vendor_license/card_bg_1.webp";
import right_col from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/vendor_license/card_bg_2.webp";
import category_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/vendor_license/category_icon.webp";
import location_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/vendor_license/location_icon.png";
import calendar_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/vendor_license/calendar_icon.png";
import foods_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/vendor_license/foods_icon.webp";
import Header from "../../Components/Serve/SupplyChain/Header";

function VendorLicense() {
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

  const handlePayNowClick = () => {
    setOpenPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setOpenPaymentPopup(false);
  };

  const left_col_items = [
    { id: 1, icon: category_icon, text: [{ heading: 'Category :', desc: 'Packaged foods', subtitle: 'Snacks, Ready-to-eat meals, Canned goods, frozen foods' }] },
    { id: 2, icon: location_icon, text: 'Majitha road ward - 128/ASR III/W' },
    { id: 3, icon: calendar_icon, text: 'All days' },
    { id: 4, icon: calendar_icon, text: '02:00 PM To 09:00 PM' },
    { id: 5, icon: foods_icon, text: [{ heading: 'Packaged Foods :', desc: 'Snacks (Ready-to-eat meals, Canned goods, frozen foods)' }] },
  ]

  const right_col_items = [
    { id: 1, text: [{ heading: 'Vendor License :', desc: 'W/w-128/ASR - III / Daily needs' }] },
    { id: 2, text: [{ heading: 'Category :', desc: 'Packaged Foods', subtitle: 'Snacks, Ready-to-eat meals, Canned goods, frozen foods' }]  },
    { id: 3, text: [{ heading: 'Vendor Renewal :', desc: '06-04-2026'}]  },
    { id: 4, text: [{ heading: 'Renewal Safety & Health :', desc: '06-04-2026'}]  },
    { id: 5, text: [{ heading: 'Sector :', desc: 'Food & Beverages'}] },
    { id: 6, text: [{ heading: 'Vehicle Type :', desc: 'Electric'}] },
  ]

  const card_heading = (text) => {
    return (
      <Box className="heading_container">
        <Typography className="heading">{text}</Typography>
      </Box>
    )
  }

  const card_items = (items) => {
    return (
      <Box className="list_item_container">
        {
          items?.map((item, index) => {
           return <Box className="items" key={index}>
              {item?.icon && <Box component="img" src={item.icon} alt="icon" className="icon" />}
              {Array.isArray(item?.text) ? (
              <Box className="text_content">
                  {item?.text?.map((text)=>{
                    return <Box className="container">
                      <Typography className="text heading">
                        {text?.heading}
                      </Typography>
                      <Typography className="text">
                        {text?.desc}
                      </Typography>
                      <Typography className="text small">
                        {text?.subtitle}
                      </Typography>
                    </Box>
                  })}
                </Box>
              ) : (<Box className="text_content">
                <Typography className="text">{item.text}</Typography></Box>)}
            </Box>
          })
        }
      </Box>
    )
  }
  return (
    <Box className="vendor_license_wrapper">

      {/* Top Section */}
      <Header back_btn_link={-1} next_btn_link={''} heading_with_bg={true} title={'Vendor License'} icon_1={logo} redirectTo={''} next_btn={true} />

      <Box className="body">
        <Box className="col left">
          <Box component="img" src={left_col} alt="left" className="col_bg left" />
          <Box className="content">
            {card_heading('On-Demand Service Bookings')}
            {card_items(left_col_items)}
          </Box>
        </Box>
        <Box className="col right">
          <Box component="img" src={right_col} alt="left" className="col_bg right" />
          <Box className="content right">
            {card_heading('Movable with motor')}
            {card_items(right_col_items)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default VendorLicense;
