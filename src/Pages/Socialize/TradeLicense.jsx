import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import UserBadge from "../../UserBadge";
import { Link } from "react-router-dom";
import trade_license from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/trade_license.webp";
import logo from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/mca_logo.webp";
import check_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/trade_license/check_icon.svg";
import health_safety_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/trade_license/health_safety_icon.png";
import title_bg from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/trade_license/title_bg.png";
import cloud from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/municipal_corporation/trade_license/cloud.webp";
import CardBoardPopup from "../../Components/CardBoardPopupComponents/CardBoardPopup";
import PaymentPopupContent from "../../Components/Socialize/TradeLicense/PaymentPopupContent";

function TradeLicense() {
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

  const handlePayNowClick = () => {
    setOpenPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setOpenPaymentPopup(false);
  };
  return (
    <Box className="trade_license_wrapper">

      {/* Top Section */}
      <Box className="header">
        {/* Left: Logo */}
        <Box className="logo_container">
          <Box component="img" src={logo} alt="Ambarsariya Mall" className="mca_logo" />
        </Box>

        {/* Center: License Plate */}
        <Box component="img" src={trade_license} alt="trade_license" className="trade_license_logo" />

        {/* Right: Merchant Badge */}
        <UserBadge
          handleBadgeBgClick={-1}
          handleLogin="../login"
          handleLogoutClick="../../"
        />
      </Box>
      <Box className="body">
        {/* Mid-Section: Text Overlay on Ship */}
        <Box className="ship_text_overlay">
          <Box component="img" src={cloud} alt="cloud" className="cloud" />
          <Box className="content">
            <Box className="content_body">
              <Typography className="text">WELCOME TO E-MALL</Typography>
              <Typography className="text">SHOP : FINANCE MART</Typography>
              <Typography className="text">BY MS MUSKAN</Typography>
            </Box>
            <Box className="content_footer">
              <Typography className="text">M.C.A. TRADE AUTHORITY</Typography>
            </Box>
          </Box>
        </Box>

        {/* Bottom Section: Information Panel */}
        <Box className="info_panel">
          {/* Left Column */}
          <Box className="info_left_column">
            <Box className="info_item">
              <Box component="img" src={title_bg} className="title_img" alt="bg"/>
              <Typography className="info_label">TRADE LICENSE</Typography>
              <Typography className="info_label">NO: 213E-W12 ASR II</Typography>
            </Box>

            <Box className="info_item">
              <Box component="img" src={title_bg} className="title_img" alt="bg"/>
              <Typography className="info_label">TRADE 2% SALE</Typography>
              <Typography className="info_label">COMMISSION : 12000 PENDING</Typography>
            </Box>

            <Box className="info_item">
              <Box component="img" src={title_bg} className="title_img" alt="bg"/>
              <Typography className="info_label">TRADE 2% PURCHASE</Typography>
              <Typography className="info_label">COMMISSION : 5000 PENDING</Typography>
            </Box>

            <Box className="info_item">
              <Box component="img" src={title_bg} className="title_img" alt="bg"/>
              <Typography className="info_label">WALLET LEDGER : 1000</Typography>
              <Typography className="info_label">Available : 1000</Typography>
            </Box>
          </Box>

          {/* Right Column */}
          <Box className="info_right_column">
            <Box className="status_item">
              <Box className="status_header">
                <Typography className="status_label">TRADE : ACTIVE</Typography>
              <Typography className="status_label">EXPIRY DATE : 03-08-2026</Typography>
              </Box>
                <Box component="img" src={check_icon} alt="check" className="icon" />
            </Box>

            <Box className="status_item">
              <Box className="status_header">
                <Typography className="status_label">VENDORS : ACTIVE</Typography>
              <Typography className="status_label">EXPIRY DATE : 06-08-2026</Typography>
              </Box>
                <Box component="img" src={check_icon} alt="check" className="icon" />
            </Box>

            <Box className="status_item">
              <Box className="status_header">
                <Typography className="status_label">HEALTH & SAFETY : 03-01-2026</Typography>
              <Typography className="status_label">Pollution Control : 03-01-2026</Typography>
              </Box>
                <Box component="img" src={health_safety_icon} alt="health safety" className="icon" />
            </Box>

            <Box className="status_item">
              <Box className="status_header">
                <Typography className="status_label">Paid : 0.00</Typography>
                <Typography className="status_label">COMMISSION BALANCE : 17000</Typography>
              </Box>
            <Button className="pay_now_button" onClick={handlePayNowClick}>PAY NOW</Button>
            </Box>

          </Box>
        </Box>
      </Box>

      <CardBoardPopup
        open={openPaymentPopup}
        handleClose={handleClosePaymentPopup}
        customPopup={true}
        body_content={<PaymentPopupContent />}
        optionalCName="payment_popup card_board_popup"
      />
    </Box>
  );
}

export default TradeLicense;
