import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Button2 from "../Button2";
import UserBadge from "../../../UserBadge";
import CloseIcon from '@mui/icons-material/Close';

export default function VisionPopup({ open, handleClose, handleBackClick }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens

  const listItems = [
    "E-banners is solution to local citizens about Shop daily needs at nominal rates and chain supply of products by minimum effort.",
    "Solution for Peak Time Traffic Management and Avoid Encroachment by providing E-shop to hawkers in E-mall.",
    "E-banners provide notification to citizens about events and daily eye catchers for avoiding banners on over heads of Roads.",
    "As A Member in e-mall you can register as a co-helper by which we are providing work on timely basis for every domain skilled workers.",
    "E-mall is providing Customized Solution for Every sector to Boost awareness and Sale of your product world wide.",
    "E-mall is providing City Clubbing, City Radio, City Podcast for Cultural development of society.",
    "Get rid off old and conventional method of E-commerce and make a new vision to help and reach people over local platform “Ambarsariya MALL”.",
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="vision-popup-dialog-paper"
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogContent className="visionPopupDialogBoxContent">
        <Box className="content">
          <Box className="content-body">
            <Box className="header">
              <Typography variant="h2">Vision</Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              {/* <UserBadge
                handleClose={handleClose}
                handleLogin="sell/login"
                handleLogoutClick="../../"
              /> */}
            </Box>
            <ul>
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {/* <Button2 text="Back" handleClose={handleClose} onClick={handleBackClick} /> */}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
