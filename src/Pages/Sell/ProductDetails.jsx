import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Button2 from "../../Components/Home/Button2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { convertDriveLink, get_product, getShopUserData } from "../../API/fetchExpressAPI";
import UserBadge from "../../UserBadge";

function ProductDetails() {
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

  

  const RenderComponent = ({ title, bgColor, linkTo, target }) => {
    return (
      <Box className="points">
        <Box className="point">
          <Box className="circle"></Box>
          <Box className="line"></Box>
          <Box className="small_circle" sx={{ background: bgColor }}></Box>
        </Box>
        <Link target={target} to={linkTo}>
          <Typography variant="h2" sx={{ background: bgColor }}>
            {title}
          </Typography>
        </Link>
      </Box>
    );
  };

  return (
    <Box className="products_wrapper">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Box className="row">
        <Box className="col">
          <Box className="sub_col">
            
            {/* <Button2 text={"Back"} redirectTo={`../shop/${token}/products`} /> */}
          </Box>
          <Box className="sub_col">
            <Typography variant="h2" className="heading">
              Product
            </Typography>
          </Box>
          <Box className="sub_col">
          <UserBadge
                handleBadgeBgClick={`../shop/${token}/products`}
                handleLogin="../login"
                handleLogoutClick="../../AmbarsariyaMall"
            />
          </Box>
        </Box>
        <Box className="col">
          <Box className="sub_col"></Box>
          <Box className="product_data">
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
            <Box className="row_1">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                // loop={true}
                // autoplay={{
                //   delay: 400,
                //   disableOnInteraction: false,
                // }}
                // speed={2000}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {data?.product_images.map((img, index) => (
                  <SwiperSlide key={index} className="card">
                    <Box component="img" src={convertDriveLink(img)} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <Box className="product_img">
                                
                            </Box> */}
              <Box className="product_details">
                <RenderComponent
                    bgColor="linear-gradient(to right, #E72D75, #FCBE0B)"
                    title="Product Specifications"
                    linkTo={`../shop/${token}/products/specification/${product_id}`}
                  />
                <RenderComponent
                  bgColor="linear-gradient(to right, #1B98BA, #0BC8AF)"
                  title="Brand Catalogue"
                  linkTo={`../shop/${token}/products/brand-catalog/${product_id}`}
                />
                <RenderComponent
                  bgColor="linear-gradient(to right, #6E0080, #E1008B)"
                  title="Product Catalogue"
                  linkTo={`../shop/${token}/products/product-catalog/${product_id}`}
                />
                <RenderComponent
                  bgColor="linear-gradient(to right, #E72D75, #FCBE0B)"
                  title="Add item in supply"
                />
                <RenderComponent
                  bgColor="linear-gradient(to right, #074589, #2C96C4)"
                  title="Variations"
                  linkTo={`../shop/${token}/products/detail/${product_id}`}
                />
              </Box>
            </Box>
            <Box className="row_1">
              <Box className="product_description">
                <Typography variant="h3">
                  <Typography variant="span">
                    {[
                      data?.product_name,
                      data?.brand,
                      data?.product_type,
                    ]
                      .filter((item) => item) // Filter out falsy values (e.g., undefined, null, empty strings)
                      .join(", ")}{" "}
                    {/* Join the remaining values with a comma and space */}
                  </Typography>
                  <Typography variant="span price">&#8377; {data?.first_iku_price ?  data?.first_iku_price : data?.selling_price} {data?.unit} </Typography>
                </Typography>
              </Box>
            </Box>
            <Box className="board_pins">
              <Box className="circle"></Box>
              <Box className="circle"></Box>
            </Box>
          </Box>
          <Box className="sub_col"></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;
