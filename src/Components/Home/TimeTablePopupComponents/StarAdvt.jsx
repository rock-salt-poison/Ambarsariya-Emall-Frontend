import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { get_advt, getShopUserData } from "../../../API/fetchExpressAPI";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import MarqueeComponent from "../MarqueeComponent";

function StarAdvt({ page }) {
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
            <Box className="star">
              <Box className="container">
                  {/* <Typography className="shop_name">{advt.business_name}</Typography> */}
                    <MarqueeComponent text={advt.business_name} speed={30} />
                    <MarqueeComponent text={[`Sector : ${advt.sector_name}`, `Category : ${advt.category_name[0]}`, ]} speed={30} />
                <Box className="details">
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default StarAdvt;
