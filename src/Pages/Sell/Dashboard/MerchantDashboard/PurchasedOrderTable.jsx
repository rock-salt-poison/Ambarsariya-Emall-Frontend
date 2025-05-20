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
import { useParams } from "react-router-dom";
import {
  get_product_variants,
  get_purchaseOrders,
  post_saleOrder,
} from "../../../../API/fetchExpressAPI";
import CustomSnackbar from "../../../../Components/CustomSnackbar";

function PurchasedOrderTable({ purchasedOrders, selectedPO }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const { token } = useParams();
  const [toggleStates, setToggleStates] = useState({});
  const [headerToggleState, setHeaderToggleState] = useState("Hold");
  const [editedValues, setEditedValues] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [soExists, setSoExists] = useState(false);
  console.log(products);

  const fetch_products = async (po_no) => {
    try {
      setLoading(true);
      if (po_no) {
        const resp = await get_purchaseOrders(po_no);
        if (resp.valid) {
          setProducts(resp.data);
          console.log(resp.data);
        }
      }
    } catch (e) {
      console.log(e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetch_product_variants = async (product_id) => {
    if (product_id) {
      try {
        const resp = await get_product_variants(product_id);
        if (resp.valid) {
          setProductVariants(resp.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (purchasedOrders.length > 0 && selectedPO) {
      fetch_products(selectedPO);
    } else {
      setProducts([]); // Ensure no products are displayed if no POs are available
    }
  }, [purchasedOrders, selectedPO]);

  useEffect(() => {
    if (products.length > 0) {
      setSoExists(products.some((product) => product.so_no));

      const initialStates = {};
      products.forEach((product, index) => {
        initialStates[index] = product.status || "Hold"; // Default selection as "hold"
      });
      setToggleStates(initialStates);
    }
  }, [products]);

  console.log(products);

  const handleToggleChange = async (index, newValue) => {
    if (newValue !== null) {
      setToggleStates((prevState) => ({ ...prevState, [index]: newValue }));

      setProducts((prevProducts) => {
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

      setProducts((prevProducts) =>
        prevProducts.map((product) => ({
          ...product,
          status: newValue,
        }))
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product_data = products[0];
    console.log(product_data);

    const soProducts = products.map((p) => ({
      product_id: p.product_id,
      product_name: p.product_name,
      quantity: p.quantity_ordered,
      unit_price: p.unit_price,
      line_total_no_of_items: p.quantity_ordered,
      accept_or_deny: p.status,
    }));
    // Prepare sale order data
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
      subtotal: product_data.total_price,
      taxes: product_data.taxes || null, // Update if applicable
      discounts:
        product_data.discount_amount === "0.00"
          ? null
          : product_data.discount_amount,
      shipping_method: product_data.shipping_method, // Adjust as needed
      shipping_charges: null, // Adjust if applicable
      expected_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
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
    };

    console.log(saleOrderData);

    // try {
    //   setLoading(true);
    //   const resp = await post_saleOrder(saleOrderData);
    //   console.log(resp);
    //   setSnackbar({
    //     open: true,
    //     message: resp.message,
    //     severity: "success",
    //   });
    //   setSoExists(true);
    // } catch (error) {
    //   console.error("API error:", error);
    //   setSnackbar({
    //     open: true,
    //     message: error.response?.data?.error || "Error processing order",
    //     severity: "error",
    //   });
    //   setSoExists(false);
    // } finally {
    //   setLoading(false);
    // }
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

    setProducts((prevProducts) => {
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
              P.O Sale
              <Typography component="span">
                <ToggleButtonGroup
                  value={headerToggleState}
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
          {products.map((row, index) => {
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

                <TableCell>{row.quantity_in_stock}</TableCell>
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
                <TableCell>₹ {row.total_price - row.discount_amount}</TableCell>

                {/* Toggle Button Group */}
                <TableCell>
                  <ToggleButtonGroup
                    value={toggleStates[index] || row.status || "Hold"}
                    exclusive
                    onChange={(event, newValue) =>
                      handleToggleChange(index, newValue)
                    }
                    disabled={soExists}
                  >
                    <ToggleButton value="Deny" className="toggle">
                      Deny
                    </ToggleButton>
                    <ToggleButton
                      value="Hold"
                      className="toggle"
                      disabled={soExists}
                    >
                      Hold
                    </ToggleButton>
                    <ToggleButton value="Accept" className="toggle">
                      Accept
                    </ToggleButton>
                  </ToggleButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}

          {products.length > 0 && !soExists && (
            <TableRow hover>
              <TableCell colSpan="7">Final Status</TableCell>
              <TableCell>
                <Button className="btn-submit" onClick={(e) => handleSubmit(e)}>
                  Submit
                </Button>
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
  );
}

export default PurchasedOrderTable;
