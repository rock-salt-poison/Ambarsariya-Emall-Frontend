import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { convertDriveLink, get_product, getShopUserData } from "../../API/fetchExpressAPI";
import UserBadge from "../../UserBadge";
import Iframe from "react-iframe";

function BrandCatalog() {
  const { product_id, token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (token && product_id) {
        try {
          setLoading(true);
          const get_shop_no = (await getShopUserData(token))?.[0].shop_no;
          if (get_shop_no) {
            const get_product_details = (
              await get_product(get_shop_no, product_id)
            )?.data[0];
            if (get_product_details) {
              setData(get_product_details);
              setLoading(false);
            }
          }
        } catch (e) {
          setLoading(false);
          console.log(e);
        }
      }
    };
    fetchData();
  }, [token, product_id]);


  return (
    <Box className="product_details_wrapper info_2 brand_catalog">
      {loading && <Box className="loading"><CircularProgress/></Box>}
      <Box className="row">
        <Box className="col">
          <Box className="heading">
            <Box></Box>
            <Box></Box>
            <UserBadge
              handleBadgeBgClick={`../shop/${token}/products/${product_id}`}
              handleLogin="login"
              handleLogoutClick="../../AmbarsariyaMall"
            />
          </Box>
        </Box>
        <Box className="col">
          <Box className="details">
            <Typography className="heading">
              Brand Catalog
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          {data?.product_catalog && (
            <Box className="image_frame">
              <Box className="frame_border">
              <Iframe url={convertDriveLink(data?.brand_catalog)}
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            allowFullScreen
            styles={{height: "25px"}}/>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default BrandCatalog;
