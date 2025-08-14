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
  getShopUserData,
} from "../../../API/fetchExpressAPI";
import { useDispatch } from "react-redux";
import { addCoupon } from "../../../store/discountsSlice";

function RetailerCoupon({ selectedCoupon }) {
  const themeProps = {
    scrollbarThumb: "var(--brown)",
    popoverBackgroundColor: "#f8e3cc",
  };

  const theme = createCustomTheme(themeProps);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const location = useLocation();
  const { owner } = useParams();
  const dispatch = useDispatch();

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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (token) {
          const resp = await getShopUserData(token);
          if (resp?.length > 0) {
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
                (condition) => condition.type === "percentage" || condition.type === "flat" || condition.type === "percent_off" || condition.type === "flat_percent" || condition.type === "save" ||condition.type === "unlock"
              )?.value;
              return (
                <React.Fragment key={coupon.coupon_id}>
                  <Link
                    to={getCurrentUrlWithToken()}
                    onClick={(e) => {
                      handleClick(e, coupon);
                    }}
                    className={`coupon_container ${
                      selectedOption === coupon.coupon_id
                        ? "mask_none selected"
                        : ""
                    }`}
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
