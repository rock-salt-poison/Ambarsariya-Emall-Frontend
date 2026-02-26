import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import CustomSnackbar from '../../../../CustomSnackbar';
import { getUser, getFixedAssetsData, postFixedAssetsData } from '../../../../../API/fetchExpressAPI';

function FixedAssets_PopupContent({ onClose }) {
    const token = useSelector((state) => state.auth.userAccessToken);
    const [shop_no, setShop_no] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const initialData = {
      length:'',
      breadth:'',
      height:'',
      sku_rack_number:'',
      sku_shelf_number:'',
      fixed_assets_type:'',
      fixed_assets_size:'',
      fixed_assets_condition:'',
      fixed_assets_cost:'',
      fixed_assets_purchased_date:''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    // Fetch shop_no
    useEffect(() => {
        const fetchShopData = async () => {
            if (!token) {
                setFetching(false);
                return;
            }

            try {
                setFetching(true);
                const userResp = (await getUser(token))?.find((u) => u.shop_no !== null);
                
                if (userResp?.shop_no) {
                    setShop_no(userResp.shop_no);
                }
            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setFetching(false);
            }
        };

        fetchShopData();
    }, [token]);

    const formFields = [
        { id: 1, label: 'Enter Shop / Store / Hawker', type:'text', innerField: [
          { id: 1, label: 'Length', name: 'length', type: 'text', behavior:'numeric' },
          { id: 2, label: 'Breadth', name: 'breadth', type: 'text', behavior:'numeric' },
          { id: 3, label: 'Height', name: 'height', type: 'text', behavior:'numeric' },
      ] },
        { id: 2, label: 'SKU Rack Number', name: 'sku_rack_number', type: 'text' },
        { id: 3, label: 'SKU Shelf Number', name: 'sku_shelf_number', type: 'text' },
        {
          id: 4, label: 'Store Fixed Assets', type: 'text', innerField: [
              { id: 1, label: 'Create type', name: 'fixed_assets_type', type: 'text' },
              { id: 2, label: 'Size', name: 'fixed_assets_size', type: 'text'},
              { id: 3, label: 'Select Condition', name: 'fixed_assets_condition', type: 'select', options:['New', 'Working','Not Working', 'Change Required', 'Old']},
              { id: 4, label: 'Cost', name: 'fixed_assets_cost', type: 'text'},
              { id: 5, label: 'Purchased Date', name: 'fixed_assets_purchased_date', type: 'date'},
          ]
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
            if (!field.innerField && !formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
            // Validate inner fields if present
            if (field.innerField) {
                field.innerField.forEach(inner => {
                    const innerName = inner.name;
                    if (!formData[innerName]) {
                        newErrors[innerName] = `${inner.label} is required.`;
                    }
                });
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            if (!shop_no) {
                setSnackbar({
                    open: true,
                    message: 'Shop number is required.',
                    severity: 'error',
                });
                return;
            }

            try {
                setLoading(true);

                // Map form fields to database fields
                const dataToSave = {
                    shop_no: shop_no,
                    length_cm: formData.length ? parseInt(formData.length) : 0,
                    breadth_cm: formData.breadth ? parseInt(formData.breadth) : 0,
                    height_cm: formData.height ? parseInt(formData.height) : 0,
                    sku_rack_no: formData.sku_rack_number ? parseInt(formData.sku_rack_number) : 0,
                    sku_shelf_no: formData.sku_shelf_number ? parseInt(formData.sku_shelf_number) : 0,
                    rack_total_cost: 0, // Can be calculated if needed
                    asset_name: formData.fixed_assets_type || '',
                    size_specification: formData.fixed_assets_size || null,
                    condition: formData.fixed_assets_condition || '',
                    cost: formData.fixed_assets_cost ? parseInt(formData.fixed_assets_cost) : 0,
                    purchase_date: formData.fixed_assets_purchased_date || '',
                    change_required_date: null,
                    days_left: null,
                };

                const response = await postFixedAssetsData(dataToSave);
                
                setSnackbar({
                    open: true,
                    message: response.message || 'Fixed assets data saved successfully.',
                    severity: 'success',
                });

                // Reset form after successful save
                setFormData(initialData);

                // Close popup after a short delay
                setTimeout(() => {
                    if (onClose) {
                        onClose();
                    }
                }, 1500);
            } catch (error) {
                console.error('Error saving fixed assets data:', error);
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message || 'Failed to save fixed assets data. Please try again.',
                    severity: 'error',
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (fetching) {
        return (
            <Box className="loading">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <GeneralLedgerForm
                cName="fixed_assets"
                description="Long-term assets such as store equipment, furniture, and property."
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
            />
            {loading && (
                <Box className="loading">
                    <CircularProgress size={24} />
                </Box>
            )}
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                handleClose={handleCloseSnackbar}
            />
        </>
    );
}

export default FixedAssets_PopupContent