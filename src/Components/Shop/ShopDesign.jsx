import React, { useEffect, useState } from "react";
import shop from "../../Utils/images/Sell/shop_details/shop.svg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../API/fetchExpressAPI";

function ShopDesign({ data }) {

  const openPdf = (e) => {
    if(e) e.preventDefault();
    window.open(data?.usp_values_url, '_target');
  }

  const token = useSelector((state) => state.auth.userAccessToken);
  const [openDashboard, setOpenDashboard] = useState(false);

  useEffect(()=> {
    if(token){
      fetch_user(token);
    }
  },[token]);

  const fetch_user = async (token) => {
    const res = await getUser(token);
    if(data.shop_access_token === res[0].shop_access_token){
      setOpenDashboard(true);
    }else {
      setOpenDashboard(false);
    }
  }
  
  

  return (
    <Link className="shop_container" to={`../shop/${data.shop_access_token}/products`}>
      <Box component="img" src={shop} className="shop" alt="shop" />
      <Box className="shop_name_container" onClick={(e)=>openPdf(e)}>
        <Typography
          className="shop_name"
          variant="h2"
          data-content={data.business_name}
        >
          {data.business_name}
        </Typography>
      </Box>

      <Box className="domain_container">
        <Link to={openDashboard ? `../support/shop/${data.shop_access_token}/dashboard`: `../shop/${data.shop_access_token}/products`}>
          <Typography className="domain" variant="h3">
           {openDashboard ? `Dashboard : ${data.domain_name}`: data.domain_name}
          </Typography>
        </Link>
      </Box>
      <Box className="sector_container">
        <Typography className="sector" variant="h3">
          {data.sector_name}
        </Typography>
      </Box>
      <Link to={openDashboard ? '../../serve': `../shop/${data.shop_access_token}/products`}>
        <Typography className="shop_no" variant="h3">
          Shop No. {data && data.shop_no ? (data.shop_no).split('_')[1] : null}
        </Typography>
      </Link>
    </Link>
  );
}

export default ShopDesign;
