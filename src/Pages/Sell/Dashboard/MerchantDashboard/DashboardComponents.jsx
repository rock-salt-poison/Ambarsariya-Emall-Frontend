import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  get_purchaseOrderNo,
  get_saleOrderNo,
} from "../../../../API/fetchExpressAPI";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PurchasedOrderTable from "./PurchasedOrderTable";
import SaleOrderTable from "./SaleOrderTable";

function DashboardComponents({ data, date }) {
  const [loading, setLoading] = useState(false);
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const [saleOrders, setSaleOrders] = useState(0);
  const [selectedPO, setSelectedPO] = useState([]);
  const [activeTable, setActiveTable] = useState("purchase"); // Default to Purchase Order Table

  const card_data = [
    { id: 1, heading: "Today's Sale Orders", value: "-" },
    { id: 2, heading: "Today's Subscriptions Orders", value: "-" },
    { id: 3, heading: "Today's Counter Orders", value: "-" },
    { id: 4, heading: "Today's Completed Orders", value: "-" },
    { id: 5, heading: "Today's Pending Orders", value: "-" },
    { id: 6, heading: "Today's Total Sale", value: "-" },
    { id: 7, heading: "P.O. Number", value: "-", slider: true, type: "purchase" },
    { id: 8, heading: "S.O. Number", value: saleOrders, link: true, type: "sale" },
  ];

  const fetch_po_no = async (shop_no, date) => {
    try {
      setLoading(true);
      if (shop_no && date) {
        const selectedDate = date?.replace(/\//g, "-");
        const resp = await get_purchaseOrderNo(shop_no, selectedDate);
        if (resp.valid) {
          setPurchasedOrders(resp.data);
        }
      }
    } catch (e) {
      console.log(e);
      setPurchasedOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && date) {
      fetch_po_no(data.shop_no, date);
      fetchSaleOrderNo(data.shop_no);
    }
  }, [data, date]);

  const fetchSaleOrderNo = async (shop_no) => {
    try {
      const resp = await get_saleOrderNo(shop_no);
      if (resp.valid) {
        setSaleOrders(resp.data.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (purchasedOrders.length > 0) {
      setSelectedPO(purchasedOrders?.[0]?.po_no);
    }
  }, [purchasedOrders]);

  return (
    <>
      <Box className="col">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        <Box className="container">
          {card_data.map((card) => (
            <Box
              key={card.id}
              className={`card ${activeTable === card.type ? "active" : ""}`}
              onClick={() => card.type && setActiveTable(card.type)}
            >
              <Typography className="heading">{card.heading}</Typography>
              {card.slider ? (
                purchasedOrders.length > 0 ? (
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    onSlideChange={(swiper) => {
                      const poNumber = purchasedOrders[swiper.activeIndex]?.po_no;
                      setSelectedPO(poNumber);
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {purchasedOrders.map((order, index) => (
                      <SwiperSlide key={index}>
                        <Typography className="number" sx={{cursor:'pointer'}}>
                          {order.po_no.split("_")[2]}
                        </Typography>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <Typography className="number">-</Typography>
                )
              ) : (
                <Typography className="number" sx={{cursor:'pointer'}}>{card.value}</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      
      {/* Conditionally render tables */}
      {activeTable === "purchase" ? (
        <PurchasedOrderTable selectedPO={selectedPO} purchasedOrders={purchasedOrders} />
      ) : (
        <SaleOrderTable seller_id={data?.shop_no} />
      )}
    </>
  );
}

export default DashboardComponents;
