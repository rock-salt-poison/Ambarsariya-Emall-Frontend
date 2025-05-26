import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";
import FitbitIcon from '@mui/icons-material/Fitbit';

function InvoicePopup({ open, onClose }) {
  const [audio] = useState(new Audio(hornSound));
  const themeProps = {
    popoverBackgroundColor: '#f8e3cc',
    scrollbarThumb: 'var(--brown)',
    dialogBackdropColor: 'var(--brown-4)'
  };
  const theme = createCustomTheme(themeProps);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Fullscreen on small screens

  console.log(open);
  
  return (
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={onClose}
          className="invoice-popup-dialog-paper"
          maxWidth="sm"
          fullScreen={fullScreen}
          fullWidth
        >
          <DialogContent className="invoiceDialogContent">
            <Box className="content">
              <Box className="content-body">
                <Box className="header">
                    <Box className="row">
                        <Box className="col-3">
                            <FitbitIcon className="logo"/>
                                <Typography variant="h3" className="shop_name">
                                  Finance Mart
                                </Typography>
                                <Typography className="text small">
                                  Domain : Daily Needs
                                </Typography>
                                <Typography className="text small">
                                  Sector : Financial Services
                                </Typography>
                        </Box>
                        <Box className="col-7">
                          <Box className="title_container">
                            <Typography variant="h2" className="title">Invoice</Typography>
                          </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className="shop_info">
                  <Box className="col">
                    <Typography className="text">123 Anywhere St., Any City, ST 12345</Typography>
                  </Box>

                   <Box className="col">
                    <Typography className="text">hello@reallygreatsite.com</Typography>
                  </Box>

                   <Box className="col">
                    <Typography className="text">123-456-9870</Typography>
                  </Box>
                </Box>

                
                
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
  );
}

export default InvoicePopup;
