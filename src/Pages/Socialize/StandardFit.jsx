import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import { Link, useNavigate } from "react-router-dom";
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
import CardBoardPopup from "../../Components/CardBoardPopupComponents/CardBoardPopup";
import ServiceType from "../../Components/Cart/ServiceType/ServiceType";
import Delivery from "../../Components/Cart/ServiceType/Delivery";
import Visit from "../../Components/Cart/ServiceType/Visit";
import TakeAway from "../../Components/Cart/ServiceType/TakeAway";
import Pickup from "../../Components/Cart/ServiceType/Pickup";
import { getUser } from "../../API/fetchExpressAPI";
import { useSelector } from "react-redux";


function StandardFit() {
  const [audio] = useState(new Audio(hornSound));
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userAccessToken);
  const [hasShopAccessToken, setHasShopAccessToken] = useState(false);
  const [shopNo, setShopNo] = useState(null);
  const [openServicePopup, setOpenServicePopup] = useState(null);

  useEffect(() => {
    const checkShopAccessToken = async () => {
      if (token) {
        try {
          const res = await getUser(token);
          const shopUser = res?.find((u) => u.shop_no !== null);
          if (shopUser?.shop_no) {
            setHasShopAccessToken(true);
            setShopNo(shopUser.shop_no);
          } else {
            setHasShopAccessToken(false);
            setShopNo(null);
          }
        } catch (error) {
          console.error("Error checking shop access token:", error);
          setHasShopAccessToken(false);
          setShopNo(null);
        }
      } else {
        setHasShopAccessToken(false);
        setShopNo(null);
      }
    };
    checkShopAccessToken();
  }, [token]);

  const handleBackClick = () => {
    audio.play();
    setTimeout(() => {
      navigate("../city-junctions/utilities-main");
    }, 300);
  };

  const handleMunicipalCorporationClick = (e) => {
    e.preventDefault();
    audio.play();
    setTimeout(() => {
      navigate("/socialize/city-junctions/municipal-corporation");
    }, 300);
  };

  const handleServiceClick = (e, serviceId) => {
    if (hasShopAccessToken) {
      e.preventDefault();
      setOpenServicePopup((prev) => (prev === serviceId ? null : serviceId));
    }
  };

  const services = [
    {
      id: "pickup",
      title: "PICKUP",
      icon: pickup,
      popupContent: <Pickup title="Pickup" fieldSet="standardFit" shop_no={shopNo} />,
      cName: "service_type_popup pickup",
    },
    {
      id: "takeaway",
      title: "TAKE-AWAY",
      icon: takeaway,
      popupContent: <TakeAway title="Take Away" fieldSet="standardFit" shop_no={shopNo} />,
      cName: "service_type_popup pickup",
    },
    {
      id: "homevisit",
      title: "HOME VISIT",
      icon: visit,
      popupContent: <Visit />,
      cName: "service_type_popup delivery visit",
    },
    {
      id: "delivery",
      title: "DELIVERY",
      icon: delivery,
      popupContent: <Delivery />,
      cName: "service_type_popup delivery",
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
      title: "Municipal Corporation Services",
      icon: multiwarehouse_sync,
      onClick: handleMunicipalCorporationClick,
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
          <Box></Box>
         
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
            <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="../login"
          />
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
                <Link 
                  key={service.id} 
                  className="panel_item"
                  onClick={(e) => handleServiceClick(e, service.id)}
                >
                  <Box className="panel_item_icon" component="img" src={service.icon} />
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
              <Link
                key={item.id}
                className="panel_item"
                onClick={item.onClick}
              >
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
      <CardBoardPopup
        customPopup={true}
        open={openServicePopup !== null}
        handleClose={() => setOpenServicePopup(null)}
        body_content={services.find(s => s.id === openServicePopup)?.popupContent}
        optionalCName={services.find(s => s.id === openServicePopup)?.cName}
      />
    </Box>
  );
}

export default StandardFit;
