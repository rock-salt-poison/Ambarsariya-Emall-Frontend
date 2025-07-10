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
import CustomSnackbar from "../../../../Components/CustomSnackbar";

function MoUDetailsTable({data}) {
  const [loading, setLoading] = useState(false);
  const [tableHeader, setTableHeader] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(()=>{
    if(data){
      setTableHeader([
        'Item ID',
        'Attribute for comparison',
        'As per quote',
        'Quote',
        'Status',
        'Final Fix',
      ])
    }
  }, [data]);



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
                  <TableCell>sdfsdsgse rtrfdrb gegdfbdreyef hbdbhdre yeyrfdhdhreedf</TableCell>

                  <TableCell>
                    ersdvsxgre dthdgngf thg
                  </TableCell>

                  <TableCell>
                    thdcg yjfh ndthbg
                  </TableCell>
                  <TableCell>
                  tgfb tryurn vbnbfg gfn
                  </TableCell>
                  <TableCell>
                    gfhfg erte er yere
                  </TableCell>
                  <TableCell>
                   ert ery eyreyedfb hg
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

export default MoUDetailsTable;
