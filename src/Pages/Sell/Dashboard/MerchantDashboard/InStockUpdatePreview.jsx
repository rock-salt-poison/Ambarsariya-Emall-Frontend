import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Components/Form/GeneralLedgerForm';
import { Box, Table, TableBody, TableCell, TableFooter, TableHead, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import in_stock from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/in_stock_update.webp'

function InStockUpdatePreview() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        date: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select date',
            name: 'date',
            type: 'date',
        },
    ];

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach(field => {
            const name = field.name;
            // Validate main fields
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            console.log(formData);
            // Proceed with further submission logic, e.g., API call
        } else {
            console.log(errors);
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Box className="stock_update">
            <Box className="heading_container">
                <Box component="img" src={in_stock} alt="in-stock" className="icon"/>
                <Typography className="heading">In-Stock update</Typography>
            </Box>
            <GeneralLedgerForm
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
            />

            <Box className="table_container">
                <Table>
                    <TableHead>
                        <TableCell>S.No.</TableCell>
                        <TableCell>Product ID</TableCell>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Selling price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Max Storage Available</TableCell>
                    </TableHead>
                    <TableBody>
                        <TableCell>1</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableBody>

                    <TableFooter>
                        <TableCell>Total </TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>20 </TableCell>
                    </TableFooter>
                </Table>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default InStockUpdatePreview