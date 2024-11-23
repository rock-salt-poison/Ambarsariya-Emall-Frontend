import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, ListItemText, MenuItem, Select, TextField, ThemeProvider, Typography } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';

function CheckboxGroup({ label, fields, values, onChange }) {

    return (
        
        <Box className="checkbox-group">
            <Box className="form-control">
                <Box className="form-row">
                    <FormControlLabel
                        control={
                            <Checkbox onChange={onChange} className="checkbox" />
                        }
                        label={
                            <Box className="label-content">
                                <Typography variant="span" className="label2">{label}</Typography>
                                <Box className="content2">
                                    {fields.map((field, index) => (
                                        field.type === "select" ? (
                                            <Select
                                                key={index}
                                                name={field.name}
                                                multiple
                                                value={values[field.name] || []}
                                                onChange={(event) => onChange({ target: { name: field.name, value: event.target.value } })}
                                                renderValue={(selected) => (
                                                    <Box>
                                                        {selected.length > 0 ? selected.join(', ') : field.placeholder}
                                                    </Box>
                                                )}
                                                displayEmpty
                                                className="input_field"
                                            >
                                                <MenuItem value="" disabled>
                                                    {field.placeholder}
                                                </MenuItem>
                                                {field.options.map((option) => (
                                                    <MenuItem key={option} value={option} className='members_list'>
                                                        <Checkbox checked={(values[field.name] || []).includes(option)} />
                                                        <ListItemText primary={option} className='members_name' />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        ) : field.type !== "date-range" ? (
                                            <TextField
                                                key={index}
                                                hiddenLabel
                                                variant="outlined"
                                                name={field.name}
                                                type={field.type}
                                                required={field.required}
                                                className="input_field"
                                                value={values[field.name] || ""}
                                                onChange={onChange}
                                                placeholder={field.placeholder}
                                                autoCorrect="off"
                                                autoCapitalize="none"
                                                spellCheck="false"
                                            />
                                        ) : (
                                            <DateRangePicker key={index} onChange={(range) => onChange({ target: { name: field.name, value: range } })} />
                                        )
                                    ))}
                                </Box>
                            </Box>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}


function CustomizablePopupContent() {
    // State to hold form data
    const [formData, setFormData] = useState({});

    // Handle input change for form fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle numeric input for price fields
    const handleNumericInput = (event) => {
        const { name, value } = event.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        setFormData((prevData) => ({
            ...prevData,
            [name]: numericValue
        }));
    };

    const saleOptions = [
        {
            label: "Sale for Stock Clearance",
            fields: [
                { name: "sku_no", placeholder: "Enter SKU No.", type: "text", required: true },
                { name: "price", placeholder: "Enter Price", type: "text", required: true, handleNumericInput: handleNumericInput },
                { name: "date-range", type: "date-range" }
            ]
        },
        {
            label: "Festivals Sale",
            fields: [
                { name: "festival_name", placeholder: "Name of festival", type: "text", required: true },
                { name: "offer", placeholder: "Offer", type: "text", required: true },
                { name: "date-range", type: "date-range" }
            ]
        },
        {
            label: "Special Discount",
            fields: [
                { name: "request", placeholder: "Enter your request", type: "text", required: true }
            ]
        },
        {
            label: "Hot Sale",
            fields: [
                {
                    name: "product_type",
                    placeholder: "Select Product Type",
                    type: "select",
                    options: ["Electronics", "Clothing","Clothisng", "Accessories"],
                    required: true,
                },
                { name: "show_price", placeholder: "Show Price", type: "text", required: true, handleNumericInput: handleNumericInput },
                { name: "sale_price", placeholder: "Sale Price", type: "text", required: true, handleNumericInput: handleNumericInput },
                { name: "discounted_price", placeholder: "Price after discount", type: "text", required: true, handleNumericInput: handleNumericInput },
                { name: "date-range", type: "date-range" }
            ]
        }
        
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData); // Log the form data for submission
        // You can now submit formData to an API or handle it as needed
    };

    const themeProps = {
        popoverBackgroundColor: 'var(--lightYellow)',
        dialogBackdropColor: 'var(--brown-4)',
        textColor: 'black',
        scrollbarThumb: 'var(--brown)',
        selectedListItemBgColor:'#b67d1c45'
      };
    
    const theme = createCustomTheme(themeProps);

    return (
        <ThemeProvider theme={theme}>
        <Box component="form" noValidate autoComplete="off" className="offerings_popup_form customizable" onSubmit={handleSubmit}>
            {saleOptions.map((option, index) => (
                <CheckboxGroup
                    key={index}
                    label={option.label}
                    fields={option.fields}
                    values={formData}
                    onChange={(event) => {
                        const { name, value } = event.target;
                        if (option.fields.some(field => field.handleNumericInput && field.name === name)) {
                            handleNumericInput(event); // Handle numeric fields separately
                        } else {
                            handleInputChange(event);
                        }
                    }}
                />
            ))}

            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                    Submit
                </Button>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default CustomizablePopupContent;
