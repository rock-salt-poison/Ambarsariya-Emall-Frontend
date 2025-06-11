import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { convertDriveLink, get_product, getShopUserData } from "../../API/fetchExpressAPI";
import UserBadge from "../../UserBadge";
import Iframe from "react-iframe";

function ProductCatalog() {
  const { product_id, token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);

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

  // Function to adjust iframe height dynamically
  const adjustIframeHeight = () => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
      } catch (error) {
        console.error("Cannot access iframe content due to CORS:", error);
      }
    }
  };

  return (
    <Box className="product_details_wrapper info_2 product_catalog">
      {loading && <Box className="loading"><CircularProgress/></Box>}
      <Box className="row">
        <Box className="col">
          <Box className="heading">
            <Box></Box>
            <Box></Box>
            <UserBadge
              handleBadgeBgClick={`../shop/${token}/products/${product_id}`}
              handleLogin="login"
              handleLogoutClick="../../"
            />
          </Box>
        </Box>
        <Box className="col">
          <Box className="details">
            <Typography className="heading">
              Product Catalog
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          {data?.product_catalog && (
            <Box className="image_frame">
              <Box className="frame_border">
              <Iframe url={convertDriveLink(data?.product_catalog)}
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "25px"}}/>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCatalog;
