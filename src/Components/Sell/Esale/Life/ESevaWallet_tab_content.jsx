import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Add, Remove } from '@mui/icons-material';
import Switch_On_Off2 from "../../../Form/Switch_On_Off2";

function ESevaWallet_tab_content() {
  const [showUtilities, setShowUtilities] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [autoDebit, setAutoDebit] = useState(false);

  const mainFields = [
    "Gross Sale B2B / B2C",
    "Gross Purchase B2B",
    "2% Commission (MCA) Sale",
    "Loan EMI Auto Debit",
    "2% Commission (MCA) Purchase",
    "Trade License Renewal Reserve",
    "Vendor Fees",
    "Sector health and safety fees",
  ];

  const utilitiesFields = [
    "Water Bill",
    "Sewerage Bill",
    "Property tax",
    "Smart Waste Management",
  ];

  const servicesFields = [
    "Banners",
    "Campaign",
    "Sales Mount",
    "Shop Management",
  ];

  // Placeholder amounts for now (can be replaced with real data later)
  const utilitiesAmounts = utilitiesFields.map(() => 0);
  const servicesAmounts = servicesFields.map(() => 0);

  const utilitiesTotal = utilitiesAmounts.reduce((sum, val) => sum + val, 0);
  const servicesTotal = servicesAmounts.reduce((sum, val) => sum + val, 0);

  return (
    <Box className="tab_content e_seva_wallet">
      <Typography className="title">E-Seva Wallet</Typography>
      <Box className="wallet_fields">
        {/* Auto Debit with Switch */}
        <Box className="wallet_field_row">
          <Typography className="wallet_label">Auto Debit</Typography>
          <Box className="wallet_value">
            <Switch_On_Off2
              checked={autoDebit}
              onChange={(e) => setAutoDebit(e.target.checked)}
            />
            {/* <Typography>{autoDebit ? 'On' : 'Off'}</Typography> */}
          </Box>
        </Box>

        {mainFields.map((label) => (
          <Box className="wallet_field_row" key={label}>
            <Typography className="wallet_label">{label}</Typography>
            <Typography className="wallet_value">0</Typography>
          </Box>
        ))}

        {/* Add Utilities (expandable) */}
        <Box
          className="wallet_field_row"
          onClick={() => setShowUtilities((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <Typography className="wallet_label">
            {showUtilities ? (<> Add Utilities <Remove sx={{verticalAlign:'middle'}}/></>) : (<> Add Utilities <Add sx={{verticalAlign:'middle'}}/></>)}
          </Typography>
          <Typography className="wallet_value">{utilitiesTotal}</Typography>
        </Box>
        {showUtilities && (
          <Box className="wallet_subfields">
            {utilitiesFields.map((label) => (
              <Box className="wallet_field_row" key={label}>
                <Typography className="wallet_label">{label}</Typography>
                <Typography className="wallet_value">0</Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* E-Mall Bill */}
        <Box className="wallet_field_row">
          <Typography className="wallet_label">E-Mall Bill</Typography>
          <Typography className="wallet_value">0</Typography>
        </Box>

        {/* Add services (expandable) */}
        <Box
          className="wallet_field_row"
          onClick={() => setShowServices((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <Typography className="wallet_label">
            {showServices ? (<> Add services <Remove sx={{verticalAlign:'middle'}}/></>) : <> Add services <Add sx={{verticalAlign:'middle'}}/></>}
          </Typography>
          <Typography className="wallet_value">{servicesTotal}</Typography>
        </Box>
        {showServices && (
          <Box className="wallet_subfields">
            {servicesFields.map((label) => (
              <Box className="wallet_field_row" key={label}>
                <Typography className="wallet_label">{label}</Typography>
                <Typography className="wallet_value">0</Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Wallet Balance */}
        <Box className="wallet_field_row">
          <Typography className="wallet_label">Wallet Balance</Typography>
          <Typography className="wallet_value">0</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ESevaWallet_tab_content;

