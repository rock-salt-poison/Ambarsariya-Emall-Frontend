import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Components/Form/GeneralLedgerForm';
import { Box, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import out_stock from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/out_stock_update.webp'

function OutStockUpdatePreview() {

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
                <Box component="img" src={out_stock} alt="out-stock" className="icon"/>
                <Typography className="heading">Out-Stock update</Typography>
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
                        <TableRow>
                            <TableCell>S.No.</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Item ID</TableCell>
                            <TableCell>Cost price</TableCell>
                            <TableCell>Total Quantity</TableCell>
                            <TableCell>Total Cost Price</TableCell>
                            <TableCell>Quantity Required</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover>
                            <TableCell>1</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell>Total </TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>200</TableCell>
                            <TableCell>50</TableCell>
                            <TableCell>20 </TableCell>
                            <TableCell>20 </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default OutStockUpdatePreview