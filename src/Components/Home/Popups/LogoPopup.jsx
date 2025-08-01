// src/components/LogoPopup.js
import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import homeBgImg from "../../../Utils/images/homeBgImg2.webp";
import rock_salt_poison_logo from "../../../Utils/images/rock_salt_poison_logo.webp";
import { Link } from "react-router-dom";
import hornSound from "../../../Utils/audio/horn-sound.mp3";
import WhoWeArePopup from "../Popups/WhoWeArePopup";
import VisionPopup from "../Popups/VisionPopup";
import AboutUsPopup from "../Popups/AboutUsPopup";
import UserBadge from "../../../UserBadge";
import ReturnRefundPolicyPopup from "./ReturnRefundPolicyPopup";
import CloseIcon from '@mui/icons-material/Close';


function LogoPopup({ open, handleClose }) {
  const [openPopup, setOpenPopup] = useState(open ? "logo" : null);
  const [audio] = useState(new Audio(hornSound));
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md")); // Fullscreen on small screens

  const obj = [
    {
      id: 1,
      navItem: "About us",
      handleClickFunction: (e) => handleClick(e, "aboutUs"),
    },
    {
      id: 2,
      navItem: "Who we are !",
      handleClickFunction: (e) => handleClick(e, "whoWeAre"),
    },
    {
      id: 3,
      navItem: "Vision",
      handleClickFunction: (e) => handleClick(e, "vision"),
    },
  ];

  const handleClick = (e, type) => {
    e.target.parentElement.classList.add("reduceSize3");
    setTimeout(() => {
      e.target.parentElement.classList.remove("reduceSize3");
    }, 300);
    audio.play();
    setTimeout(() => {
      setOpenPopup(type);
    }, 500);
  };

  const handleBackClick = () => {
    setTimeout(() => {
      setOpenPopup(null); // Close the current popup
      setOpenPopup("logo");
    }, 500);
  };

  return (
    <>
      {openPopup === "logo" && (
        <Dialog
          open={open}
          onClose={handleClose}
          className="logo-popup-dialog-paper"
          maxWidth="md"
          fullScreen={fullScreen}
          fullWidth
        >
          <DialogContent className="logoPopupDialogBoxContent">
            <Box className="content">
              <Box
                component="img"
                src={homeBgImg}
                alt="rock-salt-poison"
                className="bgImg"
              />
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                className="closeBtn"
              >
                <CloseIcon />
              </IconButton>
              <Box className="content-body">
                <Box className="col-1">
                  <Link to='' onClick={(e)=>{handleClick(e,'return_refund_policy')}}>
                    <Box
                      component="img"
                      src={rock_salt_poison_logo}
                      alt="rock-salt-poison"
                      className="logo"
                    />
                  </Link>
                  
                  {/* <UserBadge
                    handleClose={handleClose}
                    handleLogin="sell/login"
                    handleLogoutClick="../../"
                  /> */}
                </Box>
                <Box className="col-2">
                  {obj.map((item) => (
                    <Link key={item.id} onClick={item.handleClickFunction}>
                      <Typography className="navItem" variant="h2">
                        {item.navItem}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      {openPopup === "whoWeAre" && (
        <WhoWeArePopup open={true} handleClose={handleBackClick} />
      )}
      {openPopup === "aboutUs" && (
        <AboutUsPopup open={true} handleClose={handleBackClick} />
      )}
      {openPopup === "vision" && (
        <VisionPopup open={true} handleClose={handleBackClick} />
      )}
      {openPopup === "return_refund_policy" && (
        <ReturnRefundPolicyPopup open={true} handleClose={handleBackClick} />
      )}
    </>
  );
}

export default LogoPopup;
