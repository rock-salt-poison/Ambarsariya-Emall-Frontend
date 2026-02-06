import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import UserBadge from "../../UserBadge";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/connect_with_utilities_bg.webp";
import mask_1 from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/mask_1.png";
import mask_2 from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/mask_2.png";
import mask_3 from "../../Utils/images/Socialize/city_junctions/connect_with_utilities/mask.png";
import info from '../../Utils/images/Socialize/city_junctions/info.png'  


function UtilitiesMain() {
  const [audio] = useState(new Audio(hornSound));
  const [activeFit, setActiveFit] = useState("standard"); // Default to first card
  const navigate = useNavigate();

  const handleCardClick = (fitType, e) => {
    audio.play();
    setActiveFit(fitType);
    
    // Find the utilities_card parent element
    const cardElement = e.currentTarget.closest('.utilities_card');
    
    if (cardElement) {
      // Add reduceSize class
      cardElement.classList.add('reduceSize');
      
      // Remove reduceSize class after 1 second
      setTimeout(() => {
        cardElement.classList.remove('reduceSize');
      }, 600);
      
      // Navigate after 2 seconds
      setTimeout(() => {
        if (fitType === "standard") {
          navigate("../city-junctions/standard-fit");
        }
      }, 1000);
    }
  };

  const handleRadioClick = (fitType, e) => {
    e.stopPropagation();
    audio.play();
    setActiveFit(fitType);
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    audio.play();
    
    // Find the icon_container parent element
    const iconElement = e.currentTarget.closest('.icon_container');
    
    if (iconElement) {
      // Add reduceSize class
      iconElement.classList.add('reduceSize3');
      
      // Remove reduceSize class after 600ms
      setTimeout(() => {
        iconElement.classList.remove('reduceSize3');
      }, 600);
      
      // Navigate after 1000ms
      setTimeout(() => {
        navigate("../city-junctions/connect-with-utilities");
      }, 1000);
    }
  };

  const fitCards = [
    {
      id: "standard",
      title: "STANDARD FIT",
      img: mask_1 // Replace with actual card image when available
    },
    {
      id: "custom",
      title: "CUSTOM FIT",
      img: mask_2 // Replace with actual card image when available
    },
    {
      id: "taylor",
      title: "TAYLOR FIT",
      img: mask_3 // Replace with actual card image when available
    }
  ];

  return (
    <Box className="utilities_main_wrapper"> 

        <Box className="utilities_header">
          <Link className='icon_container' onClick={handleIconClick}>
            <Box component="img" src={info} alt="icon" className='icon'/>
          </Link>
          <UserBadge
            handleLogoutClick="../../"
            handleBadgeBgClick={-1}
            handleLogin="../login"
          />

        </Box>
      {/* Content Container */}
      <Box className="utilities_content">

        {/* Three Fit Cards */}
        <Box className="utilities_cards_container">
          {fitCards.map((card) => (
            <Box
              key={card.id}
              className={`utilities_card`}
              onClick={(e) => handleCardClick(card.id, e)}
            >
              {/* Card Image */}
              <Box 
                className="card_image_wrapper"
                component="img"
                src={card.img}
                alt={card.title}
              />
              
              {/* Card Content */}
              <Box className="card_content">
                <Box className="card_header">
                  <Typography className="card_title">{card.title}</Typography>
                </Box>
            </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UtilitiesMain;
