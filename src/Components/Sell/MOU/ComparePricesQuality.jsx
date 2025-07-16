import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import { useSelector } from 'react-redux';
import { get_mou, get_mou_selected_shops_products } from '../../../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

function ComparePricesQuality() {
    const initialData = {
        item: '',
        subscription:'',
        shops: '',
        groups: '',
        cost_price: '',
        expiry_date: '',
        storing_requirements: '',
        shipping_method: '',
        requirements: '',
        send_to_vendor: '',
        receive_from_vendor: '',
        final_price: '',
    };

    const [formEntries, setFormEntries] = useState([{ ...initialData }]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [subscription, setSubscription] = useState([]);
    const [shops, setShops] = useState([]);
    const [currentMoUData, setCurrentMoUData] = useState([]);
    const {mou_access_token} = useParams();

    const handleAddButton = () => {
        if (formEntries.length < currentMoUData?.products?.length) {
            setFormEntries(prev => [...prev, { ...initialData }]);
        }
    };

    useEffect(() => {
    if (mou_access_token) {
        const fetchMouData = async () => {
            try {
                setLoading(true);
                const resp = await get_mou(mou_access_token);
                console.log(resp);

                if (resp?.valid) {
                    const mouData = resp?.data?.[0];
                    setCurrentMoUData(mouData);

                    if (mouData) {
                        setItems(mouData?.products?.map(p => ({ id: p.id, name: p.name })));
                        setShops(mouData?.details_of_vendors_or_shops);

                        const getAvailableSubscriptions = (product) => {
                            const options = [];
                            if (product.daily_min_quantity != null) options.push("Daily");
                            if (product.weekly_min_quantity != null) options.push("Weekly");
                            if (product.monthly_min_quantity != null) options.push("Monthly");
                            if (product.editable_min_quantity != null) options.push("Editable");
                            return options;
                        };

                        const entries = mouData?.products?.map((product) => {
                            const subscriptionData = getAvailableSubscriptions(product);

                            return {
                                item: product.id,
                                subscription: '',
                                subscription_options: subscriptionData,
                                shops: Array.isArray(mouData?.vendors_or_shops) ? mouData.vendors_or_shops : [],
                                groups: '',
                                cost_price: '',
                                expiry_date: '',
                                storing_requirements: '',
                                shipping_method: '',
                                requirements: '',
                                send_to_vendor: Array.isArray(mouData?.vendors_or_shops) ? mouData.vendors_or_shops : [],
                                receive_from_vendor: '',
                                final_price: '',
                            };
                        });

                        setFormEntries(entries); // ✅ Corrected
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchMouData();
    }
}, [mou_access_token]);


    const handleRemoveButton = () => {
        if (formEntries.length > 1) {
            setFormEntries(prev => prev.slice(0, -1));
        }
    };


    const handleUnifiedChange = (event) => {
    const { name, value } = event.target;
    const [field, indexStr] = name.split('_');
    const index = parseInt(indexStr);

    const updated = [...formEntries];
    const entry = { ...updated[index] };

    if (field === 'item') {
        const selectedItem = currentMoUData?.products?.find((product) => product?.id === value);
        if (selectedItem) {
            entry.requirements = selectedItem.max_stock_size - 0;
        }
    }

    if (field === 'subscription') {
    entry.subscription = value;
    const selectedProductItem = entry.item
    
    
    const selectedItem = currentMoUData?.products?.find(
        (product) => product?.id === selectedProductItem
    );
    console.log(selectedItem);

    if (selectedItem) {
        const key = `${value.toLowerCase()}_min_quantity`;
        const minQty = selectedItem[key];

        if (minQty != null && selectedItem.max_stock_size != null) {
            entry.requirements = selectedItem.max_stock_size - minQty;
        }

        console.log(selectedItem.max_stock_size - minQty);
        console.log(entry.requirements);
        
    }
}

    if(field === 'receive_from_vendor'){
        entry.receive_from_vendor = value
    }

    if (field === 'send_to_vendor') {
        const selected = Array.isArray(value) ? value : [];
        entry[field] = selected;
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
            const key = `${field}_${index}`;
            if (!value || (Array.isArray(value) && value.length === 0)) {
                newErrors[key] = `${field} is required`;
            }
        });

        // Shops-specific validation
        const shops = entry.shops || [];
        const shopsKey = `shops_${index}`;
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
                placeholder: 'Select Item',
                name: `item_${index}`,
                type: 'select',
                value: entry.item,
                options: items?.map((p) => ({ label: p.name, value: p.id })) || [],
            },
            {
                id: `subscription-${index}`,
                label: `Select Subscription (${index + 1})`,
                placeholder: 'Select Subscription',
                name: `subscription_${index}`,
                type: 'select',
                value: entry.subscription,
                options: entry.subscription_options || [],
            },
            {
                id: `shops-${index}`,
                label: 'Select shops',
                name: `shops_${index}`,
                type: 'select-check',
                value: entry.shops,
                options: shops?.map((d) => ({ label: d.business_name, value: d.shop_no })) || [],
            },
            {
                id: `groups-${index}`,
                label: 'Select Attribute (s)',
                name: `groups_${index}`,
                type: 'select',
                value: entry.groups,
                options: ['Cost Price', 'Expiry date', 'Storing requirements', 'Shipping methods'],
            },
            {
                id: entry?.groups === 'Cost Price'
                    ? `cost_price-${index}`
                    : entry?.groups === 'Expiry date'
                    ? `expiry_date-${index}`
                    : entry?.groups === 'Storing requirements'
                    ? `storing_requirements-${index}`
                    : `shipping_method-${index}`,
                label: entry?.groups ? 'Define Your Terms' : 'Select Attribute first',
                name:
                    entry?.groups === 'Cost Price'
                    ? `cost_price_${index}`
                    : entry?.groups === 'Expiry date'
                    ? `expiry_date_${index}`
                    : entry?.groups === 'Storing requirements'
                    ? `storing_requirements_${index}`
                    : `shipping_method_${index}`,
                type: 'text',
                value:
                    entry?.groups === 'Cost Price'
                    ? entry.cost_price
                    : entry?.groups === 'Expiry date'
                    ? entry.expiry_date
                    : entry?.groups === 'Storing requirements'
                    ? entry.storing_requirements
                    : entry?.groups === 'Shipping methods'
                    ? entry.shipping_method
                    : '',
                placeholder:
                    entry?.groups === 'Cost Price'
                    ? '1000700'
                    : entry?.groups === 'Expiry date'
                    ? '50'
                    : entry?.groups === 'Storing requirements'
                    ? '100 /- D'
                    : 'Weight/cost',
                adornmentValue:
                    entry?.groups === 'Cost Price'
                    ? 'Terms : Min Quantity * Cost Price < '
                    : entry?.groups === 'Expiry date'
                    ? 'Terms : Expiry date >= '
                    : entry?.groups === 'Storing requirements'
                    ? 'Terms : Storing item cost per day = '
                    : 'Terms : Mode of transport : Weight / cost',
                },

            {
                id: `requirements-${index}`,
                label: 'Send Requirements : Max stock size - quantity',
                name: `requirements_${index}`,
                placeholder: '0',
                type: 'number',
                value: entry.requirements,
                adornmentValue: 'Send Requirements : Max stock size - quantity = '
            },
            {
                id: `send_to_vendor-${index}`,
                label: 'Send to vendor',
                name: `send_to_vendor_${index}`,
                type: 'select-check',
                value: entry.send_to_vendor ,
                options:shops?.map((d) => ({ label: d.business_name, value: d.shop_no })) || [],
            },
            {
                id: `receive_from_vendor-${index}`,
                label: 'Receive from vendor',
                name: `receive_from_vendor_${index}`,
                type: 'text',
                value: entry.receive_from_vendor,
            },
            {
                id: `final_price-${index}`,
                label: 'Fix final price',
                name: `final_price_${index}`,
                type: 'text',
                value: entry.final_price,
            },
        ];

        if (index === formEntries.length - 1) {
            if (formEntries.length < currentMoUData?.products?.length) {
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
            acc[`${key}_${index}`] = val;
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

    // const fetchSelectedShopProductsData = async (data) => {
    //     try {
    //         setLoading(true);
    //         const selectedItem = currentMoUData?.products?.find((d) => d.id === formEntries[0]?.item);
    //         const resp = await get_mou_selected_shops_products(
    //             selectedItem?.category,
    //             selectedItem?.name,
    //             data?.shop_nos
    //         );
    //         if (resp?.valid) {
    //             setMOUSelectedData(resp?.data);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     if (formEntries[0]?.item) {
    //         fetchSelectedShopProductsData(selectedData);
    //     }
    // }, [formEntries[0]?.item]);

    return (
        <>
            {loading && <Box className="loading"><CircularProgress /></Box>}
            <GeneralLedgerForm
                formfields={combinedFormFields}
                handleSubmit={handleSubmit}
                formData={flattenedFormData} 
                onChange={handleUnifiedChange}
                errors={errors}
                submitButtonText="Send for bidding"
            />
        </>
    );
}

export default ComparePricesQuality;
