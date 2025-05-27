import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import hornSound from "../../Utils/audio/horn-sound.mp3";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";
import FitbitIcon from "@mui/icons-material/Fitbit";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function InvoicePopup({ open, onClose }) {
  const [audio] = useState(new Audio(hornSound));
  const themeProps = {
    popoverBackgroundColor: "#f8e3cc",
    scrollbarThumb: "var(--invoice-dark)",
    dialogBackdropColor: "var(--brown-4)",
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
                    <FitbitIcon className="logo" />
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
                      <Typography variant="h2" className="title">
                        Invoice
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="shop_info">
                <Box className="col">
                  <Typography className="text">
                    123 Anywhere St., Any City, ST 12345
                  </Typography>
                </Box>

                <Box className="col">
                  <Typography className="text">
                    hello@reallygreatsite.com
                  </Typography>
                </Box>

                <Box className="col">
                  <Typography className="text">123-456-9870</Typography>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="heading border-bottom">
                      <Typography className="text">Billed From:</Typography>
                    </Box>
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Seller's Name:
                        </Typography>
                        <Typography className="text">Muskan singh</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">Email ID:</Typography>
                        <Typography className="text">
                          ms312093@gmail.com
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">Address:</Typography>
                        <Typography className="text">
                          123 Anywhere city, 123467
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Phone No.:
                        </Typography>
                        <Typography className="text">
                          7888610079, 9876543210
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">PAN ID:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">GST No.:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">MSME No.:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">CIN No.:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="heading border-bottom">
                      <Typography className="text">Invoice No.:</Typography>
                    </Box>

                    <Box className="body border-bottom">
                      <Box className="col-group">
                        <Typography className="text">9876543210</Typography>
                      </Box>
                    </Box>

                    <Box className="heading border-bottom">
                      <Typography className="text">Invoice Date:</Typography>
                    </Box>

                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text">May 27, 2025</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="heading border-bottom">
                      <Typography className="text">Billed To:</Typography>
                    </Box>
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Buyer's Name
                        </Typography>
                        <Typography className="text">Muskan singh</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">Email ID</Typography>
                        <Typography className="text">
                          ms312093@gmail.com
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">Address</Typography>
                        <Typography className="text">
                          123 Anywhere city, 123467
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Phone No.:
                        </Typography>
                        <Typography className="text">7888610078</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">PAN ID:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">GST No.:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">MSME No.:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">CIN No.:</Typography>
                        <Typography className="text">-</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="heading border-bottom">
                      <Typography className="text">Invoice No.:</Typography>
                    </Box>

                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text">9876543210</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Purchase Order No.:
                        </Typography>
                        <Typography className="text">PO_1234567</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="body">
                      <Box className="col-group vertical">
                        <Typography className="text">Date/Time :</Typography>
                        <Typography className="text">
                          26 May 2025, 7:14 PM
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="row">
                  <Box className="col-7 border-right">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Sale Order No.:
                        </Typography>
                        <Typography className="text">SO_1234567</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="body">
                      <Box className="col-group vertical">
                        <Typography className="text">Date/Time :</Typography>
                        <Typography className="text">
                          26 May 2025, 7:14 PM
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Table>
                    <TableHead>
                      <TableRow className="bgColor">
                        <TableCell className="text">
                          Product Name / Category / Brand / Variation
                        </TableCell>
                        <TableCell className="text">Unit price</TableCell>
                        <TableCell className="text">Quantity</TableCell>
                        <TableCell className="text">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text">
                          Vehicle service plan
                        </TableCell>
                        <TableCell className="text">7084/-</TableCell>
                        <TableCell className="text">2</TableCell>
                        <TableCell className="text"><CurrencyRupeeIcon/> 14168/-</TableCell>
                      </TableRow>
                      <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Subtotal
                        </TableCell>
                        <TableCell className="text"><CurrencyRupeeIcon/> 14168/-</TableCell>
                      </TableRow>

                      <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Tax Rate (%)
                        </TableCell>
                        <TableCell className="text">18% = <CurrencyRupeeIcon/> 5925</TableCell>
                      </TableRow>

                      <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Discount Coupon Applied
                        </TableCell>
                        <TableCell className="text">15% = <CurrencyRupeeIcon/> 888.75</TableCell>
                      </TableRow>

                      <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Coupon Charges 
                        </TableCell>
                        <TableCell className="text">30</TableCell>
                      </TableRow>

                      <TableRow className="bgColor">
                        <TableCell colSpan={3} className="text right">
                          Total
                        </TableCell>
                        <TableCell className="text">
                          <Typography className="text"><CurrencyRupeeIcon/> 5036.5</Typography>
                          </TableCell>
                      </TableRow>

                      <TableRow className="bgColor">
                        
                        <TableCell colSpan={2}>
                          <Box className="col-group vertical">
                            <Typography className="text">Co-Helper</Typography>
                            <Typography className="text">N.A</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className="col-group vertical">
                            <Typography className="text">
                              Credit Balance
                            </Typography>
                            <Typography className="text">N.A</Typography>
                          </Box>
                        </TableCell>
                        {/* <TableCell>
                          <Box className="col-group vertical">
                            <Typography className="text">
                              Home Delivery Charges
                            </Typography>
                            <Typography className="text">N.A</Typography>
                          </Box>
                        </TableCell> */}
                        <TableCell>
                          <Box className="col-group vertical">
                            <Typography className="text">
                              Subscription Type
                            </Typography>
                            <Typography className="text">N.A</Typography>
                          </Box>
                        </TableCell>{" "}
                      </TableRow>

                      <TableRow className="bgColor">
                        <TableCell className="text">
                            CGST : 9%
                        </TableCell>

                        <TableCell className="text">
                            Cost : 450
                        </TableCell>

                        <TableCell className="text">
                            SGST : 9%
                        </TableCell>

                        <TableCell className="text">
                            Cost : 450
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-2 heading border-right">
                    <Box className="col-group">
                      <Typography className="text">
                        Payment Information for Buyer:
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="col-7">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Payment Due Date:
                        </Typography>
                        <Typography className="text">29 May 2025</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Credit Balance:
                        </Typography>
                        <Typography className="text">200</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Subscription type:
                        </Typography>
                        <Typography className="text">-</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">MoU:</Typography>
                        <Typography className="text">
                          Expiry Date: 21 Dec 2025
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Seller's Bank Name:
                        </Typography>
                        <Typography className="text">
                          Whelton Financial Services
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account Name:
                        </Typography>
                        <Typography className="text">
                          Lairssa Charter
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account No.:
                        </Typography>
                        <Typography className="text">9876587987</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">UPI:</Typography>
                        <Typography className="text">
                          8928282992@payts
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="details">
                <Box className="row">
                  <Box className="col-2 heading border-right">
                    <Box className="col-group">
                      <Typography className="text">
                        Payment Information for Seller:
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="col-7">
                    <Box className="body">
                      <Box className="col-group">
                        <Typography className="text bold">
                          Payment Date/Time:
                        </Typography>
                        <Typography className="text">29 May 2025</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Reference No.:
                        </Typography>
                        <Typography className="text">
                          1-2024/10/5uj74
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Payment Type:
                        </Typography>
                        <Typography className="text">UPI Transfer</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">PoS:</Typography>
                        <Typography className="text">QR Code</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Buyer's Bank Name:
                        </Typography>
                        <Typography className="text">
                          Whelton Financial Services
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account Name:
                        </Typography>
                        <Typography className="text">
                          Lairssa Charter
                        </Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">
                          Account No.:
                        </Typography>
                        <Typography className="text">9876587987</Typography>
                      </Box>

                      <Box className="col-group">
                        <Typography className="text bold">UPI:</Typography>
                        <Typography className="text">
                          8928282992@payts
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
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
