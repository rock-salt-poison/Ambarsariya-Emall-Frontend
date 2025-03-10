import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { get_product, getShopUserData } from "../../API/fetchExpressAPI";
import UserBadge from "../../UserBadge";

function ProductInfo2() {
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

  console.log(data);

  return (
    <Box className="product_details_wrapper info_2">
      {loading && <Box className="loading"><CircularProgress/></Box>}
      <Box className="row">
        <Box className="col">
        <Box className="heading">
            <Box></Box>
            <Box className="container">
              <Typography variant="h2">{data?.product_name}</Typography>
            </Box>
            <UserBadge
                handleBadgeBgClick={`../shop/${token}/products/${product_id}`}
                handleLogin="login"
                handleLogoutClick="../../AmbarsariyaMall"
              />
          </Box>
        </Box>
        <Box className="col">
          <Box className="details">
            <Typography className="text">
              <Typography variant="span" className="light">
                Type :{" "}
              </Typography>
              {data?.product_type}
            </Typography>
            <Typography className="text">
              {" "}
              <Typography variant="span" className="light">
                Specifications :{" "}
              </Typography>{" "}
              {data?.variation_1}, {data?.variation_2}, {data?.variation_3}, {data?.variation_4}
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          <Box className="detail">
            <Typography className="heading">
              Product Dimensions
            </Typography>
            <Typography className="text">
              {data?.product_dimensions_width_in_cm} x {data?.product_dimensions_height_in_cm} x {data?.product_dimensions_breadth_in_cm}
            </Typography>
            <Typography variant="span">
              (length x breadth x height)
            </Typography>
          </Box>
        </Box>
        {data?.product_dimensions_width_in_cm && data?.product_dimensions_height_in_cm && data?.product_dimensions_breadth_in_cm && <Box className="col">
          <Box className="detail">
            <Typography className="heading">
              Area Size Lateral
            </Typography>
            <Typography className="text">
              {2*(data?.product_dimensions_width_in_cm * data?.product_dimensions_breadth_in_cm + data?.product_dimensions_breadth_in_cm * data?.product_dimensions_height_in_cm + data?.product_dimensions_width_in_cm * data?.product_dimensions_height_in_cm)}
            </Typography>
            <Typography variant="span">
              2 x (lb x bh x lh)
            </Typography>
          </Box>
        </Box>}
        <Box className="col">
          <Box className="detail">
            <Typography className="heading">
              Total weight
            </Typography>
            <Typography className="text">
              {data?.product_weight_in_kg}
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          <Box className="detail">
            <Typography className="heading">
              Packing Style
            </Typography>
            <Typography className="text">
              {data?.product_style}
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          <Box className="detail">
            <Typography className="heading">
              Attributes / Features
            </Typography>
            <Typography className="text">
              {data?.features}
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          <Box className="detail">
            <Typography className="heading">
              Return Policy
            </Typography>
            <Typography className="text">
              {data?.return_policy}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfo2;
