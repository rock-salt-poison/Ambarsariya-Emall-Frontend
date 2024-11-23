import React, { useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';
import AutoCompleteSearchField from '../../../AutoCompleteSearchField';
import GstData_PopupContent from './GstData_PopupContent';

function GstTaxReporting_PopupContent(props) {

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
    scrollbarThumb: 'var(--brown)',
  };

  const theme = createCustomTheme(themeProps);

  const invoiceData = [
    {   
        id: 1, 
        shop_no: 45,
        vendor_no: 456,
        invoice_no: 123,
        gst_no: '27ABCDE1234F2Z5',
        total_tax: 4560,
        total_amount: 28750,
        payment_method: 'Credit Card',
        payment_date: '2024-10-04',
        reference_no: 'MS123',
        paid_amount: 4560,
        balance_amount: 24190,
        cgst: 8,
        igst: 8,
        sgst: 8,
        create_in_taxes: 'Yes',
    },
    {   
        id: 2, 
        shop_no: 46,
        vendor_no: 457,
        invoice_no: 456,
        gst_no: '27ABCDE1234F3Z5',
        total_tax: 5000,
        total_amount: 35000,
        payment_method: 'Bank Transfer',
        payment_date: '2024-10-03',
        reference_no: 'AB124',
        paid_amount: 5000,
        balance_amount: 30000,
        cgst: 9,
        igst: 9,
        sgst: 9,
        create_in_taxes: 'Yes',
    },
    {   
        id: 3, 
        shop_no: 47,
        vendor_no: 458,
        invoice_no: 789,
        gst_no: '27ABCDE1234F4Z5',
        total_tax: 3200,
        total_amount: 24500,
        payment_method: 'Cash',
        payment_date: '2024-10-02',
        reference_no: 'ZI125',
        paid_amount: 3200,
        balance_amount: 21300,
        cgst: 5,
        igst: 5,
        sgst: 5,
        create_in_taxes: 'Yes',
    },
  ];

  const [filteredRows, setFilteredRows] = useState(invoiceData);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Store the selected invoice

  
  const handleFilter = (filteredData) => {
    setFilteredRows(filteredData);
    if (filteredData.length === 1) {
        setSelectedInvoice(filteredData[0]); // Select the first filtered invoice
    } else {
        setSelectedInvoice(null); // Reset if no match or multiple matches
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="assets_popup gst_reporting">
        <Box className="search_field_container">
        <AutoCompleteSearchField 
          data={invoiceData} 
          placeholder="Search Invoice by Invoice No." 
          suggestions 
          onFilter={handleFilter} 
        />
        <Typography className="text">Or</Typography>
        <AutoCompleteSearchField 
          data={invoiceData} 
          placeholder="Search Invoice by date" 
          suggestions 
          onFilter={handleFilter} 
          type="date"
        />
          
        </Box>
        <GstData_PopupContent selectedInvoice={selectedInvoice}/> 
      </Box>
    </ThemeProvider>
  );
}

export default GstTaxReporting_PopupContent