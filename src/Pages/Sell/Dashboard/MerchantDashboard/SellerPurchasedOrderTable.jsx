import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { Link, useParams } from "react-router-dom";
import {
  get_product_variants,
  get_purchaseOrders,
  post_saleOrder,
} from "../../../../API/fetchExpressAPI";
import CustomSnackbar from "../../../../Components/CustomSnackbar";
import ConfirmationDialog from "../../../../Components/ConfirmationDialog";

function SellerPurchasedOrderTable({ purchasedOrders, selectedPO, cardType }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const { token } = useParams();
  const [toggleStates, setToggleStates] = useState({});
  const [headerToggleState, setHeaderToggleState] = useState("Hold");
  const [editedValues, setEditedValues] = useState({});
    const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [saleOrder, setSaleOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [soExists, setSoExists] = useState(false);
  const [total, setTotal] = useState(0.00);

  const fetch_products = async (po_no) => {
    try {
      setLoading(true);
      if (po_no) {
        const resp = await get_purchaseOrders(po_no);
        console.log(resp)
        if (resp.valid) {

          const updatedData = resp.data?.map((product)=> {
            const selected_variant = product?.selected_variant?.split('_');
            return {...product, product_name: `${selected_variant?.at(8)} - ${selected_variant?.at(10)}`,status: product.status || "Hold" }
          })

          setProducts(resp.data);
          setUpdatedProducts(updatedData);
        }
        
      }
    } catch (e) {
      console.log(e);
      setProducts([]);
      setUpdatedProducts([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (purchasedOrders.length > 0 && selectedPO) {
      fetch_products(selectedPO);
    } else {
      setProducts([]); 
      setUpdatedProducts([]); 
    }
  }, [purchasedOrders, selectedPO]);

  useEffect(() => {
    if (updatedProducts.length > 0) {
      setSoExists(updatedProducts.some((product) => product.so_no));

      const initialStates = {};
      updatedProducts.forEach((product, index) => {
        initialStates[index] = product.status || "Hold"; // Default selection as "hold"
      });
      setToggleStates(initialStates);
    }
  }, [updatedProducts]);


  const handleToggleChange = async (index, newValue) => {
    if (newValue !== null) {
      setToggleStates((prevState) => ({ ...prevState, [index]: newValue }));

      setUpdatedProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          status: newValue, // Ensure this matches the actual status field in the product object
        };
        return updatedProducts;
      });
    }
  };

  const handleHeaderToggleChange = async (event, newValue) => {
    if (newValue !== null) {
      setHeaderToggleState(newValue);
      // Update all rows with the same value
      setToggleStates((prevStates) => {
        const updatedStates = {};
        Object.keys(prevStates).forEach((key) => {
          updatedStates[key] = newValue;
        });
        return updatedStates;
      });

      setUpdatedProducts((prevProducts) =>
        prevProducts.map((product) => ({
          ...product,
          status: newValue || product.status,
        }))
      );
    }
  };

  const calculateUpdatedStock = (originalProducts, modifiedProducts) => {
  const stockUpdates = [];

  modifiedProducts.forEach((updated) => {
    const original = originalProducts.find(
      (orig) => orig.product_id === updated.product_id
    );

    const originalQty = parseFloat(original?.quantity_ordered || 0);
    const updatedQty = parseFloat(updated?.quantity_ordered || 0);
    const originalVariant = original?.selected_variant;
    const updatedVariant = updated?.selected_variant;

    if (updated.status === "Accept") {
      if (!isNaN(originalQty) && !isNaN(updatedQty)) {
        if (originalVariant !== updatedVariant) {
          // Variant changed: reverse original, apply updated
          if (originalVariant) {
            stockUpdates.push({
              item_id: originalVariant,
              quantity_change: -originalQty,
              product_id: original.product_id
            });
          }
          if (updatedVariant) {
            stockUpdates.push({
              item_id: updatedVariant,
              quantity_change: updatedQty,
              product_id: updated.product_id
            });
          }
        } else {
          // Same variant: adjust by quantity diff
          const quantityChange = updatedQty - originalQty;
          if (quantityChange !== 0) {
            stockUpdates.push({
              item_id: updatedVariant,
              quantity_change: quantityChange,
              product_id: updated.product_id
            });
          }
        }
      }
    }

    if (updated.status === "Deny") {
      if (!isNaN(originalQty) && originalVariant) {
        stockUpdates.push({
          item_id: originalVariant,
          quantity_change: -originalQty,
          product_id: original.product_id
        });
      }
    }
  });

  return stockUpdates;
};



const handleConfirm = async (saleOrder) => {
  try {
      setLoading(true);
      const resp = await post_saleOrder(saleOrder);
      setSnackbar({
        open: true,
        message: resp.message,
        severity: "success",
      });
      setSoExists(true);
    } catch (error) {
      console.error("API error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "Error processing order",
        severity: "error",
      });
      setSoExists(false);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
}

const calculate_total = () => {
  const total = updatedProducts?.reduce((acc, curr) => {
    const quantity = parseFloat(curr.quantity_ordered) || 0;
    const price = parseFloat(curr.unit_price) || 0;
    const discount_amount = parseFloat(curr.discount_amount) || 0;
    return acc + (quantity * price - discount_amount);
  }, 0);

  const couponCost = parseFloat(updatedProducts?.[0]?.coupon_cost) || 0;
  setTotal((total + couponCost).toFixed(2));
}


useEffect(()=>{
  calculate_total();
}, [updatedProducts, selectedPO])

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const acceptedProducts = updatedProducts.filter(p => p.status === "Accept");

  if (acceptedProducts.length === 0) {
    setSnackbar({
      open: true,
      message: "No products accepted to generate sale order.",
      severity: "warning",
    });
    return;
  }

  const product_data = updatedProducts[0]; // assuming all share same PO meta
  const stockUpdates = calculateUpdatedStock(products, updatedProducts); 
  console.log(product_data);
  

  const soProducts = updatedProducts.map((p) => ({
    product_id: p.product_id,
    product_name: p.product_name,
    quantity: Number(p.quantity_ordered),
    unit_price: Number(p.unit_price),
    total_price: Number(parseInt(p.unit_price) * p.quantity_ordered),
    line_total_no_of_items: Number(p.quantity_ordered),
    accept_or_deny: p.status,
    selected_variant: p.selected_variant
  }));

  // 🔹 Only calculate subtotal from accepted products
  const acceptedSubtotal = acceptedProducts.reduce((acc, curr) => {
    const quantity = parseFloat(curr.quantity_ordered) || 0;
    const price = parseFloat(curr.unit_price) || 0;
    const discount_amount = parseFloat(curr.discount_amount) || 0;
    return (acc + quantity * price);
  }, 0);

  const couponCost = parseFloat(product_data.coupon_cost) || 0;
  const subtotal = (acceptedSubtotal + couponCost).toFixed(2);

  const saleOrderData = {
    po_no: product_data.po_no,
    buyer_id: product_data.buyer_id,
    seller_id: product_data.seller_id,
    buyer_type: product_data.buyer_type,
    order_date: new Date(),
    products: soProducts,
    quantity: product_data.quantity_ordered,
    unit_price: product_data.unit_price,
    line_total_no_of_items: product_data.quantity_ordered,
    subtotal: acceptedSubtotal, 
    taxes: product_data.taxes || null,
    stockUpdates,
    discounts:
      product_data.total_discount_amount === "0.00"
        ? null
        : product_data.total_discount_amount,
    shipping_method: product_data.shipping_method,
    shipping_charges: null,
    expected_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    co_helper: null,
    subscription_type: product_data.special_offers,
    payment_terms: null,
    total_payment_with_all_services: null,
    payment_method: product_data.payment_method,
    payment_due_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    prepaid: product_data.pre_post_paid,
    postpaid: product_data.pre_post_paid,
    balance_credit: null,
    balance_credit_due_date: null,
    after_due_date_surcharges_per_day: null,
    status: headerToggleState,
    send_qr_upi_bank_details: true,
    coupon_cost : couponCost,
    buyer_shop_no : null,
    buyer_merchant_id: null,
    seller_member_id: null,
    seller_merchant_id: null,
    payment_status: null,
    buyer_name: null,
    buyer_phone_no: null,
    sector: null,
    category : null
  };

  console.log(saleOrderData);
  
  setSaleOrder(saleOrderData);
  setOpenDialog(true);

    
  };

  const handleInputChange = (index, field, value) => {
    setEditedValues((prevState) => {
      const updated = {
        ...prevState,
        [index]: { ...prevState[index], [field]: value },
      };

      setUpdatedProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        const updatedProduct = {
          ...updatedProducts[index],
          [field]: value,
        };
        updatedProduct.total_price = updatedProduct.unit_price * updatedProduct.quantity;
        updatedProducts[index] = updatedProduct;
        return updatedProducts;
      });

      return updated;
    });
  };


  const handleItemChange = (index, selectedItemId, row) => {
    const selectedItem = row.items?.find(
      (item) => item.item_id === selectedItemId
    );
    if (!selectedItem) return;

    const variations = selectedItem.item_id.split("_");
    const newVariantLabel = `${variations.at(8)} - ${variations.at(10)}`;

    setEditedValues((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        product_name: newVariantLabel,
        selected_variant: selectedItem.item_id,
        unit_price: selectedItem.item_selling_price,
        quantity: selectedItem.item_quantity,
      },
    }));

    setUpdatedProducts((prevProducts) => {
      const updated = [...prevProducts];
      updated[index] = {
        ...updated[index],
        product_name: newVariantLabel,
        selected_variant: selectedItem.item_id,
        unit_price: selectedItem.item_selling_price,
        quantity: selectedItem.item_quantity,
      };
      return updated;
    });
  };

  
  return (
    <>
    
    {updatedProducts?.length > 0 && <Box className="col buyer_details">
        <Typography className="heading">Buyer Id : </Typography>
        <Link to={`../support/shop/${token}/purchased-order/${encodeURIComponent(products?.[0]?.po_no)}`}><Typography className="text">{(products?.[0]?.po_no)?.split('&')?.[0]}</Typography></Link>
    </Box>}
   
    <Box className="col">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
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
            <TableCell>
              Final S.O
              <Typography component="span">
                <ToggleButtonGroup
                  value={headerToggleState || products?.[0]?.sale_order_status}
                  exclusive
                  onChange={handleHeaderToggleChange}
                  disabled={soExists}
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
              </Typography>
            </TableCell>
            {/* <TableCell>Total Price</TableCell>
                                <TableCell>List of services applied</TableCell>
                                <TableCell>Final S.O.</TableCell>
                                <TableCell>Payment status</TableCell>
                                <TableCell>Final status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {updatedProducts.map((row, index) => {
           
            const isHold = toggleStates[index] === "Hold";
            const purchasedVariant = row.items
              ?.find((i) => i?.item_id?.match(row.selected_variant))
              ?.item_id?.split("_");
            // fetch_product_variants(row.seller_id, row.variant_group);
            return (
              <TableRow key={row.product_id} hover>
                <TableCell>{index + 1}</TableCell>

                {/* Product Name Column - Dropdown if on Hold */}
                <TableCell>
                  {isHold ? (
                    <Select
                      value={
                        editedValues[index]?.selected_variant ||
                        row.selected_variant
                      }
                      onChange={(e) =>
                        handleItemChange(index, e.target.value, row)
                      }
                      fullWidth
                      className="input_field select"
                    >
                      {row.items?.map((i) => {
                        const v = i.item_id.split("_");
                        const label = `${v.at(8)} - ${v.at(10)}`;
                        return (
                          <MenuItem key={i.item_id} value={i.item_id}>
                            {label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  ) : (
                    `${purchasedVariant?.at(8)} - ${purchasedVariant?.at(10)}`
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

                <TableCell>{row.items?.find((i)=>i.item_id===row.selected_variant)?.item_quantity}</TableCell>
                <TableCell width="100px">
                  {isHold ? (
                    <TextField
                      type="number"
                      value={editedValues[index]?.unit_price || row.unit_price}
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
                <TableCell>₹ {row.unit_price * row.quantity_ordered}</TableCell>
                <TableCell>₹ {((row.unit_price * row.quantity_ordered) - row.discount_amount)?.toFixed(2)}</TableCell>

                {/* Toggle Button Group */}
                <TableCell>
                  <ToggleButtonGroup
                    value={toggleStates[index] ?? row.status ?? "Hold"}
                    exclusive
                    onChange={(event, newValue) =>
                      handleToggleChange(index, newValue)
                    }
                    disabled={soExists}
                  >
                    <ToggleButton value="Deny" className="toggle" selected={(toggleStates[index] ?? row.status) === "Deny"}>
                      Deny
                    </ToggleButton>
                    <ToggleButton value="Hold" className="toggle" selected={(toggleStates[index] ?? row.status) === "Hold"}>
                      Hold
                    </ToggleButton>
                    <ToggleButton value="Accept" className="toggle" selected={(toggleStates[index] ?? row.status) === "Accept"}>
                      Accept
                    </ToggleButton>
                  </ToggleButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
          

          {updatedProducts.length > 0 && !soExists && (
            <TableRow hover>
              <TableCell colSpan="6">
                Total (Coupon Cost Included)
              </TableCell>
              <TableCell>₹ {total}</TableCell>
              <TableCell>
                <Button className="btn-submit" onClick={(e) => handleSubmit(e)}>
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          )}

          {updatedProducts.length <= 0 && (
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
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={(e)=>handleConfirm(saleOrder)}
        title="Confirm Sale Order"
        message={`Are you sure you want to ${headerToggleState} this order?`}
        optionalCname="logoutDialog"
      />
    </Box>
     </>
  );
}

export default SellerPurchasedOrderTable;
