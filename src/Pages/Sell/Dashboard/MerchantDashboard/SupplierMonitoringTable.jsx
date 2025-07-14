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

function SupplierMonitoringTable() {
  const [loading, setLoading] = useState(false);
  const [tableHeader, setTableHeader] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(()=>{
    setTableHeader([[
      'S.No.',
      'Orders',
      'Logistics',
      'Stock',
      'Supply',
      'Demand'
    ],[
      '-',
      'Item ID / Quantity per unit',
      'Date / Time & Cost + Overheads',
      'Quantity Available + Cost of Item',
      'Quantity Required for all supply',
      'Quantity Required for all supply'
    ]])
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
              {tableHeader?.map((header,i)=>( 
            <TableRow>
                {header.map((cell, index)=> {
                return <TableCell key={index}>{cell}</TableCell>
              })}
            </TableRow>
                ))}
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

export default SupplierMonitoringTable;
