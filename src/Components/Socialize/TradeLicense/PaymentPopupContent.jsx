import React from "react";
import { Box, Typography, Button } from "@mui/material";

function PaymentPopupContent() {
  return (
    <Box className="payment_popup_content">
      <Box className="payment_section">
        <Typography className="section_title">Trade License</Typography>
        <Box className="fee_item">
          <Typography className="fee_label">Trade License : Class C</Typography>
          <Typography className="fee_value">1500</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Vendor License : Class C Fees</Typography>
          <Typography className="fee_value">1500</Typography>
        </Box>
        <Box className="fee_item total">
          <Typography className="fee_label">Total Fees</Typography>
          <Typography className="fee_value">3000</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Late Fees</Typography>
          <Typography className="fee_value">50/day</Typography>
        </Box>
      </Box>

      <Box className="payment_section">
        <Typography className="section_title">Certification Compliance</Typography>
        <Box className="fee_item">
          <Typography className="fee_label">Health & Safety Compliance</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Renewal</Typography>
          <Typography className="fee_value">250/6M</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Pollution Control Renewal</Typography>
          <Typography className="fee_value">200/6M</Typography>
        </Box>
        <Box className="fee_item total">
          <Typography className="fee_label">Total Fees</Typography>
          <Typography className="fee_value">450</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Late Fees</Typography>
          <Typography className="fee_value">50/day</Typography>
        </Box>
      </Box>

      <Box className="payment_section">
        <Typography className="section_title">Commission & Fees</Typography>
        <Box className="fee_item">
          <Typography className="fee_label">Commission Fees</Typography>
          <Typography className="fee_value">1500</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Trade Fees</Typography>
          <Typography className="fee_value">1500</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Vendor Fees</Typography>
          <Typography className="fee_value">1500</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">Late Fees</Typography>
          <Typography className="fee_value">50/day</Typography>
        </Box>
        <Box className="fee_item">
          <Typography className="fee_label">No Days Pending</Typography>
          <Typography className="fee_value">0</Typography>
        </Box>
        <Box className="fee_item total">
          <Typography className="fee_label">Total</Typography>
          <Typography className="fee_value">45000</Typography>
        </Box>
      </Box>

      <Box className="payment_summary">
        <Box className="summary_item">
          <Typography className="summary_label">Available Balance</Typography>
          <Typography className="summary_value">5000</Typography>
        </Box>
        <Box className="summary_item">
          <Typography className="summary_label">Pay</Typography>
          <Typography className="summary_value">45000</Typography>
        </Box>
        <Box className="summary_item total">
          <Typography className="summary_label">Balance</Typography>
          <Typography className="summary_value">500</Typography>
        </Box>
      </Box>

      <Box className="payment_actions">
        <Button className="submit_button" variant="contained">
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentPopupContent;
