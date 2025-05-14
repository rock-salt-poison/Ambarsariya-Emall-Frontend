import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { convertDriveLink, get_product, get_product_variants, getShopUserData } from "../../API/fetchExpressAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import plane_img from '../../Utils/images/Sell/products/plane.webp';
import ticket from '../../Utils/images/Sell/products/ticket_design.webp';
import UserBadge from "../../UserBadge";

function ProductInfo() {
  const { product_id, token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !product_id) return;

      try {
        setLoading(true);

        // Fetch product variants
        const resp = await get_product_variants(product_id);
        console.log(resp.data);
        
        
        if (resp?.valid && Array.isArray(resp.data)) {
          setData(resp.data);
          setSelectedVariant(0); // Default selection
        }
      } catch (e) {
        console.error("Error fetching product data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, product_id]);

  const handleVariantChange = (event) => {
    const selectedIndex = data.findIndex(
      (variant) => variant.item_id === event.target.value
    );
    if (selectedIndex !== -1) {
      setSelectedVariant(selectedIndex); // Store only the index
    }
  };
 
  

  return (
    <Box className="product_details_wrapper">
      {loading && <Box className="loading"><CircularProgress/></Box>}

      <Box className="row">
        <Box className="col">
          <Box className="heading">
            <Box></Box>
            <Box className="container">
              <Typography variant="h2">{data?.[0]?.product_name}</Typography>
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
              <Typography variant="span" className="light">Type : </Typography>
              {data?.[0].product_type}
            </Typography>
            <Typography className="text">
              <Typography variant="span" className="light">Description : </Typography>
              {data?.[0].product_description}
            </Typography>
          </Box>
        </Box>

        <Box className="col">
          <Box className="details2">
            <Typography className="text">
              <Typography variant="span" className="light">Brand : </Typography>
              {data?.[0].brand}
            </Typography>
            <Typography className="text">
              <Typography variant="span" className="light">Style : </Typography>
              {data?.[0].product_style}
            </Typography>
          </Box>
        </Box>

        {/* Variant Selection */}
        <Box className="col">
          {data?.length > 0 && (
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={data?.[selectedVariant]?.item_id || ""}
                onChange={handleVariantChange}
              >
                {data?.map((variant, index) => (
                  <FormControlLabel
                    key={variant.item_id}
                    value={variant.item_id}
                    control={<Radio />}
                    label={`Variant ${index + 1}`}
                    className="variation"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </Box>

        {/* Product Images */}
        <Box className="col">
          <Box className="image_container">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              zoom={true}
              modules={[Zoom]}
              className="mySwiper"
            >
              
                <SwiperSlide  className="card">
                  <Box className="images swiper-zoom-container">
                    <Box component="img" src={
                      data?.[selectedVariant]?.product_images?.length > 0
                      && convertDriveLink(
                          data?.[selectedVariant]?.product_images?.[
                            data?.[selectedVariant]?.product_images?.[selectedVariant] // Check for valid image based on variant
                              ? selectedVariant
                              : 0
                          ]
                        )
                    } />
                  </Box>
                </SwiperSlide>
            </Swiper>
            <Typography className="text">
              <Typography variant="span" className="light">Price : </Typography>
              {data?.[selectedVariant]?.selling_price} {data?.[selectedVariant]?.unit}
              </Typography>
          </Box>
        </Box>

        <Box className="col plane_col">
          <Box className="image_container_2">
            <Box component="img" src={plane_img} className="plane" />
          </Box>
        </Box>

        <Box className="col ticket_container">
          <Link className="image_container_3" to={data?.promotion_information} target="_blank">
            <Box component="img" src={ticket} className="ticket" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfo;
