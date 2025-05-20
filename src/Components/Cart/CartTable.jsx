import React, { useState, useEffect } from "react";
import {
  Button,
  TableFooter,
  Typography,
  Box,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  Table,
  Paper,
  CircularProgress,
} from "@mui/material";
import tbody_vector from "../../Utils/images/Sell/products/tbody_vector.webp";
import plus from "../../Utils/images/Sell/cart/plus.svg";
import minus from "../../Utils/images/Sell/cart/minus.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../store/cartSlice";
import { useParams } from "react-router-dom";
import Button2 from "../Home/Button2";
import { convertDriveLink, getCategoryName } from "../../API/fetchExpressAPI";
import CustomSnackbar from "../CustomSnackbar";
import { removeCoupon } from "../../store/discountsSlice";

const columns = [
  { id: "1", label_1: "S.No." },
  { id: "2", label_1: "Product" },
  { id: "3", label_1: "Quantity" },
  { id: "4", label_1: "Brand" },
  { id: "5", label_1: "Unit Price" },
  { id: "6", label_1: "Total Price" },
];

function CartTable({ rows,setCartData, setSelectedCoupon }) {
  const dispatch = useDispatch();
  const { owner } = useParams();
  const [loading, setLoading] = useState(false);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  const [data, setData] = useState(
    rows.map((row) => ({ ...row, quantity: 1 })) // Initialize quantity for each product
  );
  const [categoryNames, setCategoryNames] = useState({}); // Map of category IDs to names
  const { selectedCoupon } = useSelector((state) => state.discounts);

  console.log(rows);
  
  // Fetch category names for all products
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const uniqueCategoryIds = Array.from(
        new Set(rows.map((row) => row.category))
      ); // Get unique category IDs
      const categoryNameMap = {};

      for (const categoryId of uniqueCategoryIds) {
        const resp = await getCategoryName(categoryId);
        if (resp.length > 0) {
          categoryNameMap[categoryId] = resp[0].category_name;
        }
      }

      setCategoryNames(categoryNameMap);
      setLoading(false);
    };

    fetchCategories();
  }, [rows]);

  useEffect(() => {
    if (selectedCoupon) {
      const total = calculateTotal();
      const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  
      const conditions = selectedCoupon.conditions || [];
      const minOrder = Number(conditions.find((c) => ["minimum_order", "last_purchase_above"].includes(c.type))?.value || 0);
      const percent = Number(conditions.find((c) => ["percentage", "percent_off", "flat_percent"].includes(c.type))?.value || 0);
      const flatDiscount = Number(conditions.find((c) => ["flat", "unlock"].includes(c.type))?.value || 0);
      const buy = Number(conditions.find((c) => c.type === "buy")?.value || 0);
      const pay = Number(conditions.find((c) => c.type === "pay")?.value || 0);
      const get = Number(conditions.find((c) => c.type === "get")?.value || 0);
  
      let shouldRemoveCoupon = false;
  
      if (selectedCoupon.coupon_type.includes("subscription") || selectedCoupon.coupon_type.includes('loyalty_by_customer')) {
        shouldRemoveCoupon = true;
      } else if (selectedCoupon.coupon_type === "retailer_freebies") {
        if (totalQuantity < buy) {
          setSnackbar({
            open: true,
            message: `Add ${buy - totalQuantity} more items to use Buy ${buy} Get ${get} coupon.`,
            severity: "error",
          });
          shouldRemoveCoupon = true;
        } else {
          setSnackbar({
            open: true,
            message: `You qualify for the offer: Buy ${buy}, Get ${get}.`,
            severity: "success",
          });
        }
      } else if (selectedCoupon.coupon_type === "loyalty_prepaid") {
        if (total < pay) {
          setSnackbar({
            open: true,
            message: `Add ₹${(pay - total).toFixed(2)} more to use this coupon.`,
            severity: "error",
          });
          shouldRemoveCoupon = true;
        } else {
          setSnackbar({
            open: true,
            message: `You saved ₹${(total - get).toFixed(2)}!`,
            severity: "success",
          });
        }
      } else if (total < minOrder) {
        setSnackbar({
          open: true,
          message: `Add ₹${(minOrder - total).toFixed(2)} more to use this coupon.`,
          severity: "error",
        });
        shouldRemoveCoupon = true;
      } else if(!selectedCoupon.coupon_type.includes('loyalty_by_customer')){
        const discountValue = percent > 0 ? (total * percent) / 100 : flatDiscount;
        setSnackbar({
          open: true,
          message: `You saved ₹${discountValue.toFixed(2)}!`,
          severity: "success",
        });
      }
  
      if (shouldRemoveCoupon) {
        dispatch(removeCoupon());
      }
    } else {
      setSnackbar({ open: false, message: "", severity: "success" }); // Reset snackbar when no coupon is selected
    }
  }, [selectedCoupon, data]); // Dependencies: re-run whenever selectedCoupon or cart data changes  
  

  useEffect(()=>{
    setCartData({
      subtotal: calculateTotal().toFixed(2),
      total: (calculateTotal() - calculateDiscount()).toFixed(2),
      discount: calculateDiscount().toFixed(2),
      cart : data
    });
  },[data])

  useEffect(()=>{
    setSelectedCoupon(selectedCoupon);
  },[selectedCoupon])
  
  const handleIncrement = (index) => {
    const newData = data.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setData(newData);
  };
  
  const handleDecrement = (index) => {
    const newData = data
    .map((item, i) =>
      i === index
    ? item.quantity > 1
    ? { ...item, quantity: item.quantity - 1 }
    : null
    : item
  )
  .filter((item) => item !== null);
  
  if (data[index].quantity === 1) {
    dispatch(removeProduct(data[index].id));
  }
  
  setData(newData);
};

const calculateTotal = () =>
  data.reduce((acc, item) => acc + Number(item.selling_price * item.quantity), 0);

const calculateDiscount = () => {
    if (!selectedCoupon) return 0;
  
    const { coupon_type, conditions } = selectedCoupon;
    const total = calculateTotal();
    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  
    // Extract relevant conditions
    const minOrder = Number(
      conditions.find(
        (c) => c.type === "minimum_order" || c.type === "last_purchase_above"
      )?.value || 0
    );
    const percent = Number(
      conditions.find(
        (c) =>
          c.type === "percentage" ||
          c.type === "flat" ||
          c.type === "unlock" ||
          c.type === "save" ||
          c.type === "percent_off" ||
          c.type === "flat_percent"
      )?.value || 0
    );
    const buy = Number(conditions.find((c) => c.type === "buy")?.value || 0);
    const pay = Number(conditions.find((c) => c.type === "pay")?.value || 0);
  
    switch (coupon_type) {
      case "retailer_upto":
      case "retailer_flat":
        return total >= minOrder ? (total * percent) / 100 : 0;
  
      case "retailer_freebies":
        return totalQuantity >= buy ? 0 : 0;
  
      case "loyalty_prepaid":
        const get = Number(conditions.find((c) => c.type === "get")?.value || 0);
        return total >= pay ? get : 0;

      case "loyalty_bonus":
      return ((total * percent) / 100);
  
      // case "subscription_daily":
      //   return ((total * percent) / 100);

      // case "subscription_weekly":
      //   return ((total * percent) / 100);

      // case "subscription_monthly":
      //   return ((total * percent) / 100);

      // case "subscription_edit":
      //   return ((total * percent) / 100);
      
      default:
        return 0;
    }
  };
  
  
  

  // const calculateDiscount = () => calculateTotal() ;

  return (
    <Box className="cart_table_wrapper">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Paper className="table">
        <Box className="board_pins">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Typography className="text_1">{column.label_1}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={row.product_no}>
                    <TableCell className="text_3" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="product_cell">
                      <Box
                        component="img"
                        src={convertDriveLink(row.product_images[0])}
                        alt="product_image"
                        className="product_image"
                      />
                      <Box className="product_info">
                        <Box
                          component="img"
                          className="vector"
                          src={tbody_vector}
                        />
                        <Typography className="text_1">
                          {row.product_name}
                        </Typography>
                        {/* <Typography className="text_2">
                          {[
                            row.variation_1,
                            row.variation_2,
                            row.variation_3,
                            row.variation_4,
                          ]
                            .filter((variation) => variation && variation.trim() !== "")
                            .join(", ")}
                        </Typography> */}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="quantity">
                        <Button
                          onClick={() => handleDecrement(index)}
                          className="operator"
                        >
                          <Box component="img" src={minus} alt="minus" />
                        </Button>
                        <Typography className="text_3">
                          {row.quantity}
                        </Typography>
                        <Button
                          onClick={() => handleIncrement(index)}
                          className="operator"
                        >
                          <Box component="img" src={plus} alt="plus" />
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="product_info">
                        <Box
                          component="img"
                          className="vector"
                          src={tbody_vector}
                        />
                        <Typography className="text_1">{row.brand}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell className="text_3" align="right">
                      &#8377;{Number(row.selling_price).toFixed(2)}
                    </TableCell>
                    <TableCell className="text_3 product_price" align="right">
                      &#8377;{(row.selling_price * row.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="empty_cart">
                    <Typography className="label">0 items added</Typography>
                    <Button2
                      text="Add Products"
                      redirectTo={`../shop/${owner}/products`}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {data.length > 0 && (
              <TableFooter>
              <TableRow>
                <TableCell colSpan={5} align="right">
                  <Typography className="text_1">Subtotal :</Typography>
                </TableCell>
                <TableCell className="text_2">
                  &#8377;{calculateTotal().toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} align="right">
                  <Typography className="text_1">Discount {selectedCoupon && `(${(selectedCoupon.coupon_type)?.replace(/_/g,' ')})`} :</Typography>
                </TableCell>
                <TableCell className="text_2">
                  -&#8377;{calculateDiscount().toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} align="right">
                  <Typography className="text_1">Total :</Typography>
                </TableCell>
                <TableCell className="text_2">
                  &#8377;{(calculateTotal() - calculateDiscount()).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
            
            )}
          </Table>
        </TableContainer>
        <Box className="board_pins">
          <Box className="circle"></Box>
          <Box className="circle"></Box>
        </Box>
      </Paper>
      <CustomSnackbar
          open={snackbar.open}
          handleClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
    </Box>
  );
}

export default CartTable
