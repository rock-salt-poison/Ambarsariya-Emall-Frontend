import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import CustomSnackbar from "../../../../Components/CustomSnackbar";
import createCustomTheme from "../../../../styles/CustomSelectDropdownTheme";

const dummyData = [
  {
    item_id: "DUMMY001",
    attribute: "Cost Price",
    pre_quote: "₹100",
    // current_quote: "₹95",
    current_quote: "Waiting",
    final_fix: "₹98",
    status: "Waiting",
  },
  {
    item_id: "DUMMY002",
    attribute: "Expiry date",
    pre_quote: "10 days",
    // current_quote: "12 days",
    current_quote: "Accept",
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
    updated[index].current_quote = value;
    setTableData(updated);

    setSnackbar({
      open: true,
      message: `Status for item ${updated[index].item_id} updated to ${value}`,
      severity: "success",
    });
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
                  <Select
                    value={row.current_quote}
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
