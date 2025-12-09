import React, { useState, useEffect } from "react";
import { Box, CircularProgress, ThemeProvider, Typography } from "@mui/material";
import Button2 from "../../Components/Home/Button2";
import Board from "../../Components/CouponOffering/Board";
import boardImg from "../../Utils/images/Sell/coupon_offering_page/board.svg";
import Offers from "../../Components/CouponOffering/Offers";
import { useNavigate, useParams } from "react-router-dom";
import createCustomTheme from "../../styles/CustomSelectDropdownTheme";
import RetailerPopupContent from "../../Components/CouponOffering/RetailerPopupContent";
import LoyaltyPopupContent from "../../Components/CouponOffering/LoyaltyPopupContent";
import SubscriptionPopupContent from "../../Components/CouponOffering/SubscriptionPopupContent";
import CustomizablePopupContent from "../../Components/CouponOffering/CustomizablePopupContent";
import RsTenPerDayContent from "../../Components/CouponOffering/RsTenPerDayContent";
import { useDispatch, useSelector } from "react-redux";
import UserBadge from "../../UserBadge";
import { addCoupon } from "../../store/couponsSlice";
import { getUser, post_discount_coupons } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../../Components/CustomSnackbar";

const OFFER_TYPES = [
  {
    type: "retailer",
    popup: true,
    popup_body_content: (onClose) => <RetailerPopupContent onClose={onClose} />,
  },
  {
    type: "subscription",
    popup: true,
    popup_body_content: (onClose) => (
      <SubscriptionPopupContent onClose={onClose} />
    ),
  },
  {
    type: "loyalty",
    popup: true,
    popup_body_content: (onClose) => <LoyaltyPopupContent onClose={onClose} />,
  },
  {
    type: "customizable",
    popup: true,
    popup_body_content: (onClose) => (
      <CustomizablePopupContent onClose={onClose} />
    ),
  },
  {
    type: "Rs 10/per day",
    heading: "Shops Available",
    popup: true,
    popup_body_content: (onClose) => <RsTenPerDayContent onClose={onClose} />,
    optionalCName: "rs_per_day",
  },
];

function CouponOfferingPage(props) {
  const MAX_HEIGHT = 300;
  const [graphHeights, setGraphHeights] = useState(
    OFFER_TYPES.reduce((acc, offer) => ({ ...acc, [offer.type]: 0 }), {})
  );
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [rsPerDay, setRsPerDay] = useState(0);
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupon);
  const [loading, setLoading] = useState(false);
  const [eshop, setEshop]=useState("");
const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const retailerCoupon = useSelector((state) => state.coupon.retailer);
  const loyaltyCoupon = useSelector((state) => state.coupon.loyalty);
  const subscriptionCoupon = useSelector((state) => state.coupon.subscription);
  const customizableCoupon = useSelector((state) => state.coupon.customizable);

  // Map checked coupons to increase height
  const calculateHeights = () => {};

  // useEffect(() => {
  //   calculateHeights();
  // }, [retailerCoupon, loyaltyCoupon, subscriptionCoupon, customizableCoupon]);

  const themeProps = {
    popoverBackgroundColor:
      props.popoverBackgroundColor || "var(--text-color-light)",
    textColor: props.textColor || "black",
    scrollbarThumb: "var(--brown)",
  };

  const theme = createCustomTheme(themeProps);
  const {token} = useParams();

  // const handleClick = (e, type) => {
  //   const offerBox = e.target.closest('.offer_box');
  //   const rs_per_day = e.target.closest('.rs_per_day');
  //   const makeAWish = e.target.closest('.make_a_wish');

  //   if (offerBox) {
  //     offerBox.classList.add('reduceSize3');

  //     setTimeout(() => {
  //       offerBox.classList.remove('reduceSize3');
  //       if (makeAWish) {
  //         setTimeout(() => navigate('../book-eshop'), 600);
  //       }
  //     }, 300);

  //     if (!makeAWish && !rs_per_day) {
  //       let updatedHeights = { ...graphHeights };

  //   // Calculate retailer height
  //   if (retailerCoupon) {
  //     const retailerCheckedCount = Object.values(retailerCoupon.discounts)
  //       .filter(discount => discount.checked).length;
  //     updatedHeights['retailer'] = Math.min(retailerCheckedCount * 25, MAX_HEIGHT);
  //   }

  //   // Calculate subscription height
  //   if (subscriptionCoupon) {
  //     const subscriptionCheckedCount = Object.values(subscriptionCoupon.discounts)
  //       .filter(discount => discount.checked).length;
  //     updatedHeights['subscription'] = Math.min(subscriptionCheckedCount * 25, MAX_HEIGHT);
  //   }

  //   // Calculate loyalty height
  //   if (loyaltyCoupon) {
  //     const loyaltyCheckedCount = Object.values(loyaltyCoupon.discounts)
  //       .filter(discount => discount.checked).length;
  //     updatedHeights['loyalty'] = Math.min(loyaltyCheckedCount * 25, MAX_HEIGHT);
  //   }

  //   // Calculate customizable height (this could be more complex if there are more conditions)
  //   if (customizableCoupon) {
  //     const discountsValues = Object.values(customizableCoupon.discounts || {});

  //     // If needed, calculate the count of valid discounts
  //     const validDiscounts = discountsValues.filter(
  //       discount => discount.checked
  //     );

  //     // Update heights
  //     updatedHeights['customizable'] = Math.min(validDiscounts.length * 25, MAX_HEIGHT);
  //     console.log('Updated Heights:', updatedHeights);
  //   }

  //   // Update total height
  //   const newTotal = Object.values(updatedHeights).reduce((acc, height) => acc + height, 0);
  //   setTotal(newTotal);

  //   setGraphHeights(updatedHeights);
  //     }

  //     if (rs_per_day && rsPerDay < 10) {
  //       setRsPerDay(10);
  //     }
  //   }
  // };

  useEffect(() => {
      const fetchData = async () => {
        if (token) {
          try {
            setLoading(true);
            let users = await getUser(token);
            let shop = users.find((u) => u.shop_no !== null);
            console.log(shop);
  
            if (shop?.shop_access_token) {
              setEshop(shop);
            }
          } catch (e) {
            console.log(e);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchData();
    }, [token]);

  const handleClick = async (e, type) => {
    const offerBox = e.target.closest(".offer_box");
    const rs_per_day = e.target && e.target.classList.contains("rs_per_day");
    const makeAWish = e.target.closest(".make_a_wish");
    const graphBox = e.target.closest(`.${type}_graph`); // Check if clicked on a graph

    let updatedHeights = { ...graphHeights };

    if (graphBox) {
      // Reduce height when clicking on the graph
      if (updatedHeights[type] > 0) {
        updatedHeights[type] = Math.max(updatedHeights[type] - 25, 0);
      }
    } else if (offerBox) {
      offerBox.classList.add("reduceSize3");

      setTimeout(async () => {
        offerBox.classList.remove("reduceSize3");
        if (makeAWish) {
          if(token){
              const validityStart = new Date();
  
                // Format validity_start as 'YYYY-MM-DD'
                const formattedValidityStart = validityStart
                  .toLocaleString()
                  .split("T")[0];
  
                // Calculate validity_end as one year after validity_start
                const validityEnd = new Date(validityStart);
                validityEnd.setFullYear(validityStart.getFullYear() + 1);
  
                // Format validity_end as 'YYYY-MM-DD'
                const formattedValidityEnd = validityEnd
                  .toLocaleString()
                  .split("T")[0];
  
                const coupons_data = {
                  validity_start: formattedValidityStart,
                  validity_end: formattedValidityEnd,
                  data: coupons,
                };
  
                console.log(coupons_data);

                try{
                  setLoading(true);
                  const discount_coupons = await post_discount_coupons(
                    coupons_data,
                    eshop.shop_no
                  );
    
                  console.log(discount_coupons);
                  setSnackbar({
                    open: true,
                    message: discount_coupons.message,
                    severity: "success",
                  });
                  setTimeout(()=>{navigate(-1)}, 300);
                }
                catch(e){
                  setSnackbar({
                    open: true,
                    message: e.message,
                    severity: "error",
                  });
                }finally{
                  setLoading(false);
                }
          }else{
            setTimeout(() => navigate("../book-eshop"), 600);
          }
        }
      }, 300);

      if (!makeAWish && !rs_per_day) {
        // Calculate the current total height
        const currentTotal = Object.values(updatedHeights).reduce(
          (acc, height) => acc + height,
          0
        );

        // Function to dynamically increase height per click (only if total is within 300)
        const incrementHeight = (category, coupon) => {
          if (coupon) {
            const checkedCount = Object.values(coupon.discounts || {}).filter(
              (discount) => discount.checked
            ).length;

            if (checkedCount > 0) {
              const newHeight = (updatedHeights[category] || 0) + 25;

              // Ensure total height does not exceed 300
              if (currentTotal + 25 <= 300) {
                updatedHeights[category] = Math.min(newHeight, MAX_HEIGHT);
              }
            }
          }
        };

        // Apply height increment logic for each coupon category
        if (type === "retailer") {
          incrementHeight("retailer", retailerCoupon);
        }
        if (type === "subscription") {
          incrementHeight("subscription", subscriptionCoupon);
        }
        if (type === "loyalty") {
          incrementHeight("loyalty", loyaltyCoupon);
        }
        if (type === "customizable") {
          incrementHeight("customizable", customizableCoupon);
        }
      }

      if (rs_per_day && rsPerDay < 10) {
        setRsPerDay(10);
      }
      
      
    }

    console.log("Updated Heights:", updatedHeights);

    // Update total height (ensure it does not exceed 300)
    const newTotal = Object.values(updatedHeights).reduce(
      (acc, height) => acc + height,
      0
    );
    setTotal(Math.min(newTotal, 300));
    setGraphHeights(updatedHeights);

    // Dispatch Redux update to sync `no_of_coupons` with `graphHeight`
    dispatch(
      addCoupon({
        type,
        coupon: {
          ...coupons[type], // Preserve existing coupon data
          no_of_coupons: updatedHeights[type], // Set no_of_coupons equal to graphHeight
        },
      })
    );
  };

  const handleRsPerDay = () => {
    setRsPerDay(10);
  };

  console.log(useSelector((state) => state.coupon));

  return (
    <ThemeProvider theme={theme}>
      {loading && <Box className="loading"><CircularProgress /></Box> }
      <Box className="coupon_offering_wrapper">
        <Box className="row">
          <Box className="col">
            <Box></Box>
            <Box className="header_board">
              <Board text="E-shop" imgSrc={boardImg} />
              <Board text="coupons offering" imgSrc={boardImg} />
              <Board text="emboss brand" imgSrc={boardImg} />
            </Box>
            {/* <Button2 text="Back" redirectTo="/sell" /> */}

            <UserBadge
              handleBadgeBgClick="../"
              handleLogin="../login"
              handleLogoutClick="../../"
            />
          </Box>

          <Box className="col">
            {OFFER_TYPES.map(
              ({ type,heading, popup, popup_body_content, optionalCName }) => (
                <Offers
                  key={type}
                  text={type}
                  heading={heading}
                  popup={popup}
                  popup_body_content={popup_body_content}
                  onClick={
                    type === "Rs 10/per day"
                      ? handleRsPerDay
                      : (e) => handleClick(e, type)
                  }
                  optionalCname={optionalCName}
                />
              )
            )}
          </Box>

          <Box className="col">
            <Box className="graph_container">
              {OFFER_TYPES.slice(0, -1).map(({ type }) => (
                <Box
                  key={type}
                  className={`${type}_graph`}
                  style={{
                    height: `${graphHeights[type]}px`,
                    maxHeight: "100%",
                  }}
                  onClick={(e) => handleClick(e, type)}
                >
                  <Typography className="percentage">
                    {graphHeights[type]}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography className="total">
              Total = {total} discount coupons
              {/* <Typography variant="span"> + </Typography>
              {rsPerDay} ₹ per day */}
            </Typography>
            <Offers
              text="make a wish"
              optionalCname="make_a_wish"
              onClick={(e) => handleClick(e)}
            />
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
              open={snackbar.open}
              handleClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              severity={snackbar.severity}
            />
    </ThemeProvider>
  );
}

export default CouponOfferingPage;
