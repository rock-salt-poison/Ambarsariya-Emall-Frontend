import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  get_product_variants,
  get_products,
  get_purchaseOrderNo,
  get_purchaseOrders,
  post_saleOrder,
} from "../../../../API/fetchExpressAPI";
import ReactThreeToggle from "react-three-toggle";
import CustomSnackbar from "../../../../Components/CustomSnackbar";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function DashboardComponents({ data, date }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [selectedPO, setSelectedPO] = useState([]);
  const { token } = useParams();
  const [toggleStates, setToggleStates] = useState({});
  const [editedValues, setEditedValues] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const card_data = [
    { id: 1, heading: "Today's Sale Orders", value: "-" },
    { id: 2, heading: "Today's Subscriptions Orders", value: "-" },
    { id: 3, heading: "Today's Counter Orders", value: "-" },
    { id: 4, heading: "Today's Completed Orders", value: "-" },
    { id: 5, heading: "Today's Pending Orders", value: "-" },
    { id: 6, heading: "Today's Total Sale", value: "1249" },
    { id: 7, heading: "P.O. Number", value: "1249", slider:true },
    { id: 8, heading: "S.O. Number", value: "1249" },
  ];

 

  
  const fetch_po_no = async (shop_no, date) => {
    try {
      setLoading(true);
      if (shop_no && date) {
        const selectedDate = date?.replace(/\//g, '-');
        console.log(selectedDate); 
        const resp = await get_purchaseOrderNo(shop_no, selectedDate);
        if (resp.valid) {
          setPurchasedOrders(resp.data);
        }
      }
    } catch (e) {
      console.log(e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };


  const fetch_products = async (po_no) => {
    try {
      setLoading(true);
      if (po_no) {
        const resp = await get_purchaseOrders(po_no);
        if (resp.valid) {
          setProducts(resp.data);
        }
      }
    } catch (e) {
      console.log(e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetch_product_variants = async (shop_no, variant_group) => {
    if (shop_no && variant_group) {
      try {
        const resp = await get_product_variants(shop_no, variant_group);
        if (resp.valid) {
          setProductVariants(resp.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  

  useEffect(() => {
    if (data && date) {
      fetch_po_no(data.shop_no, date);
    }
  }, [data, date]);


  console.log(selectedPO);
  
  useEffect(() => {
    if (selectedPO) {
      fetch_products(selectedPO);
    }
  }, [selectedPO]);

  useEffect(() => {
    if (products.length > 0) {
      const initialStates = {};
      products.forEach((product, index) => {
        initialStates[index] = product.status || "Hold"; // Default selection as "hold"
      });
      setToggleStates(initialStates);
    }
  }, [products]);

  const handleToggleChange = async (index, newValue) => {
    if (newValue !== null) {
      setToggleStates((prevState) => ({ ...prevState, [index]: newValue }));
      console.log(`Row ${index + 1} selected:`, newValue);

      if (newValue === "Accept" || newValue === "Deny") {
        const selectedProduct = products[index];
        console.log(selectedProduct);

        // Prepare sale order data
        const saleOrderData = {
          po_no: selectedProduct.po_no,
          buyer_id: selectedProduct.buyer_id,
          buyer_type: selectedProduct.buyer_type,
          order_date: new Date(),
          product_id: selectedProduct.product_no,
          quantity: selectedProduct.quantity_ordered,
          unit_price: selectedProduct.unit_price,
          line_total_no_of_items: selectedProduct.quantity_ordered,
          subtotal: selectedProduct.total_price,
          taxes: selectedProduct.taxes || 0, // Update if applicable
          discounts: selectedProduct.discount_amount,
          shipping_method: selectedProduct.shipping_method, // Adjust as needed
          shipping_charges: 0, // Adjust if applicable
          expected_delivery_date: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ), // 7 days from now
          co_helper: null,
          subscription_type: selectedProduct.special_offers,
          payment_terms: null,
          total_payment_with_all_services: null,
          payment_method: selectedProduct.payment_method,
          payment_due_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
          prepaid: selectedProduct.pre_post_paid,
          postpaid: selectedProduct.pre_post_paid,
          balance_credit: null,
          balance_credit_due_date: null,
          after_due_date_surcharges_per_day: null,
          accept_or_deny: newValue,
          send_qr_upi_bank_details: true,
        };

        try {
          setLoading(true);
          const resp = await post_saleOrder(saleOrderData);
          console.log(resp);
          setSnackbar({
            open: true,
            message: resp.message,
            severity: "success",
          });
        } catch (error) {
          console.error("API error:", error);
          setSnackbar({
            open: true,
            message: error.response?.data?.error || "Error processing order",
            severity: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleInputChange = (index, field, value) => {
    setEditedValues((prevState) => {
      const updatedValues = {
        ...prevState,
        [index]: { ...prevState[index], [field]: value },
      };

      // Update product in state
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        return updatedProducts;
      });

      return updatedValues;
    });
  };

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
            return card.slider ? (
              <Box className='card w-6'>
                  <Typography className="heading">{card.heading}</Typography>
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    // loop={true}
                    // autoplay={{
                    //   delay: 400,
                    //   disableOnInteraction: false,
                    // }}
                    // speed={2000}
                    pagination={{
                      clickable: true,
                    }}
                    onSlideChange={(swiper) => {
                      const poNumber = purchasedOrders[swiper.activeIndex]?.po_no; // Safely access po_no
                      setSelectedPO(poNumber);
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {purchasedOrders.map((order, index)=> (
                      <SwiperSlide key={index}>
                        <Typography className="number">{order.po_no.split('_')[2]}</Typography>
                      </SwiperSlide>
                    )) }
                    </Swiper>
              </Box>
            ):(
              <Box className="card" key={card.id}>
                <Typography className="heading">{card.heading}</Typography>
                <Typography className="number">{card.value}</Typography>
              </Box>
            )
            
          })}
        </Box>
      </Box>
      <Box className="col">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>
                Quantity
                <Typography component="span">(in stock)</Typography>
              </TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>
                Price
                <Typography component="span">(After discount)</Typography>
              </TableCell>
              <TableCell>P.O Sale</TableCell>
              {/* <TableCell>Total Price</TableCell>
                                <TableCell>List of services applied</TableCell>
                                <TableCell>Final S.O.</TableCell>
                                <TableCell>Payment status</TableCell>
                                <TableCell>Final status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => {
              const isHold = toggleStates[index] === "Hold";
              // fetch_product_variants(row.seller_id, row.variant_group);
              return (
                <TableRow key={row.product_id} hover>
                  <TableCell>{index + 1}</TableCell>

                  {/* Product Name Column - Dropdown if on Hold */}
                  <TableCell>
                    {isHold ? (
                      <Select
                        value={
                          row.product_name ||
                          editedValues[index] ||
                          editedValues[index]?.product_name
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "product_name",
                            e.target.value
                          )
                        }
                        fullWidth
                      >
                        <MenuItem value={row.product_name}>
                          {row.product_name}
                        </MenuItem>
                        {row.variations?.map((p) => (
                          <MenuItem value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    ) : (
                      row.product_name
                    )}
                  </TableCell>

                  {/* Quantity Column - Input if on Hold */}
                  <TableCell width="45px">
                    {isHold ? (
                      <TextField
                        type="number"
                        value={
                          editedValues[index]?.quantity_ordered ||
                          row.quantity_ordered
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "quantity_ordered",
                            e.target.value
                          )
                        }
                        inputProps={{ min: 1 }}
                      />
                    ) : (
                      row.quantity_ordered
                    )}
                  </TableCell>

                  <TableCell>
                    {row.quantity_in_stock}
                  </TableCell>
                  <TableCell width="100px">
                    {isHold ? (
                      <TextField
                        type="number"
                        value={
                          editedValues[index]?.unit_price || row.unit_price
                        }
                        onChange={(e) =>
                          handleInputChange(index, "unit_price", e.target.value)
                        }
                        inputProps={{ min: 1 }}
                        InputProps={{
                          min: 1,
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="adornmentText"
                            >
                              ₹
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      `₹ ${row.unit_price}`
                    )}{" "}
                  </TableCell>
                  <TableCell>₹ {row.total_price}</TableCell>
                  <TableCell>
                    ₹ {row.total_price - row.discount_amount}
                  </TableCell>

                  {/* Toggle Button Group */}
                  <TableCell>
                    <ToggleButtonGroup
                      value={row.status || toggleStates[index] || "Hold"}
                      exclusive
                      onChange={(event, newValue) =>
                        handleToggleChange(index, newValue)
                      }
                    >
                      <ToggleButton
                        value="Deny"
                        className="toggle"
                        disabled={toggleStates[index] === "Accept"}
                      >
                        Deny
                      </ToggleButton>
                      <ToggleButton
                        value="Hold"
                        className="toggle"
                        disabled={
                          toggleStates[index] === "Accept" ||
                          toggleStates[index] === "Deny"
                        }
                      >
                        Hold
                      </ToggleButton>
                      <ToggleButton
                        value="Accept"
                        className="toggle"
                        disabled={toggleStates[index] === "Deny"}
                      >
                        Accept
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}

            {products.length > 0 && (
              <TableRow hover>
                <TableCell colSpan="7">Final Status</TableCell>
                <TableCell>
                  <ToggleButtonGroup
                    value={"Hold"}
                    exclusive
                    onChange={(event, newValue) =>
                      handleToggleChange(event, newValue)
                    }
                  >
                    <ToggleButton value="Deny" className="toggle">
                      Deny
                    </ToggleButton>
                    <ToggleButton value="Hold" className="toggle">
                      Hold
                    </ToggleButton>
                    <ToggleButton value="Accept" className="toggle">
                      Accept
                    </ToggleButton>
                  </ToggleButtonGroup>
                </TableCell>
              </TableRow>
            )}

            {products.length <= 0 && (
              <TableRow hover>
                <TableCell colSpan="8">No purchase order exist</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <CustomSnackbar
          open={snackbar.open}
          handleClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </>
  );
}

export default DashboardComponents;
