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

function OrderDetails_tab_content({ title }) {
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]); // Store selected order
  const token = useSelector((state) => state.auth.userAccessToken);
  const [loading, setLoading] = useState(false);
  const [differences, setDifferences] = useState([]);


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
          setSelectedOrder(resp.data);
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
            quantityDiff: poProduct?.quantity !== order.quantity_ordered,
            unitPriceDiff: poProduct?.unit_price !== order.unit_price,
            totalAmountDiff:
              poProduct?.total_price !== order.unit_price * order.quantity_ordered,
          };
        });
      
        setDifferences(diffList);
    }
}, [selectedOrder]);


console.log(differences)

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
                  <Typography className="text">
                    {selectedOrder?.[0]?.po_no}
                  </Typography>
                </Box>
                <Box className="col">
                  <Typography className="heading">Seller Id</Typography>
                  <Link to={`../support/shop/shop-detail/${selectedOrder?.[0]?.shop_access_token}`}>
                    <Typography className="text">
                        {selectedOrder?.[0]?.seller_id}
                    </Typography>
                  </Link>
                </Box>
              </Box>
              {selectedOrder?.map((order) => {
                const difference = differences?.find((diff)=>diff.productId === order.product_id);
                console.log(difference);
                
                return <Box className="col_group">
                  <Box className="col">
                    <Typography className="heading">Product Name</Typography>
                    <Link to={`../shop/${order.shop_access_token}/products/detail/${order.product_id}`}><Typography className="text">
                      {order.product_name ? order.product_name : "-"}
                    </Typography></Link>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Product Variant</Typography>
                    <Typography className={difference?.variantDiff ? "text highlight" : "text"}>
                      {order.selected_variant
                        ? order.selected_variant?.split("_")?.at(10)
                        : "-"}
                    </Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Shipping Method</Typography>
                    <Typography className="text">
                      {order.service || "-"}
                    </Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">No. of units</Typography>
                    <Typography className={difference?.quantityDiff ? "text highlight" : "text"}>
                      {order.quantity_ordered}
                    </Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Units price</Typography>
                    <Typography className={difference?.unitPriceDiff ? "text highlight" : "text"}>{order.unit_price}</Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Total Amount</Typography>
                    <Typography className={difference?.totalAmountDiff ? "text highlight" : "text"}>
                      {order.unit_price * order.quantity_ordered}
                    </Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">GST</Typography>
                    <Typography className="text">
                      {order.buyer_gst_number || "-"}
                    </Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Discount</Typography>
                    <Typography className="text">
                      {order.discount_amount}
                    </Typography>
                  </Box>

                  <Box className="col">
                    <Typography className="heading">Services</Typography>
                    <Typography className="text">COD</Typography>
                  </Box>
                  <Box className="col">
                    <Typography className="heading">Status</Typography>
                    {order.so_subtotal && order.status !== 'Deny' ? (
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
                <Typography className="heading">Grand Total</Typography>
                <Typography className="text">
                  {selectedOrder?.[0].so_subtotal ||
                    selectedOrder?.[0].po_subtotal}
                </Typography>
              </Box>
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
    </Box>
  );
}

export default OrderDetails_tab_content;
