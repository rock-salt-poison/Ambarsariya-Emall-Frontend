import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import { Link, useNavigate } from "react-router-dom";
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
import spark_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/spark_icon.svg";
import edge_icon from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/edge_icon.svg";
import low_stock from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/low_stock.svg";
import real_time_stock from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/real_time_stock.svg";
import loyalty_program from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/loyalty_program.svg";
import multiwarehouse_sync from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/multiwarehouse_sync.svg";
import pickup from "../../Utils/images/Sell/shop_details/pickup.svg";
import delivery from "../../Utils/images/Sell/shop_details/delivery.webp";
import visit from "../../Utils/images/Sell/shop_details/home_visit.webp";
import takeaway from "../../Utils/images/Sell/shop_details/takeaway.webp";


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
      icon: pickup,
    },
    {
      id: "takeaway",
      title: "TAKE-AWAY",
      icon: takeaway,
    },
    {
      id: "homevisit",
      title: "HOME VISIT",
      icon: visit,
    },
    {
      id: "delivery",
      title: "DELIVERY",
      icon: delivery,
    },
  ];

  const enhanced = [
    {
      id: "realtime",
      title: "REAL TIME STOCK STATUS",
      icon: real_time_stock,
    },
    {
      id: "lowstock",
      title: "LOW STOCK ALERTS",
      icon:low_stock,
    },
    {
      id: "batch",
      title: "BATCH & LOYALTY PROGRAM",
      icon: loyalty_program,
    },
    {
      id: "warehouse",
      title: "MULTI-WAREHOUSE SYNC",
      icon: multiwarehouse_sync,
    },
  ];

  const edge = [
    {
      id: "bank",
      title: "CONNECT YOUR PAYABLE/ RECEIVABLE VIA BANK UPI",
      icon: edge_icon,
    },
  ];

  const spark = [
    {
      id: "invoices",
      title: "CONNECT YOUR INVOICES FOR DAILY SALE & PURCHASE",
      icon: spark_icon,
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
                <Link key={service.id} className="panel_item">
                  <Box className="panel_item_icon" component="img" src={service.icon}/>
                  <Typography className="panel_item_text">{service.title}</Typography>
                </Link>
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
                <Link key={item.id} className="panel_item">
                  <Box className="panel_item_icon" component="img" src={item.icon}/>
                  <Typography className="panel_item_text">{item.title}</Typography>
                </Link>
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
                <Link key={item.id} className="panel_item edge_item">
                  <Box className="panel_item_icon" component="img" src={item.icon}/>
                  <Typography className="panel_item_text">{item.title}</Typography>
                </Link>
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
                <Link key={item.id} className="panel_item spark_item">
                  <Box className="panel_item_icon" component="img" src={item.icon}/>
                  <Typography className="panel_item_text">{item.title}</Typography>
                </Link>
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
