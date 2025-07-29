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
import NotificationsIcon from '@mui/icons-material/Notifications';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CloseIcon from '@mui/icons-material/Close';

export default function ReturnRefundPolicyPopup({ open, handleClose, handleBackClick }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="refund-return-policy-paper"
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
    >
      <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                      className="closeBtn"
                    >
                      <CloseIcon />
                    </IconButton>
            <Box className="notification_container">
              <Box className="notification_icon">
                  <NotificationsIcon className="icon"/>
              </Box>
              <Box className="alert_number">
                <PriorityHighIcon className="icon"/>
              </Box>
            </Box>
      <DialogContent className="refundReturnPopupDialogBoxContent">
        <Box className="content">
          <Box className="content-body">
            <Box className="header">
              <Typography variant="h2">Return & Refund Policy</Typography>
            </Box>
              <Box className="descriptionContainer">
                <Typography className="description">
                  Shopkeepers will set their individual return and refund policies within E-Mall.
                  All returns and refunds must be initiated within 24 hours of delivery.
                </Typography>

                <Typography className="description bold">
                  Logistics Services
                </Typography>

                <Typography className="description">
                  Purchasers will select their preferred logistics service from the options offered by the shopkeeper and displayed by E-Mall.
                  Same-day delivery is the target, with any delays to be communicated promptly.
                  Any mishandling by logistics should be reported before opening the package or before accepted.
                  The Invoice cancellation request will be initiated, and some of the Logistics tax amount will be deducted as return and refund charges.
                </Typography>
              </Box>
            {/* <Button2 text="Back" handleClose={handleClose} onClick={handleBackClick} /> */}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
