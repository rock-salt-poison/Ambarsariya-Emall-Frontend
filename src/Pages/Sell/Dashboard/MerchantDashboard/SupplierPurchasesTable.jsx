import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { get_saleOrders } from "../../../../API/fetchExpressAPI";
import CustomSnackbar from "../../../../Components/CustomSnackbar";
import { Link } from "react-router-dom";

function SupplierPurchasesTable() {
  const [loading, setLoading] = useState(false);
  const [tableHeader, setTableHeader] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(()=>{
    setTableHeader([
      'S.No.',
      'Item ID / Quantity in demand',
      'Max Storage Available',
      'Cost of Store Item / Day',
      'Margin / Item',
      'Last Date for Procurement'
    ])
  }, []);



  return (
      <Box className="table_container">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader?.map((header,i)=>{
                return <TableCell key={i}>{header}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow hover>
                  <TableCell>1</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                Total
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableFooter>
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

export default SupplierPurchasesTable;
