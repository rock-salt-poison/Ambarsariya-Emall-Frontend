import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  ThemeProvider,
  Typography,
} from "@mui/material";
import createCustomTheme from "../../../styles/CustomSelectDropdownTheme";
import retailer_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/retailer.webp";
import subscription_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/subscription.webp";
import loyalty_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/loyalty.webp";
import customizable_coupon from "../../../Utils/images/Sell/cart/purchase_coupon/customizable.webp";
import radio_icon from "../../../Utils/images/Sell/cart/special_offers/radio_circle.webp";
import radio_button from "../../../Utils/images/Sell/cart/special_offers/radio_button.webp";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  get_discount_coupons,
  getLastPurchasedTotal,
  getShopUserData,
  getUser,
} from "../../../API/fetchExpressAPI";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../../../store/discountsSlice";

function RetailerCoupon({ selectedCoupon }) {
  const themeProps = {
    scrollbarThumb: "var(--brown)",
    popoverBackgroundColor: "#f8e3cc",
  };

  const theme = createCustomTheme(themeProps);
  const reduxSelectedCoupon = useSelector((state) => state.discounts.selectedCoupon);
  const cartItems = useSelector((state) => state.cart.selectedProducts);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(reduxSelectedCoupon?.coupon_id  || 1);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const location = useLocation();
  const { owner } = useParams();
  const buyerToken = useSelector((state) => state.auth.userAccessToken);
  const dispatch = useDispatch();
  const[ lastPurchasedValue, setLastPurchasedValue] = useState(null);
  const[ shopDetails, setShopDetails] = useState(null);

  console.log(selectedOption);
  

  // Create a URLSearchParams instance to access query parameters
  const queryParams = new URLSearchParams(location.search);

  // Get the 'token' query parameter
  const qp = queryParams.get("token");
  const token = qp ? qp : owner;

  const couponImages = {
    retailer_coupon: retailer_coupon,
    subscription_coupon: subscription_coupon,
    loyalty_coupon: loyalty_coupon,
    customizable_coupon: customizable_coupon,
  };

  const couponTitle = {
    retailer_coupon: "Retailer Coupons",
    subscription_coupon: "Subscription Coupons",
    loyalty_coupon: "Loyalty Coupons",
    customizable_coupon: "Customizable Coupons",
  };
  const selectedCouponKey = selectedCoupon?.alt; // Assuming `title` contains the type

  // Check if a retailer_freebies coupon is eligible based on cart items
  const isRetailerFreebiesEligible = (coupon) => {
    if (coupon.coupon_type !== "retailer_freebies") return true;

    const buy = Number(
      coupon.conditions.find((c) => c.type === "buy")?.value || 0
    );

    // Get product_ids from coupon.product_ids (separate field) or fallback to conditions
    const productIds = Array.isArray(coupon.product_ids)
      ? coupon.product_ids
      : coupon.conditions.find((c) => c.type === "product_ids")?.value || [];

    if (!buy || productIds.length === 0 || !cartItems?.length) return false;

    // Filter cart items to only eligible products
    const eligibleItems = cartItems.filter((item) => {
      const productId = item.product_id || item.id;
      return (
        productIds.includes(String(productId)) ||
        productIds.includes(Number(productId))
      );
    });

    if (eligibleItems.length === 0) return false;

    // Calculate total quantity of eligible products
    const eligibleQuantity = eligibleItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    return eligibleQuantity >= buy;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (token) {
          const resp = await getShopUserData(token);
          if (resp?.length > 0) {
            setShopDetails(resp?.[0]);
            const fetch_discounts = await get_discount_coupons(resp[0].shop_no);
            if (fetch_discounts.valid) {
              // Filter the coupons based on the selectedCouponKey
              const categoryCoupons = fetch_discounts.data.find(
                (category) =>
                  category.discount_category ===
                  selectedCouponKey?.split("_")[0]
              );

              // Set filtered coupons based on the selected category
              if (categoryCoupons) {
                setFilteredCoupons(categoryCoupons.coupons);
              }
            }
          }
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    fetchData();
  }, [token, selectedCouponKey]);

  console.log(selectedCoupon);
  

  useEffect(() => {
    if (filteredCoupons.length === 0) return;

    // Prefer an eligible retailer_freebies coupon if cart contains eligible products
    const eligibleFreebies = filteredCoupons.find(
      (c) => c.coupon_type === "retailer_freebies" && isRetailerFreebiesEligible(c)
    );

    // Fallback default: retailer_upto
    const retailerDefault = filteredCoupons.find(
      (c) => c.coupon_type === "retailer_upto"
    );

    // If nothing selected in Redux yet, choose best default
    if (!reduxSelectedCoupon?.coupon_id) {
      const defaultCoupon = eligibleFreebies || retailerDefault || filteredCoupons[0];
      if (defaultCoupon) {
        setSelectedOption(defaultCoupon.coupon_id);
        dispatch(addCoupon(defaultCoupon));
      }
      return;
    }

    // Check if Redux coupon is still in the list
    const stillValid = filteredCoupons.some(
      (c) => c.coupon_id === reduxSelectedCoupon.coupon_id
    );

    if (!stillValid) {
      // Redux coupon not applicable → switch to best default
      const fallbackCoupon = eligibleFreebies || retailerDefault || filteredCoupons[0];
      if (fallbackCoupon) {
        setSelectedOption(fallbackCoupon.coupon_id);
        dispatch(addCoupon(fallbackCoupon));
      }
      return;
    }

    // If cart now qualifies for freebies and a different coupon is selected, auto-switch to freebies
    if (
      eligibleFreebies &&
      reduxSelectedCoupon.coupon_type !== "retailer_freebies"
    ) {
      setSelectedOption(eligibleFreebies.coupon_id);
      dispatch(addCoupon(eligibleFreebies));
      return;
    }

    // If the local state doesn't match Redux, sync it
    if (selectedOption !== reduxSelectedCoupon.coupon_id) {
      setSelectedOption(reduxSelectedCoupon.coupon_id);
    }
  }, [filteredCoupons, reduxSelectedCoupon, dispatch, cartItems]);


  console.log(lastPurchasedValue);
  
  useEffect(()=>{
    if(buyerToken && shopDetails){
      getBuyerDetails(buyerToken);
    }
  }, [buyerToken, shopDetails]);

  const getBuyerDetails = async (buyerToken) => {
    try{
      setLoading(true);
      const resp = (await getUser(buyerToken))?.find(u => u?.member_id !==null);
      if(resp){
        console.log(shopDetails?.shop_no, resp?.member_id);
        
        const lastPurchasedValueResp = await getLastPurchasedTotal(shopDetails?.shop_no, resp?.member_id);
        console.log(lastPurchasedValueResp);
        
        if(lastPurchasedValueResp?.valid){
          console.log(lastPurchasedValueResp?.data?.[0]?.total_purchased);
          
          setLastPurchasedValue(lastPurchasedValueResp?.data?.[0]?.total_purchased);
        }
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  const handleClick = (e, coupon) => {
    e.preventDefault(); 
    setSelectedOption(coupon.coupon_id);
    dispatch(addCoupon(coupon));
  };

  // Function to get the current URL with the token query parameter intact
  const getCurrentUrlWithToken = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return `${window.location.pathname}?${searchParams.toString()}`;
  };

  return (
    <ThemeProvider theme={theme}>
      {!loading ? (
        <>
          <Box className="title_container">
            <Typography className="title">
              {couponTitle[selectedCouponKey] || "Coupons"}
            </Typography>
          </Box>
          <Box className="body_container">
            {filteredCoupons?.map((coupon) => {
              const discount = coupon.conditions.find(
                (condition) =>
                  condition.type === "percentage" ||
                  condition.type === "flat" ||
                  condition.type === "percent_off" ||
                  condition.type === "flat_percent" ||
                  condition.type === "save" ||
                  condition.type === "unlock"
              )?.value;

              const freebiesEligible = isRetailerFreebiesEligible(coupon);

              return (
                <React.Fragment key={coupon.coupon_id}>
                  <Link
                    to={getCurrentUrlWithToken()}
                    onClick={(e) =>
                      couponTitle[selectedCouponKey] === "Loyalty Coupons"
                        ? lastPurchasedValue && handleClick(e, coupon)
                        : handleClick(e, coupon)
                    }
                    className={`coupon_container ${
                      selectedOption === coupon.coupon_id
                        ? "mask_none selected"
                        : ""
                    } ${couponTitle[selectedCouponKey] === 'Loyalty Coupons'
                        ? lastPurchasedValue ? '': 'disable':'' }`}
                  >
                    <Box
                      component="img"
                      className="coupon"
                      alt="coupons"
                      src={couponImages[selectedCouponKey]}
                    />
                    <Box
                      component="img"
                      alt="radio"
                      className="radio_icon"
                      src={radio_icon}
                    />
                    <Box
                      component="img"
                      alt="radio"
                      className="radio_button"
                      src={radio_button}
                    />

                    <Box className="discount_coupon">
                      <Typography className="discount_type">
                        {coupon.coupon_type.replace(/_/g, " ")}
                      </Typography>
                      {coupon.coupon_type === "retailer_upto" ? (
                        <>
                          <Typography className="discount_percentage">
                            {
                              coupon.conditions.find(
                                (condition) => condition.type === "percentage"
                              )?.value
                            }
                            %
                            <Typography className="text" variant="span">
                              off
                            </Typography>
                          </Typography>

                          <Typography className="text2">
                            Order upto{" "}
                            {
                              coupon.conditions.find(
                                (condition) =>
                                  condition.type === "order_upto"
                              )?.value
                            }
                          </Typography>
                        </>
                      ) : coupon.coupon_type === "retailer_flat" ? (
                        <>
                          <Typography className="discount_percentage">
                            {
                              coupon.conditions.find(
                                (condition) => condition.type === "flat"
                              )?.value
                            }
                            %
                            <Typography className="text" variant="span">
                              off
                            </Typography>
                          </Typography>

                          <Typography className="text2">
                            Min order{" "}
                            {
                              coupon.conditions.find(
                                (condition) =>
                                  condition.type === "minimum_order"
                              )?.value
                            }
                          </Typography>
                        </>
                      ) : coupon.coupon_type === "retailer_freebies" ? (
                        <>
                          <Typography className="text2">
                            buy{" "}
                            <Typography
                              className="discount_percentage"
                              variant="span"
                            >
                              {
                                coupon.conditions.find(
                                  (condition) => condition.type === "buy"
                                )?.value
                              }
                            </Typography>
                            <Typography className="text2" variant="span">
                              {" "}get
                              <Typography
                                className="discount_percentage"
                                variant="span"
                              >
                                {
                                  coupon.conditions.find(
                                    (condition) => condition.type === "get"
                                  )?.value
                                }
                              </Typography>
                            </Typography>
                          </Typography>
                        </>
                      ) : coupon.coupon_type === "subscription_daily" ? (
                        <Typography className="discount_percentage">
                          {
                            coupon.conditions.find(
                              (condition) => condition.type === "percent_off"
                            )?.value
                          }
                          %
                          <Typography className="text" variant="span">
                            off
                          </Typography>
                        </Typography>
                      ) : coupon.coupon_type === "subscription_monthly" ? (
                        <Typography className="discount_percentage">
                          {
                            coupon.conditions.find(
                              (condition) => condition.type === "percent_off"
                            )?.value
                          }
                          %
                          <Typography className="text" variant="span">
                            off
                          </Typography>
                        </Typography>
                      ) : coupon.coupon_type === "subscription_weekly" ? (
                        <Typography className="discount_percentage">
                          {
                            coupon.conditions.find(
                              (condition) => condition.type === "percent_off"
                            )?.value
                          }
                          %
                          <Typography className="text" variant="span">
                            off
                          </Typography>
                        </Typography>
                      ) : coupon.coupon_type === "subscription_edit" ? (
                        <Typography className="discount_percentage">
                          {
                            coupon.conditions.find(
                              (condition) => condition.type === "percent_off"
                            )?.value
                          }
                          %
                          <Typography className="text" variant="span">
                            off
                          </Typography>
                        </Typography>
                      ) : coupon.coupon_type === "loyalty_unlock" ? (
                        <>
                          <Typography className="discount_percentage">
                            {
                              coupon.conditions.find(
                                (condition) => condition.type === "unlock"
                              )?.value
                            }
                            %
                            <Typography className="text" variant="span">
                              off
                            </Typography>
                          </Typography>

                          <Typography className="text2">
                            Min last order{" "}
                            {
                              coupon.conditions.find(
                                (condition) =>
                                  condition.type === "last_purchase_above"
                              )?.value
                            }
                          </Typography>
                        </>
                      ) : coupon.coupon_type === "loyalty_bonus" ? (
                        <Typography className="discount_percentage">
                          {
                            coupon.conditions.find(
                              (condition) => condition.type === "flat_percent"
                            )?.value
                          }
                          %
                          <Typography className="text" variant="span">
                            off
                          </Typography>
                        </Typography>
                      ) : coupon.coupon_type === "loyalty_prepaid" ? (
                        <>
                          <Typography className="text2">
                            Pay {" "}
                            <Typography
                              className="discount_percentage"
                              variant="span"
                            >
                              {
                                coupon.conditions.find(
                                  (condition) => condition.type === "pay"
                                )?.value
                              }
                            </Typography>
                            {" "}
                            <Typography className="text2" variant="span">
                              get
                              <Typography
                                className="discount_percentage"
                                variant="span"
                              >
                                {
                                  coupon.conditions.find(
                                    (condition) => condition.type === "get"
                                  )?.value
                                }
                              </Typography>
                            </Typography>
                          </Typography>
                        </>
                      ) : (
                        coupon.coupon_type === "loyalty_by_customer" ? (
                          <Typography className="text2">
                            Save {"  "}
                            <Typography
                              className="discount_percentage"
                              variant="span"
                            >
                              {
                                coupon.conditions.find(
                                  (condition) => condition.type === "save"
                                )?.value
                              }
                              %
                            </Typography>
                          </Typography>
                        ):
                        coupon.coupon_type === "special_discount" ? (
                          <>
                          <Typography className="text2">
                            Special Discount 
                          </Typography>
                          <Typography
                          className="text2"
                        >
                          {
                            coupon.conditions.find(
                              (condition) => condition.type === "request"
                            )?.value
                          }
                        </Typography>
                        </>
                        ):coupon.coupon_type === "sale_for_stock_clearance" ? (
                          <>
                          <Typography className="text2">
                            Price : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "price"
                                )?.value
                              }
                          </Typography>
                          <Typography className="text2">
                            Valid : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "sale_for_stock_clearance_date_range"
                                )?.value
                              }
                          </Typography>
                          <Typography className="text2">
                            SKU No : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "sku_no"
                                )?.value
                              }
                          </Typography>
                          </>
                        ):coupon.coupon_type === "hot_sale" ? (
                          <>
                          <Typography className="text2">
                            Product type : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "product_type"
                                )?.value
                              }
                          </Typography>
                          <Typography className="text2">
                            Price : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "show_price"
                                )?.value
                              }
                          </Typography>
                          <Typography className="text2">
                            Sale Price : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "sale_price"
                                )?.value
                              }
                          </Typography>
                          <Typography className="text2">
                            Discounted Price : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "price"
                                )?.value
                              }
                          </Typography>
                          <Typography className="text2">
                            Valid : {
                                coupon.conditions.find(
                                  (condition) => condition.type === "hot_sale_date_range"
                                )?.value
                              }
                          </Typography>
                          </>
                        ):coupon.coupon_type === "festivals_sale" && (
                          <>
                            <Typography className="text2">
                              {
                                  coupon.conditions.find(
                                    (condition) => condition.type === "festival_name"
                                  )?.value
                                }
                            </Typography>
                            <Typography className="text2">
                              Valid : {
                                  coupon.conditions.find(
                                    (condition) => condition.type === "festivals_sale_date_range"
                                  )?.value
                                }
                            </Typography>
                            <Typography className="text2">
                              {
                                  coupon.conditions.find(
                                    (condition) => condition.type === "offer"
                                  )?.value
                                }
                            </Typography>
                          </>
                        )
                      )}
                    </Box>
                  </Link>
                </React.Fragment>
              );
            })}
          </Box>
        </>
      ) : (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default RetailerCoupon;
