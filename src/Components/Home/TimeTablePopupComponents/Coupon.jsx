import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { get_advt, getShopUserData } from "../../../API/fetchExpressAPI";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Pagination } from "swiper/modules";
import MarqueeComponent from "../MarqueeComponent";

export default function Coupon({page}) {
  const [advtShops, setAdvtShops] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resp = await get_advt(page);
        if (resp.message === "Valid" && resp.data.length > 0) {
          const shops = await Promise.all(
            resp.data.map(async (advt) => {
              const token = advt.shop_access_token;
              return (await getShopUserData(token))[0];
            })
          );
          setAdvtShops(shops);
        }
      } catch (error) {
        console.error("Error fetching shop user data:", error);
      }
    };

    fetchDetails();
  }, [page]);
  return (
    <Swiper
      grabCursor={true}
      pagination={false}
      modules={[Pagination]}
      className="mySwiper"
      loop={true}
    >
      {advtShops.map((advt) => {
        return (
          <SwiperSlide key={advt.id}>
            <Box className="ticket">
              <Box className="left">
                <Box className="container">
                    <Box className="sector">
                      <MarqueeComponent text={advt.sector_name} speed={5}/>
                    </Box>
                    <Box className="domain">
                      <MarqueeComponent text={advt.domain_name} speed={40}/>
                    </Box>
                </Box>
              </Box>
              <Box className="divider"></Box>
              <Box className="right">
                <Box className="inner-box">
                  <Box className="shop-name">{advt.business_name}</Box>
                  <Box className="category">{advt.category_name[0]}</Box>
                  <Box className="product">Products</Box>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
