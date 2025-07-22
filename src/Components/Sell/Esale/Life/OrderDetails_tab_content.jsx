import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import {
  get_allPurchaseOrderDetails,
  get_buyer_data,
  get_purchased_products_details,
  get_purchaseOrderDetails,
  get_purchaseOrders,
  get_seller_data,
  getUser,
  post_createFundAccount,
  post_invoiceOrder,
  post_payoutToShopkeeper,
} from "../../../../API/fetchExpressAPI";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../../ConfirmationDialog";
import InvoicePopup from "../../../Invoice/InvoicePopup";
import CustomSnackbar from "../../../CustomSnackbar";
import { HandleRazorpayPayment } from "../../../../API/HandleRazorpayPayment";

function OrderDetails_tab_content({ title }) {
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]); // Store selected order
  const token = useSelector((state) => state.auth.userAccessToken);
  const [loading, setLoading] = useState(false);
  const [differences, setDifferences] = useState([]);
  const [saleOrderStatus, setSaleOrderStatus] = useState("");
  const [openDialog, setOpenDialog] = useState({ open: false, status: "" }); // State for dialog
  const [openInvoice, setOpenInvoice] = useState(false);
  const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
      });

  const [invoiceNo, setInvoiceNo] = useState('');

  const fetchPurchasedOrder = async (buyer_id) => {
    try {
      setLoading(true);
      const resp = await get_allPurchaseOrderDetails(buyer_id);
      
      if (resp.valid) {
        setLoading(true);
        const filteredOrders = resp.data.filter(order => order.sale_order_status !== null);
        console.log(filteredOrders);
        setPurchasedOrders(filteredOrders);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const fetchUserType = async () => {
        try {
          setLoading(true);
          const userData = (await getUser(token))?.find((u)=>u.member_id !== null);

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
  }, [token]);

  const fetchPurchasedOrderDetails = async (po_no) => {
    if (po_no) {
      try {
        setLoading(true);
        const resp = await get_purchaseOrders(po_no);
        if (resp.valid) {
          const ordersWithOriginalStatus = resp.data.map((order) => ({
            ...order,
            originalStatus: order.status,
          }));
          setSelectedOrder(ordersWithOriginalStatus);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedOrder) {
      fetchPurchasedOrderDetails(selectedOrder.po_no);
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (selectedOrder.length > 0) {
      const diffList = selectedOrder?.map((order) => {
        const poProduct = order.po_products?.find(
          (po) =>
            po.id === order.product_id ||
            po.selectedVariant === order.selected_variant
        );

        return {
          productId: order.product_id,
          variantDiff: poProduct?.selectedVariant !== order.selected_variant,
          quantityDiff: poProduct?.quantity != order.quantity_ordered,
          unitPriceDiff: poProduct?.unit_price != order.unit_price,
          totalAmountDiff:
            poProduct?.total_price != order.unit_price * order.quantity_ordered,
        };
      });

      setDifferences(diffList);
    }
  }, [selectedOrder]);

 const handleConfirm = async () => {
  const status = openDialog.status;
  setSaleOrderStatus(status);
  setOpenDialog({ open: false, status });

  if (status === "Accept" || status === "Deny") {
    try{
      setLoading(true);
const buyerResponse = await get_buyer_data(selectedOrder?.[0]?.buyer_id);
    const buyerData = buyerResponse?.data?.[0];
    console.log(buyerData);

    const sellerResponse = await get_seller_data(selectedOrder?.[0]?.seller_id);
    const sellerData = sellerResponse?.data?.[0];
    console.log(sellerData);

    const purchasedProducts = (
  await Promise.all(
    selectedOrder?.map(async (order) => {
      if (order.originalStatus === 'Deny') return [];

      const purchasedProductsData = await get_purchased_products_details(
        order?.product_id,
        order?.selected_variant
      );

      console.log(purchasedProductsData?.data);

      if (
        purchasedProductsData?.valid &&
        Array.isArray(purchasedProductsData?.data)
      ) {
        return purchasedProductsData.data.map((prodDetail) => ({
          product_id: order?.product_id,
          item_id: order?.selected_variant,
          category_id: prodDetail?.category_id,
          category_name: prodDetail?.category_name,
          product_name: order?.product_name || prodDetail?.product_name,
          brand: prodDetail?.brand,
          variation: order?.product_name?.split(" - ")?.[1] || null,
          quantity: order?.quantity_ordered || 1,
          unit_price: order?.unit_price,
          specifications: {
            specification_1: prodDetail?.specification_1,
            specification_2: prodDetail?.specification_2,
            specification_3: prodDetail?.specification_3,
            specification_4: prodDetail?.specification_4,
          },
          product_dimension_width: prodDetail?.product_dimensions_width_in_cm,
          product_dimension_height: prodDetail?.product_dimensions_height_in_cm,
          product_dimension_breadth: prodDetail?.product_dimensions_breadth_in_cm,
          dimensions_units: "cm",
          total_area_of_item: prodDetail?.item_area,
          total_weight_of_item: prodDetail?.weight_of_item,
          weight: prodDetail?.weight_of_item,
          mass_units: "kg",
          product_status: order?.status || "Unknown",
        }));
      }

      return [];
    })
  )
).flat();


    console.log(purchasedProducts);

    const subtotal = purchasedProducts.reduce((acc, item) => {
      if (item.product_status === 'Accept') {
        return acc + (item.unit_price || 0) * (item.quantity_ordered || 1);
      }
      return acc;
    }, 0);

    const data = {
      po_no: selectedOrder?.[0]?.po_no,
      so_no: selectedOrder?.[0]?.so_no,
      seller_id: selectedOrder?.[0]?.seller_id,
      seller_name: sellerData?.poc_name,
      domain_id: sellerData?.domain_id,
      domain_name: sellerData?.domain_name,
      sector_id: sellerData?.sector_id,
      sector_name: sellerData?.sector_name,
      shop_name: sellerData?.business_name,
      shop_location: JSON.stringify({
        latitude: sellerData?.latitude,
        longitude: sellerData?.longitude,
      }),
      shop_address: sellerData?.address,
      shop_city: sellerData?.address.includes("Amritsar") ? "Amritsar" : "Asr",
      shop_contact: JSON.stringify([
        sellerData?.phone_no_1,
        sellerData?.phone_no_2,
      ]),
      shop_email: sellerData?.username,
      products: JSON.stringify(purchasedProducts),
      subtotal,
      discount_applied: selectedOrder?.[0]?.discount_applied,
      discount_amount: selectedOrder?.[0]?.total_discount_amount,
      tax_applied: selectedOrder?.[0]?.taxes,
      total_amount: selectedOrder?.[0]?.total_amount,
      order_status: status,
      payment_status:
        status === "Accept" ? "Paid" : status === "Hold" ? "Hold" : "B.O",
      hold: null,
      paid: null,
      b_o: null,
      transaction_no: null,
      payment_mode: selectedOrder?.[0]?.payment_method,
      business_order: null,
      location_of_store: null,
      seller_gst: sellerData?.gst,
      seller_msme: sellerData?.msme,
      seller_pan: sellerData?.pan_no,
      seller_cin: sellerData?.cin_no,
      gcst_paid: null,
      gsct_paid: null,
      payment_gateway_integrations_razor_pay_fees: null,
      date_and_time: new Date(),
      buyer_payment_location: JSON.stringify({
        latitude: buyerData?.latitude,
        longitude: buyerData?.longitude,
      }),
      return_refund_deny_policy: null,
      buyer_name: buyerData?.full_name,
      buyer_id: selectedOrder?.[0]?.buyer_id,
      buyer_address: buyerData?.address,
      buyer_location: JSON.stringify({
        latitude: buyerData?.latitude,
        longitude: buyerData?.longitude,
      }),
      buyer_contact_no: buyerData?.phone_no_1,
      buyer_email: buyerData?.username,
      payment_type: selectedOrder?.[0]?.payment_method,
      payment_details: null,
      crm_no: null,
      share_invoice_services: null,
      co_helper: null,
      prepaid_postpaid: null,
      delivery_order: null,
      download_pdf: null,
      qr_code: null,
      buyer_special_note: null,
      emall_special_note: null,
    };

    console.log(data);
    


    
      if(status === 'Accept'){
       
        const totalAmount = selectedOrder?.[0].total_amount || 0;
        console.log(totalAmount);
        try {
          // 1. Razorpay Checkout
          const paymentResp = await HandleRazorpayPayment({
            amount: totalAmount,
            buyerDetails: {
              buyer_name: buyerData?.full_name,
              buyer_contact_no: buyerData?.phone_no_1,
              buyer_email: buyerData?.username,
            },
          });

          console.log("Payment response:", paymentResp);
          

          if (paymentResp?.razorpay_payment_id) {
            // 2. Create Fund Account for Shopkeeper
            const fundAccountResp = await post_createFundAccount({
              name: sellerData?.poc_name,
              contact: sellerData?.phone_no_1,
              email: sellerData?.username,
              upi_id: sellerData?.upi_id
            })
            console.log(fundAccountResp);
            
            const fundAccountId = fundAccountResp.fundAccountId;
            console.log("Fund Account created:", fundAccountId);

            // 3. Trigger Payout
            const payoutResp = await post_payoutToShopkeeper({
              fund_account_id: fundAccountId,
              amount: totalAmount,
            });

            console.log("Payout response:", payoutResp.data);
            setSnackbar({
              open: true,
              message: "Payout to shopkeeper successful!",
              severity: "success",
            });

            const invoiceResp = await post_invoiceOrder(data);
              if(invoiceResp.message){
                console.log(invoiceResp.message);
                setSnackbar({
                  open: true,
                  message: invoiceResp.message,
                  severity: "success",
                });
                setInvoiceNo(invoiceResp?.invoice_no);
                setTimeout(()=>{
                  setOpenInvoice(true);
                }, 1500);
              }
          } else {
            setSnackbar({
              open: true,
              message: "Payment failed or was cancelled",
              severity: "success",
            });
          }
        } catch (error) {
          console.error("Error in payment/payout:", error);
          setSnackbar({
              open: true,
              message: "Error during transaction",
              severity: "success",
            });
        }finally{
          setLoading(false);
        }
        setLoading(false);
      }
    // }
    }catch(e){
      console.error(e);
    }finally{
      setLoading(false);
    }
    
  }
};


  console.log('--------------selectedOrder', selectedOrder);
  

  return (
    <Box className="tab_content">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      {selectedOrder.length > 0 ? (
        <Typography
          sx={{ cursor: "pointer" }}
          className="title"
          onClick={() => setSelectedOrder([])}
        >
          {title}
        </Typography>
      ) : (
        <Typography className="title">{title}</Typography>
      )}
      <Box className="content">
        {/* If an order is selected, show its details */}
        {selectedOrder.length > 0 ? (
          <>
            <Box className="order_details_info">
              <Box className="col_group">
                <Box className="col">
                  <Typography className="heading">Order Id</Typography>
                  <Link
                    to={`../esale/life/${selectedOrder?.[0]?.shop_access_token}/purchased-cart/${encodeURIComponent(selectedOrder?.[0]?.po_no)}`}
                  >
                    <i>
                      <Typography className="text shadow">
                        {selectedOrder?.[0]?.po_no}
                      </Typography>
                    </i>
                  </Link>
                </Box>
                <Box className="col">
                  <Typography className="heading">Seller Id</Typography>
                  <Link
                    to={`../support/shop/shop-detail/${selectedOrder?.[0]?.shop_access_token}`}
                  >
                    <i>
                      <Typography className="text shadow">
                        {selectedOrder?.[0]?.seller_id}
                      </Typography>
                    </i>
                  </Link>
                </Box>
                <Divider />
              </Box>
              {selectedOrder?.map((order, index) => {
                const difference = differences?.find(
                  (diff) => diff.productId === order.product_id
                );

                return (
                  <Box className="col_group" key={index}>
                    <Box className="col">
                      <Typography className="heading">Product Name</Typography>
                      <Link
                        to={`../shop/${order.shop_access_token}/products/detail/${order.product_id}`}
                      >
                        <i>
                          <Typography className="text shadow">
                            {order.product_name ? order.product_name : "-"}
                          </Typography>
                        </i>
                      </Link>
                    </Box>
                    <Box className="col">
                      <Typography className="heading">
                        Product Variant
                      </Typography>
                      <Typography
                        className={
                          difference?.variantDiff ? "text highlight" : "text"
                        }
                      >
                        {order.selected_variant
                          ? order.selected_variant?.split("_")?.at(10)
                          : "-"}
                      </Typography>
                    </Box>
                    {/* <Box className="col">
                    <Typography className="heading">Shipping Method</Typography>
                    <Typography className="text">
                      {order.service || "-"}
                    </Typography>
                  </Box> */}
                    <Box className="col">
                      <Typography className="heading">No. of units</Typography>
                      <Typography
                        className={
                          difference?.quantityDiff ? "text highlight" : "text"
                        }
                      >
                        {order.quantity_ordered}
                      </Typography>
                    </Box>
                    <Box className="col">
                      <Typography className="heading">Units price</Typography>
                      <Typography
                        className={
                          difference?.unitPriceDiff ? "text highlight" : "text"
                        }
                      >
                        &#8377; {order.unit_price}
                      </Typography>
                    </Box>
                    <Box className="col">
                      <Typography className="heading">Total Amount</Typography>
                      <Typography
                        className={
                          difference?.totalAmountDiff
                            ? "text highlight"
                            : "text"
                        }
                      >
                        &#8377; {order.total_price}
                      </Typography>
                    </Box>

                    <Box className="col">
                      <Typography className="heading">Status</Typography>
                      {order.so_subtotal &&
                      saleOrderStatus == "" &&
                      (order.originalStatus !== "Deny" ||
                        order.status !== "Deny") ? (
                        <Select
                          size="small"
                          value={order.status || ""}
                          onChange={(e) => {
                            const updatedOrders = selectedOrder.map((o) =>
                              o.product_id === order.product_id
                                ? { ...o, status: e.target.value }
                                : o
                            );
                            setSelectedOrder(updatedOrders);
                          }}
                          displayEmpty
                          className="input_field"
                        >
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="Accept">Accept</MenuItem>
                          <MenuItem value="Deny">Deny</MenuItem>
                          <MenuItem value="Hold">Hold</MenuItem>
                        </Select>
                      ) : (
                        <Typography className="text">
                          {order.status || "Pending"}
                        </Typography>
                      )}
                    </Box>

                    <Divider />
                  </Box>
                );
              })}

              <Box className="col">
                <Typography className="heading">Services</Typography>
                <Typography className="text">COD</Typography>
              </Box>

              <Box className="col">
                <Typography className="heading">subtotal</Typography>
                <Typography className="text">
                  &#8377;{" "}
                  {selectedOrder?.[0].so_subtotal ||
                    selectedOrder?.[0].po_subtotal}
                </Typography>
              </Box>

              <Box className="col">
                <Typography className="heading">GST</Typography>
                <Typography className="text">
                  {selectedOrder?.[0].buyer_gst_number || "-"}
                </Typography>
              </Box>

              {selectedOrder?.[0].discount_amount &&
                selectedOrder?.[0].discount_amount !== 0.0 &&
                selectedOrder?.[0].discount_amount !== "" && (
                  <Box className="col">
                    <Typography className="heading">Discount</Typography>
                    <Typography className="text">
                      - &#8377; {selectedOrder?.[0].total_discount_amount}
                    </Typography>
                  </Box>
                )}

              {selectedOrder?.[0].coupon_cost && (
                <Box className="col">
                  <Typography className="heading">Coupon Cost</Typography>
                  <Typography className="text">
                    &#8377; {selectedOrder?.[0].coupon_cost}
                  </Typography>
                </Box>
              )}

              <Box className="col">
                <Typography className="heading">Grand Total</Typography>
                <Typography className="text total shadow">
                  &#8377;{" "}
                  {(() => {
                      if (saleOrderStatus === "Deny") return "0.00";

                      const filteredProducts = selectedOrder?.filter(
                        product => product.status === "Accept" || product.status === "Hold"
                      ) || [];
                      console.log(filteredProducts);
                      

                      const productTotal = filteredProducts
                        .map(product =>
                          (Number(product.unit_price || 0) * Number(product.quantity_ordered || 0)))
                        .reduce((acc, curr) => acc + curr, 0);

                      const couponCost = Number(selectedOrder?.[0]?.coupon_cost || 0);

                      const grandTotal = productTotal > 0
                        ? productTotal - parseFloat(selectedOrder?.[0]?.total_discount_amount) + (couponCost > 0 ? couponCost : 0)
                        : 0;

                      return grandTotal.toFixed(2);
                    })()}
                </Typography>
              </Box>
              {selectedOrder?.[0].so_subtotal && (
                <Box className="col">
                  <Typography className="heading">Sale Order Status</Typography>
                  <Typography className="heading">{selectedOrder?.[0].sale_order_status}</Typography>
                  {/* <Select
                    size="small"
                    value={saleOrderStatus}
                    onChange={(e) => {
                      setOpenDialog({ open: true, status: e.target.value });
                    }}
                    displayEmpty
                    className="input_field"
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="Accept">Accept</MenuItem>
                    <MenuItem value="Deny">Deny</MenuItem>
                    <MenuItem value="Hold">Hold</MenuItem>
                  </Select> */}
                </Box>
              )}
            </Box>
          </>
        ) : (
          /* Show order list when no order is selected */
          purchasedOrders?.length > 0 ? purchasedOrders.map((order, index) => (
            <Box
              key={index}
              className="card"
              onClick={() => setSelectedOrder(order)}
            >
              <Box className="col icon">
                <ShoppingBagIcon />
              </Box>
              <Box className="col order_details">
                <Typography className="heading">{order.po_no}</Typography>
                <Typography className="text">{order.payment_method}</Typography>
                <Typography className="text">{order.total_amount}</Typography>
                <Typography className="text">
                  {order.shipping_method}
                </Typography>
              </Box>
              <Box className="col status">
                <Typography className="text">
                  {order.sale_order_status === "Accept"
                    ? "Accepted"
                    : order.sale_order_status === "Deny"
                    ? "Denied"
                    : order.sale_order_status || "Hold"}
                </Typography>
              </Box>
            </Box>
          ))
          : 
          <Box className="no_order">
            <Typography className="text">No Order exists.</Typography>
          </Box>
        )}
      </Box>
      <ConfirmationDialog
        open={openDialog.open}
        onClose={() => setOpenDialog(false)}
        onConfirm={(e) => handleConfirm()}
        title="Confirm Sale Order"
        message={`Are you sure you want to ${openDialog.status} this order?`}
        optionalCname="logoutDialog"
        confirmBtnText={openDialog.status === 'Accept' ? "Make Payment" : 'Confirm'}
      />
      <InvoicePopup
        open={openInvoice}
        onClose={() => setOpenInvoice(false)}
        serviceType={openDialog.status}
        invoiceNo={invoiceNo}
      />
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}

export default OrderDetails_tab_content;
