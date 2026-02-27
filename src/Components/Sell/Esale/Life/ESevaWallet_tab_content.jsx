import React from "react";
import { Box, Typography } from "@mui/material";

function ESevaWallet_tab_content() {
  const fields = [
    "Gross Sale",
    "Gross Purchase",
    "2% Commission (MCA) Sale",
    "Loan EMI Auto Debit",
    "2% Commission (MCA) Purchase",
    "Trade License Renewal Reserve",
    "Vendor Fees",
    "Sector health and safety fees",
    "Utilities Bill",
    "E-Mall Bill",
    "Add more",
    "Wallet Balance",
  ];

  return (
    <Box className="tab_content e_seva_wallet">
      <Typography className="title">E-Seva Wallet</Typography>
      <Box className="wallet_fields">
        {fields.map((label) => (
          <Box className="wallet_field_row" key={label}>
            <Typography className="wallet_label">{label}</Typography>
            <Typography className="wallet_value">0</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ESevaWallet_tab_content;

