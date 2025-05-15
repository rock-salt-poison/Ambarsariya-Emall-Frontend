import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Typography,
    FormHelperText,
} from '@mui/material';
import { DateRangePicker } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../store/couponsSlice';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import CustomSnackbar from '../CustomSnackbar';

function CheckboxGroup({ label, name, fields, values = {}, onChange, errors }) {
    console.log('CheckboxGroup values:', values); // Debug values

    return (
        <Box className="checkbox-group">
            <Box className="form-control">
                <Box className="form-row">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={values.checked || false}
                                onChange={(e) =>
                                    onChange({
                                        target: { name: `${name}.checked`, value: e.target.checked },
                                    })
                                }
                                className="checkbox"
                            />
                        }
                        label={
                            <Box className="label-content">
                                <Typography variant="span" className="label2">{label}</Typography>
                                <Box className="content2">
                                    {fields.map((field, index) => {
                                        const fieldName = `${name}.${field.name}`;
                                        const fieldError = errors[name]?.[field.name];
                                        const fieldValue = values[field.name] || ''; // Default to empty string

                                        return field.type === 'select' ? (
                                            <Select
                                                key={index}
                                                name={fieldName}
                                                multiple
                                                value={values[field.name] || []} // Use default or provided value
                                                onChange={(event) =>
                                                    onChange({ target: { name: fieldName, value: event.target.value } })
                                                }
                                                renderValue={(selected) =>
                                                    selected.length > 0 ? selected.join(', ') : field.placeholder
                                                }
                                                displayEmpty
                                                className="input_field"
                                            >
                                                <MenuItem value="" disabled>{field.placeholder}</MenuItem>
                                                {field.options.map((option) => (
                                                    <MenuItem key={option} value={option} className="members_list">
                                                        <Checkbox
                                                            checked={(fieldValue || []).includes(option)}
                                                        />
                                                        <ListItemText primary={option} className="members_name" />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        ) : field.type === 'date-range' ? (
                                            <DateRangePicker
                                                key={index}
                                                name={fieldName}
                                                value={
                                                    values[field.name]
                                                        ? values[field.name].map((date) => new Date(date))
                                                        : []
                                                }
                                                onChange={(range) =>
                                                    onChange({
                                                        target: { name: fieldName, value: range },
                                                    })
                                                }
                                            />
                                        ) : (
                                            <TextField
                                                key={index}
                                                name={fieldName}
                                                type={field.type}
                                                className="input_field"
                                                required={field.required}
                                                value={fieldValue}
                                                onChange={(event) => onChange(event)}
                                                placeholder={field.placeholder}
                                                autoCorrect="off"
                                                autoCapitalize="none"
                                                spellCheck="false"
                                                error={!!fieldError}
                                                helperText={fieldError}
                                            />
                                        );
                                    })}
                                </Box>
                            </Box>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}


function CustomizablePopupContent({onClose}) {
    const [formData, setFormData] = useState({
        sale_for_stock_clearance: { checked: false, sku_no: '', price: '', sale_for_stock_clearance_date_range: [] },
        festivals_sale: { checked: false, festival_name: '', offer: '', festivals_sale_date_range: [] },
        special_discount: { checked: false, request: '' },
        hot_sale: {
            checked: false,
            product_type: '',
            show_price: '',
            sale_price: '',
            discounted_price: '',
            hot_sale_date_range: [],
        },
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const customizableCoupon = useSelector((state) => state.coupon.customizable); 
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const [category, field] = name.split('.');
        setFormData((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value,
            },
        }));
    };
    console.log(customizableCoupon)
    console.log(formData)
    // const validateForm = () => {
    //     const newErrors = {};
    //     Object.entries(formData).forEach(([category, data]) => {
    //         if (data.checked) {
    //             newErrors[category] = {};
    //             Object.entries(data).forEach(([key, value]) => {
    //                 if (key !== 'checked' && (!value || value.length === 0)) {
    //                     newErrors[category][key] = `${key.replace('_', ' ')} is required`;
    //                 }
    //             });
    //             if (Object.keys(newErrors[category]).length === 0) {
    //                 delete newErrors[category];
    //             }
    //         }
    //     });
    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };
    

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Format the date ranges and prepare the data
        const formattedDiscounts = { ...formData };
    
        Object.keys(formattedDiscounts).forEach((category) => {
            const data = formattedDiscounts[category];
            if (data.checked) {
                Object.keys(data).forEach((key) => {
                    if (key.includes('date_range') && Array.isArray(data[key])) {
                        // Convert Date objects to strings
                        formattedDiscounts[category][key] = data[key].map((date) =>
                            date instanceof Date ? date.toISOString() : date
                        );
                    }
                });
            }
        });
    
            dispatch(
                addCoupon({
                    type: 'customizable',
                    coupon: { id: Date.now(), discounts: formattedDiscounts },
                })
            );

            setSnackbar({
                open: true,
                message: "Form Submitted successfully.",
                severity: "success",
            });
            setTimeout(()=>{
            if(onClose){
                onClose();
            }
            }, 1500)
    };
    

    const saleOptions = [
        {
            name: 'sale_for_stock_clearance',
            label: 'Sale for stock clearance',
            fields: [
                { name: 'sku_no', placeholder: 'Enter SKU No.', type: 'text', required: true },
                { name: 'price', placeholder: 'Enter Price', type: 'text', required: true },
                { name: 'date_range', type: 'date-range' },
            ],
        },
        {
            name: 'festivals_sale',
            label: 'Festivals sale',
            fields: [
                { name: 'festival_name', placeholder: 'Name of Festival', type: 'text', required: true },
                { name: 'offer', placeholder: 'Offer', type: 'text', required: true },
                { name: 'festivals_sale_date_range', type: 'date-range' },
            ],
        },
        {
            name: 'special_discount',
            label: 'Special Discount',
            fields: [{ name: 'request', placeholder: 'Enter Request', type: 'text', required: true }],
        },
        {
            name: 'hot_sale',
            label: 'Hot Sale',
            fields: [
                {
                    name: 'product_type',
                    placeholder: 'Select Product Type',
                    type: 'select',
                    options: ['Electronics', 'Clothing', 'Accessories'],
                },
                { name: 'show_price', placeholder: 'Show Price', type: 'text', required: true },
                { name: 'sale_price', placeholder: 'Sale Price', type: 'text', required: true },
                { name: 'discounted_price', placeholder: 'Price After Discount', type: 'text', required: true },
                { name: 'hot_sale_date_range', type: 'date-range' },
            ],
        },
    ];


    useEffect(() => {
        if (customizableCoupon) {
            setFormData(customizableCoupon);
        }
    }, [customizableCoupon]);

    
    const theme = createCustomTheme({
        popoverBackgroundColor: 'var(--lightYellow)',
        dialogBackdropColor: 'var(--brown-4)',
        textColor: 'black',
        scrollbarThumb: 'var(--brown)',
        selectedListItemBgColor: '#b67d1c45',
    });

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="offerings_popup_form customizable"
                onSubmit={handleSubmit}
            >
                {saleOptions.map((option, index) => (
                    <CheckboxGroup
                        key={index}
                        label={option.label}
                        name={option.name}
                        fields={option.fields}
                        values={formData[option.name] || {}}
                        onChange={handleInputChange}
                        errors={errors}
                    />
                ))}

                <Box className="submit_button_container">
                    <Button type="submit" variant="contained" className="submit_button">
                        Submit
                    </Button>
                </Box>
            </Box>
            <CustomSnackbar
                open={snackbar.open}
                handleClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                severity={snackbar.severity}
            />
        </ThemeProvider>
    );
}

export default CustomizablePopupContent;
