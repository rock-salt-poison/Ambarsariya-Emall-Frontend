import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  get_allPurchaseOrderDetails,
  get_purchaseOrderNo,
  get_saleOrderNo,
  getUser,
} from "../../../../API/fetchExpressAPI";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SaleOrderTable from "./SaleOrderTable";
import { Link, useParams } from "react-router-dom";
import BuyerPurchasedOrderTable from "./BuyerPurchasedOrderTable";
import SellerPurchasedOrderTable from "./SellerPurchasedOrderTable";
import { useSelector } from "react-redux";

function DashboardComponents({ data, date }) {
  const [loading, setLoading] = useState(false);
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const { token } = useParams();
  const loggedInUserToken = useSelector((state) => state.auth.userAccessToken);
  const [saleOrders, setSaleOrders] = useState(0);
  const [merchantPurchaserOrders, setMerchantPurchaserOrders] = useState([]);
  const [selectedMerchantPO, setSelectedMerchantPO] = useState([]);
  const [selectedPO, setSelectedPO] = useState([]);
  const [activeTable, setActiveTable] = useState('sale'); // Default to Purchase Order Table

  const card_data = [
    { id: 1, heading: "Today's Sale Orders", value: "-" },
    { id: 2, heading: "Today's Subscription Orders", value: "-" },
    { id: 3, heading: "Today's Counter Orders", value: "-" },
    { id: 4, heading: "Today's Completed Orders", value: "-" },
    { id: 5, heading: "Today's Pending Orders", value: "-" },
    { id: 6, heading: "Today's Total Sale", value: "-" },
    { id: 7, heading: "P.O. Number", value: "-", slider: true, type: "purchase" },
    // { id: 8, heading: "S.O. Number", value: saleOrders, link: true, type: "sale" },
    { id: 8, heading: "S.O. Number", value: "-", slider: true, link : true ,type: "sale" },
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
      console.log(e.response.data?.message)
      setPurchasedOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && date) {
      fetch_po_no(data.shop_no, date);
      // fetchSaleOrderNo(data.shop_no);
    }
  }, [data, date]);

  useEffect(() => {
      if (loggedInUserToken) {
        const fetchUserType = async () => {
          try {
            setLoading(true);
            const userData = (await getUser(loggedInUserToken))?.find((u)=>u.member_id !== null);
            console.log(userData);
            
  
            if (userData.user_type === "member" || userData.user_type === "merchant") {
              fetchPurchasedOrder(userData.member_id);
            }
          } catch (e) {
            console.log(e);
          } finally {
            setLoading(false);
          }
        };
        fetchUserType();
      }
    }, [loggedInUserToken]);

const fetchPurchasedOrder = async (buyer_id) => {
    try {
      setLoading(true);
      const resp = await get_allPurchaseOrderDetails(buyer_id);
      if (resp.valid) {
        console.log(resp.data);
        
        setMerchantPurchaserOrders(resp.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
    
  // const fetchSaleOrderNo = async (shop_no) => {
  //   try {
  //     const resp = await get_saleOrderNo(shop_no);
  //     if (resp.valid) {
  //       setSaleOrders(resp.data.length);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    if (purchasedOrders.length > 0) {
      setSelectedPO(purchasedOrders?.[0]?.po_no);
    }
  }, [purchasedOrders]);

  useEffect(() => {
    if (merchantPurchaserOrders.length > 0) {
      setSelectedMerchantPO(merchantPurchaserOrders?.[0]?.po_no);
    }
  }, [merchantPurchaserOrders]);

  const handleMerchantSellerSlideChange = (swiper) => {
    const poNumber = purchasedOrders[swiper.activeIndex]?.po_no;
    setSelectedPO(poNumber);
  };

  const handleMerchantBuyerSlideChange = (swiper) => {
    const poNumber = merchantPurchaserOrders[swiper.activeIndex]?.po_no;
    setSelectedMerchantPO(poNumber);
  };

  console.log(selectedPO, selectedMerchantPO, activeTable);
  

  return (
    <>
      <Box className="col">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        <Box className="container">
          {card_data.map((card) => {
  const isPurchase = card.type === 'purchase';
  const isSale = card.type === 'sale';
  const showSlider = card.slider;
  const orders = isPurchase ? merchantPurchaserOrders : purchasedOrders;

  const handleSlideChange = isPurchase
    ? handleMerchantBuyerSlideChange
    : isSale
    ? handleMerchantSellerSlideChange
    : undefined;

  const renderSwiper = (optionalCName) => (
    orders.length > 0 ? (
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        navigation={true}
        modules={[Navigation]}
        className={`mySwiper ${activeTable === 'purchase' ? isPurchase ? 'active' : '' : activeTable === 'sale' ? isSale ? 'active' : '' : ''}`}
      >
        {orders.map((order, index) => {
          const poNo = order?.po_no?.split("&")[2] || '-';
          return (
            <SwiperSlide key={index}>
              <Typography className="number" sx={{ cursor: 'pointer' }}>
                {isPurchase || isSale ? (
                  <Link
                    className="number"
                    to={`../support/shop/${token}/purchased-order/${encodeURIComponent(order?.po_no)}`}
                  >
                    {poNo}
                  </Link>
                ) : poNo}
              </Typography>
            </SwiperSlide>
          );
        })}
      </Swiper>
    ) : (
      <Typography className="number">-</Typography>
    )
  );

  return (
    <Box
      key={card.id}
      className={`card ${activeTable === card.type ? "active" : ""}`}
      onClick={() => card.type && setActiveTable(card.type)}
    >
      <Typography className="heading">{card.heading}</Typography>
      {showSlider ? renderSwiper(activeTable === "sale" 
        ? (selectedPO ? "current" : "") 
        : activeTable === "purchase" 
        ? (selectedMerchantPO ? "merchant_current" : "") 
        : "") : (
        <Typography className="number" sx={{ cursor: 'pointer' }}>
          {card.value}
        </Typography>
      )}
    </Box>
  );
})}

        </Box>
      </Box>
      
      {/* Conditionally render tables */}
      {activeTable &&  activeTable === "purchase" ? (
        <BuyerPurchasedOrderTable selectedPO={selectedMerchantPO} purchasedOrders={merchantPurchaserOrders}/>
      ) : (
        // <SaleOrderTable seller_id={data?.shop_no} />
        <SellerPurchasedOrderTable selectedPO={selectedPO} purchasedOrders={purchasedOrders} cardType="S.O"/>
      )}
    </>
  );
}

export default DashboardComponents;
