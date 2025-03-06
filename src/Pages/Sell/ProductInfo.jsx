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
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !product_id) return;

      try {
        setLoading(true);
        const shopData = await getShopUserData(token);
        const get_shop_no = shopData?.[0]?.shop_no;

        if (!get_shop_no) return;

        const productResponse = await get_product(get_shop_no, product_id);
        const get_product_details = productResponse?.data?.[0];

        if (!get_product_details) return;

        setData(get_product_details);

        // Fetch product variants
        const resp = await get_product_variants(get_product_details.shop_no, get_product_details.variant_group);

        if (resp?.valid && Array.isArray(resp.data)) {
          setVariants(resp.data);
          setSelectedVariant(resp.data[0]); // Default selection
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
    const selected = variants.find(variant => variant.product_id === event.target.value);
    setSelectedVariant(selected);
  };

  return (
    <Box className="product_details_wrapper">
      {loading && <Box className="loading"><CircularProgress/></Box>}

      <Box className="row">
        <Box className="col">
          <Box className="heading">
            <Box></Box>
            <Box className="container">
              <Typography variant="h2">{selectedVariant?.product_name || data?.product_name}</Typography>
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
              {selectedVariant?.product_type || data?.product_type}
            </Typography>
            <Typography className="text">
              <Typography variant="span" className="light">Description : </Typography>
              {selectedVariant?.product_description || data?.product_description}
            </Typography>
          </Box>
        </Box>

        <Box className="col">
          <Box className="details2">
            <Typography className="text">
              <Typography variant="span" className="light">Brand : </Typography>
              {selectedVariant?.brand || data?.brand}
            </Typography>
            <Typography className="text">
              <Typography variant="span" className="light">Style : </Typography>
              {selectedVariant?.product_style || data?.product_style}
            </Typography>
          </Box>
        </Box>

        {/* Variant Selection */}
        <Box className="col">
          {variants.length > 0 && (
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={selectedVariant?.product_id || ""}
                onChange={handleVariantChange}
              >
                {variants.map((variant, index) => (
                  <FormControlLabel
                    key={variant.product_id}
                    value={variant.product_id}
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
              {(selectedVariant?.product_images)?.map((product_image, index) => (
                <SwiperSlide key={index} className="card">
                  <Box className="images swiper-zoom-container">
                    <Box component="img" src={convertDriveLink(product_image)} />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Typography className="text">
              <Typography variant="span" className="light">Price : </Typography>
              {selectedVariant?.price || data?.price} {selectedVariant?.unit || data?.unit}
            </Typography>
          </Box>
        </Box>

        <Box className="col">
          <Box className="image_container_2">
            <Box component="img" src={plane_img} className="plane" />
          </Box>
        </Box>

        <Box className="col ticket_container">
          <Link className="image_container_3" to={selectedVariant?.promotion_information || data?.promotion_information} target="_blank">
            <Box component="img" src={ticket} className="ticket" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfo;
