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
import { convertDriveLink, get_purchasedOrder, getCategoryName } from "../../API/fetchExpressAPI";
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

function PurchasedCartTable() {
  const { po_no } = useParams();
  const [loading, setLoading] = useState(false);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  const [data, setData] = useState([]);


  // Fetch category names for all products
  useEffect(() => {
    if(po_no){
      fetch_purchased_order_details(po_no);
    }
  }, [po_no]);

  const fetch_purchased_order_details = async (po_no) => {
    try{
      setLoading(true);
      const resp = await get_purchasedOrder(po_no);
      if(resp.valid){
        console.log(resp?.data);
        setData(resp?.data);
      }
    }catch(e){
      console.error(e);
    }finally{
      setLoading(false);
    }
  }

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
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    <Typography className="text_1">{column.label_1}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && (
                data.map((row, index) => (
                  <TableRow key={index}>
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
                        <Typography className="text_3">
                          {row.quantity}
                        </Typography>
                        
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
                      &#8377;{Number(row.unit_price).toFixed(2)}
                    </TableCell>
                    <TableCell className="text_3 product_price" align="right">
                      &#8377;{Number(row.total_price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) }
            </TableBody>
            {data.length > 0 && (
              <TableFooter>
              <TableRow>
                <TableCell colSpan={5} align="right">
                  <Typography className="text_1">Subtotal :</Typography>
                </TableCell>
                <TableCell className="text_2">
                  &#8377; {data?.[0]?.subtotal}
                </TableCell>
              </TableRow>
              {data?.[0]?.discount_applied && <TableRow>
                <TableCell colSpan={5} align="right">
                  <Typography className="text_1">Coupon Cost :</Typography>
                </TableCell>
                <TableCell className="text_2">
                  &#8377; 30
                </TableCell>
              </TableRow>}
              <TableRow>
                <TableCell colSpan={5} align="right">
                  <Typography className="text_1">Discount {data?.[0]?.discount_applied && `(${(data?.[0]?.discount_applied?.coupon_type)?.replace(/_/g,' ')})`} :</Typography>
                </TableCell>
                <TableCell className="text_2">
                  -&#8377;{data?.[0]?.total_discount_amount}
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell colSpan={5} align="right">
                  <Typography className="text_1">Total :</Typography>
                </TableCell>
             <TableCell className="text_2">
                  &#8377;{data?.[0]?.total_amount}
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

export default PurchasedCartTable
