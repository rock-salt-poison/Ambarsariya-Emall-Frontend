import React, { useEffect, useState } from "react";
import { Box, CircularProgress, ThemeProvider, Typography } from "@mui/material";
import createCustomTheme from "../../../styles/CustomSelectDropdownTheme";
import retailer_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/retailer_coupon.webp";
import subscription_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/subscription_coupon.webp";
import loyalty_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/loyalty_coupon.webp";
import customizable_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/customizable_coupon.webp";
import CardBoardPopup from "../../CardBoardPopupComponents/CardBoardPopup";
import { Link, useLocation, useParams } from "react-router-dom";
import RetailerCoupon from "./RetailerCoupon"; // Import RetailerCoupon
import { get_discount_coupons, getShopUserData } from "../../../API/fetchExpressAPI";

function PurchaseCoupon() {
  const themeProps = {
    scrollbarThumb: "var(--brown)",
    popoverBackgroundColor: "#f8e3cc",
  };

  const theme = createCustomTheme(themeProps);
  const [openPopup, setOpenPopup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCouponData, setSelectedCouponData] = useState(null); // Store selected coupon data
  const [filteredCoupons, setFilteredCoupons] = useState([]); // Store filtered coupons

  const handleClose = () => {
    setOpenPopup(false);
    setSelectedCouponData(null); // Reset selected coupon data on close
  };

  const handleClick = (coupon) => {
    setOpenPopup((prev) => (prev === coupon.id ? null : coupon.id));
    setSelectedCouponData(coupon); // Set the selected coupon's data
  };

  const location = useLocation();
  const { owner } = useParams();

  // Create a URLSearchParams instance to access query parameters
  const queryParams = new URLSearchParams(location.search);
  const qp = queryParams.get("token");
  const token = qp ? qp : owner;

  const coupons = [
    {
      id: 1,
      alt: "retailer_coupon",
      title: "Retailer Coupons",
      imgSrc: retailer_coupon,
    },
    {
      id: 2,
      alt: "subscription_coupon",
      title: "Subscription Coupons",
      imgSrc: subscription_coupon,
    },
    {
      id: 3,
      alt: "loyalty_coupon",
      title: "Loyalty Coupons",
      imgSrc: loyalty_coupon,
    },
    {
      id: 4,
      alt: "customizable_coupon",
      title: "Customizable Coupons",
      imgSrc: customizable_coupon,
    },
  ];

  const getCurrentUrlWithToken = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return `${window.location.pathname}?${searchParams.toString()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (token) {
          const shopUserData = await getShopUserData(token);
          if (shopUserData?.length > 0) {
            const shopNo = shopUserData[0].shop_no;
            const fetch_discounts = await get_discount_coupons(shopNo);

            if (fetch_discounts.valid) {
              // Filter coupons by matching `alt` with `discount_category`
              const filtered = coupons.map((coupon) => {
                const matchedCategory = fetch_discounts.data.find(
                  (item) => item.discount_category === (coupon.alt)?.split('_')[0]
                );
                return matchedCategory
                  ? { ...coupon, discount_coupons: matchedCategory.coupons }
                  : null;
              }).filter(Boolean); // Remove unmatched categories
              setFilteredCoupons(filtered);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);


  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading">
        <CircularProgress/>
      </Box>}
      <Box className="title_container">
        <Typography className="title">Purchase Coupons</Typography>
      </Box>
      <Box className="body_container">
        {filteredCoupons.map((coupon) => (
          <React.Fragment key={coupon.id}>
            <Link
            to={getCurrentUrlWithToken()}
              onClick={() => handleClick(coupon)}
              style={{ textDecoration: "none", cursor: "pointer" }} // Optional: Add styles for better UX
            >
              <Box
                component="img"
                className="coupon"
                alt={coupon.alt}
                src={coupon.imgSrc}
              />
            </Link>
            <CardBoardPopup
              customPopup={true}
              open={openPopup === coupon.id}
              handleClose={handleClose}
              body_content={
                <RetailerCoupon selectedCoupon={selectedCouponData} />
              } // Pass selected coupon data
              optionalCName="purchase_coupon_offer_popup coupons"
            />
          </React.Fragment>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default PurchaseCoupon;
