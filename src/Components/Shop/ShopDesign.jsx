import React from 'react'
import shop from '../../Utils/images/Sell/shop_details/shop.svg';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ShopDesign() {
  return (
    <Link className="shop_container" to={`../id/products`}>
      <Box component="img" src={shop} className="shop" alt="shop" />
      <Typography className="shop_name" variant="h2" data-content="Apna Departmental Store">Apna Departmental Store </Typography>

      <Box className="domain_container">
        <Link to='dashboard'><Typography className="domain" variant="h3">Retailer</Typography></Link>
      </Box>
      <Box className="sector_container">
        <Typography className="sector" variant="h3">General Store</Typography>
      </Box>
      <Typography className="shop_no" variant="h3">Shop No. 0125</Typography>
    </Link>
  )
}

export default ShopDesign