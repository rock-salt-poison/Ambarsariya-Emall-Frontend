import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import { Link, useNavigate } from "react-router-dom";
import bg_img from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/municipal-corporation_bg.webp"
import vendor_commission_services from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/vendor_commission_services.webp"
import grievance_form from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/grievance_form.webp"
import trade_license from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/trade_license.webp"
import services_by_municipal_corporation from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/services_by_municipal_corporation.webp"

function MunicipalCorporation() {
  const [audio] = useState(new Audio(hornSound));
  const [hasShopAccessToken, setHasShopAccessToken] = useState(false);
  const [shopNo, setShopNo] = useState(null);

  const handleServiceClick = (e, serviceId) => {
    e.preventDefault();
    
  };


  return (
    <Box className="municipal_corporation_wrapper">
      <Box className="content">

        <Box component="img" src={bg_img} alt="municipal_corporation_image" className="bg_img"/>
        {/* Header */}
        <Box className="header">
          <Box></Box>
         
            <Box className="title_container">
              <Link to={-1} className='title_link'>
                  <Typography className="title">
                    Municipal Corporation of Amritsar
                  </Typography>
              </Link>
            </Box>
            <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="../login"
          />
        </Box>

        <Box className="body">
          <Box className="trade_license_container">
            <Box component="img" src={trade_license} alt="trade_license" className="trade_license_img"/>
          </Box>
          <Box className="grievance_license_container">
            <Box component="img" src={grievance_form} alt="grievance_form" className="grievance_license_img"/>
          </Box>
          <Box className="services_by_municipal_corporation_container">
            <Box component="img" src={services_by_municipal_corporation} alt="services_by_municipal_corporation" className="services_by_municipal_corporation_img"/>
          </Box>
          <Box className="vendor_commission_services_container">
            <Box component="img" src={vendor_commission_services} alt="vendor_commission_services" className="vendor_commission_services_img"/>
          </Box>
        </Box>

       
      </Box>
    </Box>
  );
}

export default MunicipalCorporation;
