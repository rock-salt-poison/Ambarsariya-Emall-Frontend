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
import { convertDriveLink, get_product, getShopUserData } from "../../API/fetchExpressAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Autoplay, Pagination, Navigation } from "swiper/modules";
import plane_img from '../../Utils/images/Sell/products/plane.webp';
import ticket from '../../Utils/images/Sell/products/ticket_design.webp';
import UserBadge from "../../UserBadge";

function ProductInfo() {
  const { product_id, token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("variation1");

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

  const variations = [
    {id:1, value: 'variation1', label : 'Variation 1'},
    {id:2, value: 'variation2', label : 'Variation 2'},
    {id:3, value: 'variation3', label : 'Variation 3'},
    {id:4, value: 'variation4', label : 'Variation 4'},
  ];

  return (
    <Box className="product_details_wrapper">
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
                Description :{" "}
              </Typography>{" "}
              {data?.product_description}
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          <Box className="details2">
            <Typography className="text">
              <Typography variant="span" className="light">
                Brand :{" "}
              </Typography>{" "}
              {data?.brand}
            </Typography>
            <Typography className="text">
              <Typography variant="span" className="light">
                Style :{" "}
              </Typography>
              {data?.product_style}
            </Typography>
          </Box>
        </Box>
        <Box className="col">
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {variations.map((item)=> (
                <FormControlLabel
                 key={item.id}
                value={item.value}
                control={<Radio />}
                label={item.label}
                className="variation"
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

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
              {data?.product_images.map((product_image, index) => (
                <SwiperSlide key={index} className="card">
                  <Box className="images swiper-zoom-container">
                    <Box component="img" src={convertDriveLink(product_image)}/>  
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          <Typography className="text"><Typography variant="span" className="light">Price : </Typography>{data?.price} {data?.unit}</Typography>
          </Box>
        </Box>

        <Box className="col">
          <Box className="image_container_2">
            <Box component="img" src={plane_img} className="plane"/>
          </Box>
        </Box>
        <Box className="col ticket_container">
            <Link className="image_container_3" to={data?.promotion_information} target="_blank">
              <Box component="img" src={ticket} className="ticket"/>
            </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInfo;
