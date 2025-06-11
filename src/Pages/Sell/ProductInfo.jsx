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
import { Link, useNavigate, useParams } from "react-router-dom";
import { convertDriveLink, get_product, get_product_variants, get_products, getShopUserData } from "../../API/fetchExpressAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import plane_img from '../../Utils/images/Sell/products/plane.webp';
import ticket from '../../Utils/images/Sell/products/ticket_design.webp';
import UserBadge from "../../UserBadge";
import Button2 from "../../Components/Home/Button2";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";
import CustomSnackbar from "../../Components/CustomSnackbar";

function ProductInfo() {
  const { product_id, token } = useParams();
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !product_id) return;

      try {
        setLoading(true);

        // Fetch product variants
        const resp = await get_product_variants(product_id);
        console.log(resp.data);

        const productResp = await get_product(resp.data?.[0]?.shop_no, resp.data?.[0]?.product_id);
        if(productResp?.valid){
          setProduct(productResp.data?.[0])
          console.log(productResp.data?.[0])
        }
        
        
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
 
  useEffect(() => {
  if (data?.[selectedVariant]) {
    setProduct(prev => ({
      ...prev,
      selling_price: data[selectedVariant].selling_price,
      selectedVariant: data[selectedVariant].item_id
    }));
  }
}, [selectedVariant, data]);


  const handleCartClick = () => {
    console.log(product);
    dispatch(addProduct(product));
    setSnackbar({
      open: true,
      message: `Product Added to cart successfully!`,
      severity: "success",
    });

    setTimeout(()=>{
      navigate(`../shop/${token}/products`);
    }, 600);
  }

  

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
              handleLogoutClick="../../"
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
              {data?.[selectedVariant]?.item_id ? data?.[selectedVariant]?.item_id?.split('_')?.at(-2) : data?.[0]?.product_style ? data?.[0]?.product_style : '-'}
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
              {data?.[selectedVariant]?.selling_price ? data?.[selectedVariant]?.selling_price : data?.[selectedVariant]?.product_selling_price} {data?.[selectedVariant]?.unit}
              </Typography>
          </Box>
        </Box>

        <Box className="col plane_col">
          <Box className="image_container_2">
            <Box component="img" src={plane_img} className="plane" />
          </Box>
        </Box>

        <Box className="col cart_button">
          <Button2
            text="Proceed"
            // redirectTo={`../shop/${token}/cart`}
            onClick={()=>handleCartClick()}
          />
        </Box>

        <Box className="col ticket_container">
          <Link className="image_container_3" to={data?.promotion_information} target="_blank">
            <Box component="img" src={ticket} className="ticket" />
          </Link>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}

export default ProductInfo;
