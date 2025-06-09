import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UserBadge from "../../UserBadge";
import star from '../../Utils/images/Socialize/city_junctions/co_helpers/star.svg'

export default function CoHelperPopup({ open, handleClose, content }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens

  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="cohelper_popup"
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogContent className="cohelper_popup_content">
        <Box component="img" src={star} alt="star" className="star_img"/>
        <Box className="content">
          <Box className="content-body">
            <Box className="header">
              <Typography variant="h2">{content?.title}</Typography>
            </Box>

            <Typography className="heading">Scope : {" "}
              <Typography variant="span">{content?.scope}</Typography>
            </Typography>
            
            {/* <Button2 text="Back" handleClose={handleClose} onClick={handleBackClick} /> */}
          </Box>
        </Box>

        <Box component="img" src={star} alt="star" className="star_img bottom"/>
      </DialogContent>
    </Dialog>
  );
}
