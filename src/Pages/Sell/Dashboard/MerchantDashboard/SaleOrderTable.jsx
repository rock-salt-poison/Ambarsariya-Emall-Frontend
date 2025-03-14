import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { get_saleOrders } from "../../../../API/fetchExpressAPI";
import CustomSnackbar from "../../../../Components/CustomSnackbar";

function SaleOrderTable({ seller_id }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  console.log('------------sale ', products);
  
 
  const fetch_products = async (seller_id) => {
    try {
      setLoading(true);
      if (seller_id) {
        const resp = await get_saleOrders(seller_id);
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

  



  
  useEffect(() => {
    if (seller_id) {
      fetch_products(seller_id);
    } else {
      setProducts([]); // Ensure no products are displayed if no POs are available
    }
  }, [seller_id]);
  

  

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
              <TableCell>S.O</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>
                Payment Status
              </TableCell>
              <TableCell>Credit/Balance</TableCell>
              <TableCell>Delivery Type</TableCell>
              <TableCell>
                Delivery Status
              </TableCell>
              <TableCell>
                Return / Refund Status
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
              // fetch_product_variants(row.seller_id, row.variant_group);
              return (
                <TableRow key={row.product_id} hover>
                  <TableCell>{row.so_no}</TableCell>

                  {/* Product Name Column - Dropdown if on Hold */}
                  <TableCell>
                   
                      {row.payment_method}
                  </TableCell>

                  {/* Quantity Column - Input if on Hold */}
                  <TableCell>
                      Pending
                  </TableCell>

                  <TableCell>
                    {row.balance_credit !== null ? row.balance_credit : '-'}
                  </TableCell>
                  <TableCell width="100px">
                    {row.service}
                  </TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>
                    -
                  </TableCell>

                </TableRow>
              );
            })}


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

export default SaleOrderTable;
