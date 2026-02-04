import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import { useNavigate } from "react-router-dom";
import standardFitBg from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/standard_fit_bg.webp";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonitorIcon from '@mui/icons-material/Monitor';
import WarningIcon from '@mui/icons-material/Warning';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import standard_fit from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/mask_1.png";

function StandardFit() {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();

  const handleBackClick = () => {
    audio.play();
    setTimeout(() => {
      navigate("../city-junctions/utilities-main");
    }, 300);
  };

  const services = [
    {
      id: "pickup",
      title: "PICKUP",
      icon: <ShoppingBagIcon sx={{ fontSize: 60, color: "#4CAF50" }} />,
    },
    {
      id: "takeaway",
      title: "TAKE-AWAY",
      icon: <ShoppingBagIcon sx={{ fontSize: 60, color: "#FFC107" }} />,
    },
    {
      id: "homevisit",
      title: "HOME VISIT",
      icon: <HomeIcon sx={{ fontSize: 60, color: "#FF9800" }} />,
    },
    {
      id: "delivery",
      title: "DELIVERY",
      icon: <TwoWheelerIcon sx={{ fontSize: 60, color: "#FFC107" }} />,
    },
  ];

  const enhanced = [
    {
      id: "realtime",
      title: "REAL TIME STOCK STATUS",
      icon: <MonitorIcon sx={{ fontSize: 50, color: "#2196F3" }} />,
    },
    {
      id: "lowstock",
      title: "LOW STOCK ALERTS",
      icon: <WarningIcon sx={{ fontSize: 50, color: "#FFC107" }} />,
    },
    {
      id: "batch",
      title: "BATCH & LOYALTY PROGRAM",
      icon: <CardGiftcardIcon sx={{ fontSize: 50, color: "#9C27B0" }} />,
    },
    {
      id: "warehouse",
      title: "MULTI-WAREHOUSE SYNC",
      icon: <CloudSyncIcon sx={{ fontSize: 50, color: "#00BCD4" }} />,
    },
  ];

  const edge = [
    {
      id: "bank",
      title: "CONNECT YOUR PAYABLE/ RECEIVABLE VIA BANK UPI",
      icon: <AccountBalanceIcon sx={{ fontSize: 60, color: "#3F51B5" }} />,
    },
  ];

  const spark = [
    {
      id: "invoices",
      title: "CONNECT YOUR INVOICES FOR DAILY SALE & PURCHASE",
      icon: <ReceiptIcon sx={{ fontSize: 60, color: "#E91E63" }} />,
    },
  ];

  return (
    <Box className="standard_fit_wrapper">
      <Box className="standard_fit_content">
        {/* Header */}
        <Box className="standard_fit_header">
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="../login"
          />
          <Box
              className={`utilities_card`}
            >
              {/* Card Image */}
              <Box 
                className="card_image_wrapper"
                component="img"
                src={standard_fit}
                alt={'STANDARD FIT'}
              />
              
              {/* Card Content */}
              <Box className="card_content">
                <Box className="card_header">
                  <Typography className="card_title">STANDARD FIT</Typography>
                </Box>
            </Box>
            </Box>
        </Box>


        {/* Main Content Grid */}
        <Box className="standard_fit_grid">
          {/* SERVICES Panel - Top Left */}
          <Box className="standard_fit_panel">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
            <Typography className="panel_title">SERVICES</Typography>
            <Box className="panel_items">
              {services.map((service) => (
                <Box key={service.id} className="panel_item">
                  <Box className="panel_item_icon">{service.icon}</Box>
                  <Typography className="panel_item_text">{service.title}</Typography>
                </Box>
              ))}
            </Box>
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>

          {/* ENHANCED Panel - Top Right */}
          <Box className="standard_fit_panel">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
            <Typography className="panel_title">ENHANCED</Typography>
            <Box className="panel_items">
              {enhanced.map((item) => (
                <Box key={item.id} className="panel_item">
                  <Box className="panel_item_icon">{item.icon}</Box>
                  <Typography className="panel_item_text">{item.title}</Typography>
                </Box>
              ))}
            </Box>
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>

          {/* EDGE Panel - Bottom Left */}
          <Box className="standard_fit_panel ">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
            <Typography className="panel_title">EDGE</Typography>
            <Box className="panel_items">
              {edge.map((item) => (
                <Box key={item.id} className="panel_item edge_item">
                  <Box className="panel_item_icon">{item.icon}</Box>
                  <Typography className="panel_item_text">{item.title}</Typography>
                </Box>
              ))}
            </Box>
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>

          {/* SPARK Panel - Bottom Right */}
          <Box className="standard_fit_panel ">
          <Box className="board_pins">
            <Box className="circle"></Box>
            <Box className="circle"></Box>
          </Box>
            <Typography className="panel_title">SPARK</Typography>
            <Box className="panel_items">
              {spark.map((item) => (
                <Box key={item.id} className="panel_item spark_item">
                  <Box className="panel_item_icon">{item.icon}</Box>
                  <Typography className="panel_item_text">{item.title}</Typography>
                </Box>
              ))}
            </Box>
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default StandardFit;
