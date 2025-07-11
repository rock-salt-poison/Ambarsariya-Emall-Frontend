import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
} from "@mui/material";
import CustomSnackbar from "../../../../Components/CustomSnackbar";
import createCustomTheme from "../../../../styles/CustomSelectDropdownTheme";
import { Link } from "react-router-dom";
import mou_assign from "../../../../Utils/images/Sell/dashboard/merchant_dashboard/mou_assign.png"
import mou_reject from "../../../../Utils/images/Sell/dashboard/merchant_dashboard/mou_reject.webp"
import mou_hold from "../../../../Utils/gifs/mou_hold.gif"

const dummyData = [
  {
    item_id: "DUMMY001",
    attribute: "Cost Price",
    pre_quote: "₹100",
    current_quote: "₹100",
    current_quote_status: "Waiting",
    final_fix: "₹98",
    status: "Waiting",
  },
  {
    item_id: "DUMMY002",
    attribute: "Expiry date",
    pre_quote: "10 days",
    current_quote: "10 days",
    current_quote_status: "Accept",
    final_fix: "11 days",
    status: "Accept",
  },
];

function MoUDetailsTable({ data }) {
  const [loading, setLoading] = useState(false);
  const [tableHeader, setTableHeader] = useState([]);
  const [tableData, setTableData] = useState([]);

  const theme = createCustomTheme({
    popoverBackgroundColor: "var(--yellow)",
    scrollbarThumb: "var(--brown)",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const statusOptions = ["Customizable", "Accept", "Deny", "Waiting"];

  useEffect(() => {
    setTableHeader([
      "Item ID",
      "Attribute for comparison",
      "As pre-quote",
      "Quote",
      "Quote Status",
      "Status",
      "Final Fix",
    ]);

    const isValidArray = Array.isArray(data) && data.length > 0;

    const sourceData = isValidArray ? data : dummyData;

    const updatedData = sourceData.map((item) => ({
      ...item,
      status: item.status || "Waiting",
    }));

    setTableData(updatedData);
  }, [data]);

  const handleStatusChange = (index, value) => {
    const updated = [...tableData];
    updated[index].current_quote_status = value;
    setTableData(updated);

    setSnackbar({
      open: true,
      message: `Status for item ${updated[index].item_id} updated to ${value}`,
      severity: "success",
    });
  };

  const handleQuoteChange = (index, value) => {
    const updated = [...tableData];
    updated[index].current_quote = value;
    setTableData(updated);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box className="table_container">
        {loading && (
          <Box className="loading">
            <CircularProgress />
          </Box>
        )}
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map((header, i) => (
                <TableCell key={i}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>{row.item_id || "-"}</TableCell>
                <TableCell>{row.attribute || "-"}</TableCell>
                <TableCell>{row.pre_quote || "-"}</TableCell>
                <TableCell>
                  {row?.current_quote_status === 'Customizable' ? (
                    <TextField
                      type="text"
                      value={row.current_quote}
                      onChange={(e) => handleQuoteChange(index, e.target.value)}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    row.current_quote || "-"
                  )}
                </TableCell>

                <TableCell>
                  <Select
                    value={row.current_quote_status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    fullWidth
                    className="input_field select"
                  >
                    {statusOptions.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  {row.status || "-"}
                </TableCell>
                <TableCell>{row.final_fix || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                Final Status
              </TableCell>
              <TableCell>
                <Box className="icons">
                  <Link className="icon_container">
                    <Box className="icon" src={mou_assign} component="img" alt="mou_assign"/>
                  </Link>
                  <Link className="icon_container">
                    <Box className="icon" src={mou_reject} component="img" alt="mou_reject"/>
                  </Link>
                  <Link className="icon_container">
                    <Box className="icon" src={mou_hold} component="img" alt="mou_hold"/>
                  </Link>
                </Box>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
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
    </ThemeProvider>
  );
}

export default MoUDetailsTable;
