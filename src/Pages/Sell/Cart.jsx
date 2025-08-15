import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import po_stamp from "../../Utils/images/Sell/cart/po_stamp.webp";
import qr_code from "../../Utils/images/Sell/cart/qr_code.svg";
import CartTable from "../../Components/Cart/CartTable";
import badge_frame from "../../Utils/images/Sell/cart/badge_frame.webp";
import Button2 from "../../Components/Home/Button2";
import pickup from "../../Utils/images/Sell/shop_details/pickup.svg";
import delivery from "../../Utils/images/Sell/shop_details/delivery.webp";
import home_visit from "../../Utils/images/Sell/shop_details/home_visit.webp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardBoardPopup from "../../Components/CardBoardPopupComponents/CardBoardPopup";
import SpecialOffer from "../../Components/Cart/SpecialOffer/SpecialOffer";
import PrepaidPostpaid from "../../Components/Cart/Prepaid_Postpaid/PrepaidPostpaid";
import PurchaseCoupon from "../../Components/Cart/PurchaseCoupon/PurchaseCoupon";
import ServiceType from "../../Components/Cart/ServiceType/ServiceType";
import Delivery from "../../Components/Cart/ServiceType/Delivery";
import Visit from "../../Components/Cart/ServiceType/Visit";
import CoHelper from "../../Components/Cart/CoHelper/CoHelper";
import { get_discount_coupons, getMemberData, getShopUserData, getUser, post_purchaseOrder } from "../../API/fetchExpressAPI";
import UserBadge from "../../UserBadge";
import CustomSnackbar from "../../Components/CustomSnackbar";
import { clearCart } from "../../store/cartSlice";
import { addCoupon } from "../../store/discountsSlice";

function Cart() {
  const sampleRows = useSelector((state) => state.cart.selectedProducts);
  const [openPopup, setOpenPopup] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shopData, setShopData] = useState();
  const { owner } = useParams();
  const prevServiceRef = useRef(null);
  const [cartData, setCartData] = useState([]); // Stores cart table data
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Stores selected coupon
  const [submittedData, setSubmittedData] = useState(null);
  const token = useSelector((state) => state.auth.userAccessToken);
  const [buyerData, setBuyerData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(false);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleClick = (e, item) => {
    if (item.openPopup) {
      setOpenPopup((prev) => (prev === item.id ? null : item.id));
    } else if (item.title === "Become Member") {
      setTimeout(() => navigate("../grab"), 100);
    }
  };

 useEffect(() => {
    const autoApplyRetailerCoupon = async () => {
      if (selectedCoupon || sampleRows?.length === 0) return;
      try {
        const shopData = await getShopUserData(owner);
        if (shopData?.length > 0) {
          const resp = await get_discount_coupons(shopData[0].shop_no);
          if (resp?.valid) {
            const retailerCategory = resp.data.find(
              (category) => category.discount_category === "retailer"
            );
            if (retailerCategory?.coupons?.length > 0) {
              const defaultCoupon = retailerCategory.coupons.find(
                (c) => c.coupon_type === "retailer_upto"
              ) || retailerCategory.coupons[0]; // fallback
              
              if (defaultCoupon) {
                dispatch(addCoupon(defaultCoupon));
              }
            }
          }
        }
      } catch (err) {
        console.error("Error auto-applying retailer coupon", err);
      }
    };

    autoApplyRetailerCoupon();
  }, [dispatch, selectedCoupon, sampleRows]);

  useEffect(() => {
    const fetchData = async () => {
      if (owner) {
        try {
            const resp = await getShopUserData(owner);
            setShopData(resp?.[0]);
            console.log(resp?.[0]);
            
        } catch (e) {
          setShopData(null);
        }
      }
    };
    fetchData();
  }, [owner]);

  const offers = [
    {
      id: 1,
      title: "Special Offers",
      popupContent: <SpecialOffer setSubmittedData={setSubmittedData} />,
      cName: "special_offer_popup",
      openPopup: true,
    },
    {
      id: 2,
      title: "Co-helpers",
      popupContent: <CoHelper />,
      cName: "co_helper_popup",
      openPopup: true,
    },
    {
      id: 3,
      title: "Prepaid / Postpaid",
      popupContent: <PrepaidPostpaid />,
      cName: "prepaid_postpaid_offer_popup",
      openPopup: true,
    },
    {
      id: 4,
      title: "Purchase coupons",
      popupContent: <PurchaseCoupon />,
      cName: "purchase_coupon_offer_popup",
      openPopup: true,
    },
    { id: 5, title: "Become Member", openPopup: false },
  ];

  const service_type = [
    {
      id: 3,
      imgSrc: pickup,
      service: "Pickup",
      popupContent: <ServiceType />,
      cName: "service_type_popup",
    },
    {
      id: 1,
      imgSrc: delivery,
      service: "Delivery",
      popupContent: <Delivery />,
      cName: "service_type_popup delivery",
    },
    {
      id: 2,
      imgSrc: home_visit,
      service: "Home Visit",
      popupContent: <Visit />,
      cName: "service_type_popup delivery visit",
    },
  ];

  const [selectedServices, setSelectedServices] = useState();
  const [openServicePopup, setOpenServicePopup] = useState(null);

  const handleServiceTypeClick = (e, item) => {
    const target = e.target.closest(".service");
  
    setSelectedServices((prev) => {
      if (prev) {
        // If there was a previous selection, remove the class
        if (prevServiceRef.current) {
          prevServiceRef.current.classList.remove("increase_scale");
        }
      }
      return item.id;
    });
  
    // Add class to new selection
    target.classList.add("increase_scale");
  
    // Store the new selected element in ref
    prevServiceRef.current = target;
  
    setOpenServicePopup(item.id);
  };

  console.log(cartData);
  
  

  const handle_QR_Code_Click = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let sellerDataFetched = null;
      let buyerDataFetched = null;
  
      if (owner) {
        const resp = await getShopUserData(owner);
        if (resp?.length > 0) {
          sellerDataFetched = resp[0]; // Use local variable instead of setState immediately
          setSellerData(resp[0]); // Still update state for UI purposes
        }
      }
  
      if (!token) {
        navigate('../login');
        return;
      }
  
      const get_logged_in_user = await getUser(token);
      if (get_logged_in_user) {
        const memberUser = get_logged_in_user?.find((u)=>u?.member_id !== null);
        const shopUser = get_logged_in_user?.find((u)=>u?.shop_no !== null);
        if (memberUser?.user_type === 'member' || memberUser?.user_type === 'merchant') {
          const memberData = await getMemberData(memberUser?.user_access_token);
          if (memberData.length > 0) {
            buyerDataFetched = memberData[0];
            setBuyerData(memberData[0]);
          }
        } 
        // if (shopUser.user_type === 'shop') {
        //   const shopData = await getShopUserData(shopUser.shop_access_token);
        //   if (shopData.length > 0) {
        //     buyerDataFetched = shopData[0];
        //     setBuyerData(shopData[0]);
        //   }
        // } 
      }

      console.log(buyerDataFetched);
      
  
      // Ensure all necessary data is available
      if (!sellerDataFetched || !buyerDataFetched || !cartData) {
        console.error("Missing data:", { sellerDataFetched, buyerDataFetched, cartData });
        return;
      }
  
      const products = cartData.cart.map((cart) => {
        const unitPrice =
          Number(cart.matched_price) ||
          Number(cart.selling_price) ||
          Number(cart.product_selling_price);

        return {
          id: cart.product_id,
          name: cart.product_name,
          description: cart.product_description,
          quantity: Number(cart.quantity),
          unit_price: unitPrice,
          selectedVariant: cart.selectedVariant,
          total_price: unitPrice * Number(cart.quantity),
        };
      });

  
      const data = {
        buyer_id: buyerDataFetched?.member_id,
        buyer_type: buyerDataFetched.user_type,
        seller_id: sellerDataFetched.shop_no,
        buyer_gst_number: buyerDataFetched.gst || null,
        seller_gst_number: sellerDataFetched.gst || null,
        products,
        subtotal: cartData.subtotal || 0,
        shipping_address: buyerDataFetched.address,
        shipping_method: selectedServices,
        payment_method: 'COD',
        special_offers: submittedData,
        discount_applied: selectedCoupon,
        taxes: null,
        co_helper: null,
        discount_amount: cartData.discount || 0,
        pre_post_paid: null,
        extra_charges: null,
        total_amount: cartData.total || 0,
        date_of_issue: new Date(),
        delivery_terms: null,
        additional_instructions: null,
        coupon_cost : cartData.couponCost,
        buyer_name: buyerDataFetched?.full_name, 
        buyer_contact_no: buyerDataFetched?.phone_no_1 
      };

      console.log('*******************', data);
      console.log(cartData.cart);
      
  
      try {
        if (data) {
          const resp = await post_purchaseOrder(data);
          console.log(resp);
          setSnackbar({
            open: true,
            message: resp.message,
            severity: "success",
          });

          dispatch(clearCart());
  
          setTimeout(() => {
            navigate(`../${resp.po_access_token}/order`);
          }, 2500);
        }
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: error.response?.data?.error || "Error processing order",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box className="cart_wrapper">
      {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box className="row">
        <Box className="col">
          <UserBadge
            handleBadgeBgClick={-1}
            handleLogin="../login"
            handleLogoutClick="../../"
        />
          {/* <Button2 text={"Back"} redirectTo={-1} /> */}
          <Link to={`../${owner}/return`}>
            <Box
              component="img"
              src={po_stamp}
              alt="p.o"
              className="po_stamp"
            />
          </Link>
          <Typography variant="h2" className="heading">
            <Typography variant="span" className="span_1">
              {shopData?.business_name}
            </Typography>
            <Typography variant="span" className="span_1">
              Shop No:
              <Typography variant="span" className="span_2">
                {(shopData?.shop_no)?.split('_')[1]}
              </Typography>
            </Typography>
          </Typography>

          {/* <Link to={`../${owner}/order`}> */}
          <Link onClick={(e)=>handle_QR_Code_Click(e)}>
            <Box
              component="img"
              src={qr_code}
              alt="qr_code"
              className="qr_code"
            />
          </Link>
        </Box>
        <Box className="col">
          <Box className="sub_col"></Box>
          <CartTable rows={sampleRows} setCartData={setCartData} setSelectedCoupon={setSelectedCoupon}/>
          <Box className="sub_col"></Box>
        </Box>
        <Box className="col">
          <UserBadge
                          handleBadgeBgClick={-1}
                          handleLogin="../login"
                          handleLogoutClick="../../"
                      />
          {/* <Button2 text={"Back"} redirectTo={-1} /> */}
          <Box className="offers">
            {offers.map((item) => (
              <React.Fragment key={item.id}>
                <Link
                  className="offers_container"
                  onClick={(e) => handleClick(e, item)}
                >
                  <Box
                    component="img"
                    src={badge_frame}
                    alt="badge_frame"
                    className="badge_frame"
                  />
                  <Typography variant="h3" className="text_2">
                    {item.title}
                  </Typography>
                </Link>
                <CardBoardPopup
                  customPopup={true}
                  open={openPopup === item.id}
                  handleClose={handleClose}
                  body_content={item.popupContent}
                  optionalCName={item.cName}
                />
              </React.Fragment>
            ))}
          </Box>
          <Box className="type_of_service">
            {service_type?.filter((item)=>shopData?.type_of_service?.includes(item?.service))?.map((item) => (
              <Box
                key={item.id}
                onClick={(e) => handleServiceTypeClick(e, item)}
                className={`service`}
              >
                <Box
                  component="img"
                  src={item.imgSrc}
                  alt={item.service}
                  className={`service_type`}
                />
              </Box>
            ))}
            <CardBoardPopup
              customPopup={true}
              open={openServicePopup !== null}
              handleClose={() => setOpenServicePopup(null)}
              body_content={
                service_type.find((s) => s.id === openServicePopup)
                  ?.popupContent
              }
              optionalCName={
                service_type.find((s) => s.id === openServicePopup)?.cName
              }
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
    </Box>
  );
}

export default Cart;
