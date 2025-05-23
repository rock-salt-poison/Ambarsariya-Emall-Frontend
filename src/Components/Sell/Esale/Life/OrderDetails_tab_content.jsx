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
  get_purchaseOrderDetails,
  get_purchaseOrders,
  getUser,
} from "../../../../API/fetchExpressAPI";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../../ConfirmationDialog";

function OrderDetails_tab_content({ title }) {
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]); // Store selected order
  const token = useSelector((state) => state.auth.userAccessToken);
  const [loading, setLoading] = useState(false);
  const [differences, setDifferences] = useState([]);
  const [saleOrderStatus, setSaleOrderStatus] = useState('');
  const [openDialog, setOpenDialog] = useState({open : false, status : ''}); // State for dialog


  const fetchPurchasedOrder = async (buyer_id) => {
    try {
      setLoading(true);
      const resp = await get_allPurchaseOrderDetails(buyer_id);
      if (resp.valid) {
        setPurchasedOrders(resp.data);
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
          const userData = (await getUser(token))?.[0];

          if (userData.user_type === "member") {
            fetchPurchasedOrder(userData.user_id);
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
          const ordersWithOriginalStatus = resp.data.map(order => ({
            ...order,
            originalStatus: order.status
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

  console.log(selectedOrder);
  console.log(purchasedOrders);

  useEffect(() => {
    if(selectedOrder.length>0){
        const diffList = selectedOrder?.map(order => {
          const poProduct = order.po_products?.find(po =>
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


console.log(differences);

const handleConfirm = async () => { 
  setSaleOrderStatus(openDialog.status);
  setOpenDialog(false);
}

console.log(saleOrderStatus);
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
                  <Typography className="heading">Order Details</Typography>
                  <Link to={`../esale/life/${selectedOrder?.[0]?.shop_access_token}/purchased-cart/${selectedOrder?.[0]?.po_no}`}>
                    <i>
                        <Typography className="text shadow">
                            {selectedOrder?.[0]?.po_no}
                        </Typography>
                    </i>
                  </Link>
                </Box>
                <Box className="col">
                  <Typography className="heading">Seller Id</Typography>
                  <Link to={`../support/shop/shop-detail/${selectedOrder?.[0]?.shop_access_token}`}>
                    <i>
                        <Typography className="text shadow">
                            {selectedOrder?.[0]?.seller_id}
                        </Typography>
                    </i>
                  </Link>
                </Box>
                <Divider />
              </Box>
              {selectedOrder?.map((order) => {
                const difference = differences?.find((diff)=>diff.productId === order.product_id);
                console.log(difference);
                
                return <Box className="col_group">
                  <Box className="col">
                    <Typography className="heading">Product Name</Typography>
                    <Link to={`../shop/${order.shop_access_token}/products/detail/${order.product_id}`}><i><Typography className="text shadow">
                      {order.product_name ? order.product_name : "-"}
                    </Typography></i></Link>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Product Variant</Typography>
                    <Typography className={difference?.variantDiff ? "text highlight" : "text"}>
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
                    <Typography className={difference?.quantityDiff ? "text highlight" : "text"}>
                      {order.quantity_ordered}
                    </Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Units price</Typography>
                    <Typography className={difference?.unitPriceDiff ? "text highlight" : "text"}>&#8377; {order.unit_price}</Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Total Amount</Typography>
                    <Typography className={difference?.totalAmountDiff ? "text highlight" : "text"}>
                      &#8377; {(order.total_price)}
                    </Typography>
                  </Box>
                  
                  <Box className="col">
                    <Typography className="heading">Status</Typography>
                    {order.so_subtotal && (saleOrderStatus == '' ) && (order.originalStatus !== 'Deny' || order.status !== 'Deny') ? (
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
            })}

            <Box className="col">
              <Typography className="heading">Services</Typography>
              <Typography className="text">COD</Typography>
            </Box>

            <Box className="col">
              <Typography className="heading">subtotal</Typography>
              <Typography className="text">
                &#8377; {selectedOrder?.[0].so_subtotal || selectedOrder?.[0].po_subtotal}
              </Typography>
            </Box>

            <Box className="col">
              <Typography className="heading">GST</Typography>
              <Typography className="text">
                {selectedOrder?.[0].buyer_gst_number || "-"}
              </Typography>
            </Box>

           {selectedOrder?.[0].discount_amount && selectedOrder?.[0].discount_amount !== 0.00 && selectedOrder?.[0].discount_amount !== "" && <Box className="col">
              <Typography className="heading">Discount</Typography>
              <Typography className="text">
                - &#8377; {selectedOrder?.[0].total_discount_amount}
              </Typography>
            </Box>}

            {selectedOrder?.[0].coupon_cost && <Box className="col">
              <Typography className="heading">Coupon Cost</Typography>
              <Typography className="text">
                 &#8377; {selectedOrder?.[0].coupon_cost}
              </Typography>
            </Box>}

              <Box className="col">
                <Typography className="heading">Grand Total</Typography>
                <Typography className="text total shadow">
                  &#8377; {selectedOrder?.[0].so_subtotal ? ((selectedOrder?.[0].so_subtotal)-(selectedOrder?.[0].total_discount_amount)+ selectedOrder?.[0].coupon_cost) :
                    (Number(selectedOrder?.[0]?.po_subtotal)-(selectedOrder?.[0].total_discount_amount)+ selectedOrder?.[0].coupon_cost)}
                </Typography>
              </Box>
                    {selectedOrder?.[0].so_subtotal && (
            <Box className="col">
                    <Typography className="heading">Sale Order Status</Typography>
                      <Select
                        size="small"
                        value={saleOrderStatus }
                        onChange={(e) => {
                          setOpenDialog({open: true, status:e.target.value})
                          }}
                        displayEmpty
                        className="input_field"
                      >
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="Accept">Accept</MenuItem>
                        <MenuItem value="Deny">Deny</MenuItem>
                        <MenuItem value="Hold">Hold</MenuItem>
                      </Select>
                  </Box>
                    ) }
            </Box>
          </>
        ) : (
          /* Show order list when no order is selected */
          purchasedOrders.map((order, index) => (
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
                  {order.status === "Accept"
                    ? "Accepted"
                    : order.status === "Deny"
                    ? "Denied"
                    : order.status || "Hold"}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
      <ConfirmationDialog
              open={openDialog.open}
              onClose={() => setOpenDialog(false)}
              onConfirm={(e)=>handleConfirm()}
              title="Confirm Sale Order"
              message={`Are you sure you want to ${openDialog.status} this order?`}
              optionalCname="logoutDialog"
            />
    </Box>
  );
}

export default OrderDetails_tab_content;
