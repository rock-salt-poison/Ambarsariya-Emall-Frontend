import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { get_saleOrders } from "../../../../API/fetchExpressAPI";
import CustomSnackbar from "../../../../Components/CustomSnackbar";
import { Link } from "react-router-dom";

function B2BTable({ selectedMouType }) {
  const [loading, setLoading] = useState(false);
  const [tableHeader, setTableHeader] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(()=>{
    if(selectedMouType ==='new' || selectedMouType === 'waiting' || selectedMouType === 'renew for final'){
      setTableHeader([
        'Item ID',
        'Subscription Type',
        'Selling Price',
        'Quantity Available',
        'Final Price & Quantity per subscription',
      ])
    }else if(selectedMouType ==='on-going'){
      setTableHeader([
        'MoU No.',
        'Start Date & End Date',
        'Subscription Type',
        'Credit Balance',
        '% of Completion',
      ])
    }else if(selectedMouType ==='completed'){
      setTableHeader([
        'S.No.',
        'MoU',
        'Completed Date',
        'Renewal Status',
        'New Bidding'
      ])
    }
  }, [selectedMouType]);



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
              {tableHeader?.map((header,i)=>{
                return <TableCell key={i}>{header}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow hover>
                  <TableCell>1</TableCell>

                  <TableCell>
                    -
                  </TableCell>

                  <TableCell>
                    -
                  </TableCell>
                  <TableCell>
                  -
                  </TableCell>
                  <TableCell>
                    -
                  </TableCell>

                </TableRow>

{/* 
            {products.length <= 0 && (
              <TableRow hover>
                <TableCell colSpan="8">No purchase order exist</TableCell>
              </TableRow>
            )} */}
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

export default B2BTable;
