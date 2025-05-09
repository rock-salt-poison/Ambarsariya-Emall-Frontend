import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Button2 from "../Button2";
import photoframe from "../../../Utils/images/photoframe.png";
import harsh_kumar from "../../../Utils/images/harsh-kumar.webp";
import pardeep_kumar from "../../../Utils/images/pardeep-kumar.webp";
import ashwani_kumar from "../../../Utils/images/ashwani-kumar.webp";
import UserBadge from "../../../UserBadge";

export default function WhoWeArePopup({ open, handleClose, handleBackClick }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens

  const listItems = [
    {
      name: "Mr. Ashwani Kumar",
      profile: "System Analyst",
      imgSrc: ashwani_kumar,
    },
    {
      name: "Mr. Pardeep Kumar",
      profile: "Scientific Approach",
      imgSrc: pardeep_kumar,
    },
    {
      name: "Mr. Harsh Kumar",
      profile: "Financial Constraints",
      imgSrc: harsh_kumar,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="whoweare-popup-dialog-paper"
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogContent className="whowearePopupDialogBoxContent">
        <Box className="content">
          <Box className="content-body">
            <Box className="header">
              <Typography variant="h2">Who we are !</Typography>
              {/* <UserBadge
                handleClose={handleClose}
                handleLogin="sell/login"
                handleLogoutClick="../../AmbarsariyaMall"
              /> */}
            </Box>
            <Typography className="description">
              With the team of Devotees, towards Science & Environmental
              Solutions for better world. We have solution for every problem
              stated by experienced people & environmentalists.
            </Typography>
            <Box className="row">
              {listItems.map((user, index) => {
                return (
                  <Box className="col" key={index}>
                    <Box className="frame_container">
                      <Box
                        component="img"
                        src={user.imgSrc}
                        className="user_img"
                        alt={user.name}
                      />
                      {/* <Box component="img" src={user.imgSrc} className="user_img" alt={user.name} /> */}
                    </Box>
                    <Typography variant="h3">{user.profile}</Typography>
                    <Typography variant="h4">{user.name}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
