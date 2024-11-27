import React from "react";
import shop from "../../Utils/images/Sell/shop_details/shop.svg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ShopDesign({ data }) {

  return (
    <Link className="shop_container" to={`../id/products`}>
      <Box component="img" src={shop} className="shop" alt="shop" />
      <Box className="shop_name_container">
        <Typography
          className="shop_name"
          variant="h2"
          data-content={data.business_name}
        >
          {data.business_name}
        </Typography>
      </Box>

      <Box className="domain_container">
        <Link to="dashboard">
          <Typography className="domain" variant="h3">
            {data.domain_name}
          </Typography>
        </Link>
      </Box>
      <Box className="sector_container">
        <Typography className="sector" variant="h3">
          {data.sector_name}
        </Typography>
      </Box>
      <Typography className="shop_no" variant="h3">
        Shop No. {data && data.shop_no ? (data.shop_no).split('_')[1] : null}
      </Typography>
    </Link>
  );
}

export default ShopDesign;
