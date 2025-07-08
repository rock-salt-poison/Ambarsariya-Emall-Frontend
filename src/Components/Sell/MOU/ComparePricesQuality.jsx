import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import { useSelector } from 'react-redux';
import { get_mou_selected_shops_products } from '../../../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';

function ComparePricesQuality() {
    const initialData = {
        item: '',
        shops: '',
        groups: '',
        vendor_or_shop: '',
        requirements: '',
        send_to_vendor: '',
        receive_from_vendor: '',
        final_price: '',
    };

    const [formEntries, setFormEntries] = useState([{ ...initialData }]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [mouSelectedData, setMOUSelectedData] = useState([]);
    const selectedData = useSelector(state => state.mou.selectedProductAndShops);

    const handleAddButton = () => {
        if (formEntries.length < selectedData?.products?.length) {
            setFormEntries(prev => [...prev, { ...initialData }]);
        }
    };

    const handleRemoveButton = () => {
        if (formEntries.length > 1) {
            setFormEntries(prev => prev.slice(0, -1));
        }
    };


    const handleUnifiedChange = (event) => {
    const { name, value } = event.target;
    const [field, indexStr] = name.split('__');
    const index = parseInt(indexStr);

    const updated = [...formEntries];
    const entry = { ...updated[index] };

    if (field === 'item') {
        const selectedItem = selectedData?.products?.find((product) => product?.id === value);
        if (selectedItem) {
            entry.requirements = selectedItem.max_stock_size - 1;
        }
    }

    if (field === 'groups' && value === 'Expiry date') {
        calculateDaysLeft('2025-07-11');
    }

    if (field === 'shops') {
        const selected = Array.isArray(value) ? value : [];
        entry[field] = selected;

        if (selected.length < 2) {
            setErrors((prev) => ({
                ...prev,
                [name]: 'Please select at least 2 shops.',
            }));
        } else if (selected.length > 3) {
            setErrors((prev) => ({
                ...prev,
                [name]: 'Please select maximum 3 shops only.',
            }));
        } else {
            setErrors((prev) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    } else {
        entry[field] = value;
        setErrors((prev) => {
            const updatedErrors = { ...prev };
            delete updatedErrors[name];
            return updatedErrors;
        });
    }

    updated[index] = entry;
    setFormEntries(updated);
};

const validateAllEntries = () => {
    const newErrors = {};

    formEntries.forEach((entry, index) => {
        Object.entries(entry).forEach(([field, value]) => {
            const key = `${field}__${index}`;
            if (!value || (Array.isArray(value) && value.length === 0)) {
                newErrors[key] = `${field} is required`;
            }
        });

        // Shops-specific validation
        const shops = entry.shops || [];
        const shopsKey = `shops__${index}`;
        if (!Array.isArray(shops) || shops.length < 2) {
            newErrors[shopsKey] = 'Please select at least 2 shops.';
        } else if (shops.length > 3) {
            newErrors[shopsKey] = 'Please select maximum 3 shops only.';
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};



    const calculateDaysLeft = (expDate) => {
        const today = new Date();
        const expiry = new Date(expDate);
        const timeDiff = expiry - today;
        const msInDay = 24 * 60 * 60 * 1000;
        const result = Math.ceil(timeDiff / msInDay);
        console.log('Days left: ', result);
    };

    const combinedFormFields = formEntries.flatMap((entry, index) => {
        const group = [
            {
                id: `item-${index}`,
                label: `Select Item (${index + 1})`,
                name: `item__${index}`,
                type: 'select',
                value: entry.item,
                options: selectedData?.products?.map((p) => ({ label: p.name, value: p.id })) || [],
            },
            {
                id: `shops-${index}`,
                label: 'Select shops',
                name: `shops__${index}`,
                type: 'select-check',
                value: entry.shops,
                options: mouSelectedData?.map((d) => ({ label: d.business_name, value: d.shop_no })) || [],
            },
            {
                id: `groups-${index}`,
                label: 'Select Attribute (s)',
                name: `groups__${index}`,
                type: 'select',
                value: entry.groups,
                options: ['Cost Price', 'Expiry date', 'Storing requirements', 'Shipping methods'],
            },
            {
                id: `vendor_or_shop-${index}`,
                label: entry?.groups ? 'Define Your Terms' : 'Select Attribute first',
                name: `vendor_or_shop__${index}`,
                type: 'text',
                value: entry.vendor_or_shop,
                placeholder:
                    entry?.groups === 'Cost Price' ? '1000700'
                        : entry?.groups === 'Expiry date' ? '50'
                        : entry?.groups === 'Storing requirements' ? '100 /- D'
                        : '',
                adornmentValue:
                    entry?.groups === 'Cost Price' ? 'Terms : Min Quantity * Cost Price < '
                        : entry?.groups === 'Expiry date' ? 'Terms : Expiry date >= '
                        : entry?.groups === 'Storing requirements' ? 'Terms : Storing item cost per day = '
                        : 'Terms : Enter mode of transport : Weight / cost',
            },
            {
                id: `requirements-${index}`,
                label: 'Send Requirements : Max stock size - quantity',
                name: `requirements__${index}`,
                placeholder: '0',
                type: 'number',
                value: entry.requirements,
                adornmentValue: 'Send Requirements : Max stock size - quantity = '
            },
            {
                id: `send_to_vendor-${index}`,
                label: 'Send to vendor',
                name: `send_to_vendor__${index}`,
                type: 'select-check',
                value: Array.isArray(entry.send_to_vendor) ? entry.send_to_vendor : [],
                options: Array.isArray(entry.shops) ? entry.shops : [],
            },
            {
                id: `receive_from_vendor-${index}`,
                label: 'Receive from vendor',
                name: `receive_from_vendor__${index}`,
                type: 'text',
                value: entry.receive_from_vendor,
            },
            {
                id: `final_price-${index}`,
                label: 'Fix final price',
                name: `final_price__${index}`,
                type: 'text',
                value: entry.final_price,
            },
        ];

        if (index === formEntries.length - 1) {
            if (formEntries.length < selectedData?.products?.length) {
                group.push({
                    id: `add-button-${index}`,
                    type: 'button',
                    value: 'Add',
                    handleButtonClick: handleAddButton
                });
            }

            if (formEntries.length > 1) {
                group.push({
                    id: `remove-button-${index}`,
                    type: 'button',
                    value: 'Remove',
                    handleButtonClick: handleRemoveButton
                });
            }
        }


        return group;
    });

    // ✅ Flatten formEntries to match expected field names
    const flattenedFormData = formEntries.reduce((acc, entry, index) => {
        Object.entries(entry).forEach(([key, val]) => {
            acc[`${key}__${index}`] = val;
        });
        return acc;
    }, {});

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateAllEntries()) {
            console.log('Submitted entries:', formEntries);
            // Proceed with further submission logic, e.g., API call
        } else {
            console.log(errors);
        }
    };

    const fetchSelectedShopProductsData = async (data) => {
        try {
            setLoading(true);
            const selectedItem = selectedData?.products?.find((d) => d.id === formEntries[0]?.item);
            const resp = await get_mou_selected_shops_products(
                selectedItem?.category,
                selectedItem?.name,
                data?.shop_nos
            );
            if (resp?.valid) {
                setMOUSelectedData(resp?.data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (formEntries[0]?.item) {
            fetchSelectedShopProductsData(selectedData);
        }
    }, [formEntries[0]?.item]);

    return (
        <>
            {loading && <Box className="loading"><CircularProgress /></Box>}
            <GeneralLedgerForm
                formfields={combinedFormFields}
                handleSubmit={handleSubmit}
                formData={flattenedFormData} // ✅ Correct formData format
                onChange={handleUnifiedChange}
                errors={errors}
                submitButtonText="Send for bidding"
            />
        </>
    );
}

export default ComparePricesQuality;
