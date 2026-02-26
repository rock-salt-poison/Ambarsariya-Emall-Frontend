import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import CustomSnackbar from '../../../../CustomSnackbar';
import {
    getUser,
    getShopUserData,
    getSupplierShops,
    get_shop_categories,
    get_shop_products,
    get_shop_product_items,
    postAccountsPayableData
} from '../../../../../API/fetchExpressAPI';

function AccountsPayable_PopupContent({ onClose }) {
    const token = useSelector((state) => state.auth.userAccessToken);
    const [current_shop_no, setCurrent_shop_no] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const initialData = {
        shopNo: '',
        created_contact: '',
        category: '',
        products: '',
        items: '',
        quantity: 0,
        no_of_items: '',
        cost: '0',
        advance_payment: '',
        balance_amount: '0',
        date_time: ''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [showContactField, setShowContactField] = useState(false);
    const [supplierShops, setSupplierShops] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);

    // Fetch current shop_no and supplier shops
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
                    setCurrent_shop_no(userResp.shop_no);
                    
                    // Fetch shop user data to get domain, sector, and category
                    let domainId = null;
                    let sectorId = null;
                    let categoryIds = null;
                    
                    if (userResp.shop_access_token) {
                        try {
                            const shopData = await getShopUserData(userResp.shop_access_token);
                            if (shopData && shopData.length > 0) {
                                domainId = shopData[0].domain_id;
                                sectorId = shopData[0].sector_id;
                                categoryIds = shopData[0].category || [];
                            }
                        } catch (error) {
                            console.error('Error fetching shop user data:', error);
                        }
                    }
                    
                    // Fetch supplier shops (excluding current shop, with same domain, sector, and category)
                    try {
                        const shopsResp = await getSupplierShops(
                            userResp.shop_no,
                            domainId,
                            sectorId,
                            categoryIds
                        );
                        if (shopsResp?.valid && shopsResp?.data) {
                            setSupplierShops(shopsResp.data);
                        }
                    } catch (error) {
                        console.error('Error fetching supplier shops:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setFetching(false);
            }
        };

        fetchShopData();
    }, [token]);

    // Fetch categories when supplier shop is selected
    useEffect(() => {
        const fetchCategories = async () => {
            if (formData.shopNo && formData.shopNo !== 'Create Contact') {
                try {
                    setLoading(true);
                    const categoriesResp = await get_shop_categories(formData.shopNo);
                    if (categoriesResp?.valid) {
                        setCategories(categoriesResp?.data || []);
                    } else {
                        setCategories([]);
                    }
                    // Reset dependent fields
                    setProducts([]);
                    setItems([]);
                    setFormData(prev => ({
                        ...prev,
                        category: '',
                        products: '',
                        items: '',
                        quantity: 0,
                        no_of_items: '',
                        cost: '0',
                        balance_amount: '0'
                    }));
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    setCategories([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setCategories([]);
                setProducts([]);
                setItems([]);
            }
        };

        fetchCategories();
    }, [formData.shopNo]);

    // Fetch products when category is selected
    useEffect(() => {
        const fetchProducts = async () => {
            if (formData.category && formData.shopNo && categories.length > 0) {
                const selectedCategory = categories.find(c => c.category_name === formData.category);
                
                if (selectedCategory) {
                    try {
                        setLoading(true);
                        const productsResp = await get_shop_products(formData.shopNo, selectedCategory.category_id);
                        if (productsResp?.valid) {
                            setProducts(productsResp?.data || []);
                        } else {
                            setProducts([]);
                        }
                        // Reset dependent fields
                        setItems([]);
                        setFormData(prev => ({
                            ...prev,
                            products: '',
                            items: '',
                            quantity: 0,
                            no_of_items: '',
                            cost: '0',
                            balance_amount: '0'
                        }));
                    } catch (error) {
                        console.error('Error fetching products:', error);
                        setProducts([]);
                    } finally {
                        setLoading(false);
                    }
                }
            } else {
                setProducts([]);
                setItems([]);
            }
        };

        fetchProducts();
    }, [formData.category, formData.shopNo, categories]);

    // Fetch items when product is selected
    useEffect(() => {
        const fetchItems = async () => {
            if (formData.products && products.length > 0) {
                const selectedProduct = products.find(p => p.product_name === formData.products);
                
                if (selectedProduct?.product_id) {
                    try {
                        setLoading(true);
                        const itemsResp = await get_shop_product_items(selectedProduct.product_id);
                        if (itemsResp?.valid) {
                            setItems(itemsResp?.data || []);
                        } else {
                            setItems([]);
                        }
                        // Reset dependent fields
                        setFormData(prev => ({
                            ...prev,
                            items: '',
                            quantity: 0,
                            no_of_items: '',
                            cost: '0',
                            balance_amount: '0'
                        }));
                    } catch (error) {
                        console.error('Error fetching items:', error);
                        setItems([]);
                    } finally {
                        setLoading(false);
                    }
                }
            } else {
                setItems([]);
            }
        };

        fetchItems();
    }, [formData.products, products]);

    const formFields = [
        {
            id: 1,
            label: 'Select Shop No Or Create Contact',
            name: 'shopNo',
            type: 'select',
            options: ['Create Contact', ...supplierShops.map(s => s.shop_no)]
        },

        ...(showContactField ? [{
            id: 2,
            label: 'Create Contact',
            name: 'created_contact',
            type: 'text', // Adjust the type based on your requirements
        }] : []),
        {
            id: 3,
            label: 'Select Category',
            name: 'category',
            type: 'select',
            options: categories.map(c => c.category_name),
            disabled: !formData.shopNo || formData.shopNo === 'Create Contact'
        },
        {
            id: 4,
            label: 'Select Products',
            name: 'products',
            type: 'select',
            options: products.map(p => p.product_name),
            disabled: !formData.category
        },
        {
            id: 5,
            label: 'Select Item',
            name: 'items',
            type: 'select',
            options: items.map(i => i.item_name),
            disabled: !formData.products
        },
        {
            id: 6,
            label: 'Select No. of quantity',
            name: 'quantity',
            type: 'quantity'
        },  // Quantity field
        {
            id: 7,
            label: 'Total no. items',
            name: 'no_of_items',
            type: 'number',
        },
        {
            id: 8,
            label: 'Total cost',
            name: 'cost',
            type: 'number',
            readOnly:true,
        },
        {
            id: 9,
            label: 'Advance Payment',
            name: 'advance_payment',
            type: 'text',
            behavior:'numeric'
        },
        {
            id: 10,
            label: 'Balance',
            name: 'balance_amount',
            type: 'number',
            readOnly:true,
        },
        {
            id: 11,
            label: 'Date / Time',
            name: 'date_time',
            type: 'datetime-local'
        },
        {
            id: 12,
            label: 'Balance No. of items',
            name: 'balance_no_of_items',
            type: 'number',
            readOnly:true,
        },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedFormData = { ...formData, [name]: value };

        if (name === 'shopNo') {
            setShowContactField(value === 'Create Contact'); // Show contact field if "Create Contact" is selected
        }

        // Calculate balance when cost or advance_payment changes
        if (name === 'cost' || name === 'advance_payment') {
            const cost = name === 'cost' ? parseInt(value) || 0 : parseInt(formData.cost) || 0;
            const advancePayment = name === 'advance_payment' ? parseInt(value) || 0 : parseInt(formData.advance_payment) || 0;
            updatedFormData.balance_amount = (cost - advancePayment).toString();
        }

        setFormData(updatedFormData);

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    // Handle Increment/Decrement for Quantity
    const handleIncrement = () => {
        setFormData(prevState => ({ ...prevState, quantity: parseInt(prevState.quantity) + 1 }));
    };

    const handleDecrement = () => {
        setFormData(prevState => {
            const newQuantity = parseInt(prevState.quantity) - 1;
            return { ...prevState, quantity: newQuantity >= 0 ? newQuantity : 0 }; // Prevent negative quantity
        });
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach(field => {
            const name = field.name;
            // Skip validation for disabled fields and conditional fields
            if (field.disabled) {
                return;
            }
            // Skip validation for created_contact if "Create Contact" is not selected
            if (name === 'created_contact' && !showContactField) {
                return;
            }
            // Validate main fields
            if (name && !formData[name] && name !== 'balance_amount') {
                newErrors[name] = `${field.label} is required.`;
            }
        });

        // Additional validation
        if (formData.shopNo === 'Create Contact' && !formData.created_contact) {
            newErrors.created_contact = 'Contact name is required when creating a new contact.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            if (!current_shop_no) {
                setSnackbar({
                    open: true,
                    message: 'Current shop number is required.',
                    severity: 'error',
                });
                return;
            }

            if (formData.shopNo === 'Create Contact') {
                setSnackbar({
                    open: true,
                    message: 'Please select a supplier shop or create a contact first.',
                    severity: 'error',
                });
                return;
            }

            try {
                setLoading(true);

                // Find selected category, product, and item IDs
                const selectedCategory = categories.find(c => c.category_name === formData.category);
                const selectedProduct = products.find(p => p.product_name === formData.products);
                const selectedItem = items.find(i => i.item_name === formData.items);

                if (!selectedCategory || !selectedProduct || !selectedItem) {
                    setSnackbar({
                        open: true,
                        message: 'Please select valid category, product, and item.',
                        severity: 'error',
                    });
                    return;
                }

                // Calculate balance
                const totalCost = parseInt(formData.cost) || 0;
                const advancePayment = parseInt(formData.advance_payment) || 0;
                const balance = totalCost - advancePayment;

                // Map form fields to database fields
                const dataToSave = {
                    shop_no: current_shop_no,
                    supplier_shop_no: formData.shopNo,
                    category_id: selectedCategory.category_id,
                    product_id: selectedProduct.product_id,
                    item_id: selectedItem.item_id,
                    quantity: parseInt(formData.quantity) || 0,
                    total_items: parseInt(formData.no_of_items) || 0,
                    total_cost: totalCost,
                    advance_payment: advancePayment,
                    from_date: formData.date_time ? new Date(formData.date_time).toISOString().split('T')[0] : null,
                    to_date: null,
                };

                const response = await postAccountsPayableData(dataToSave);
                
                setSnackbar({
                    open: true,
                    message: response.message || 'Accounts payable data saved successfully.',
                    severity: 'success',
                });

                // Reset form after successful save
                setFormData(initialData);
                setCategories([]);
                setProducts([]);
                setItems([]);

                // Close popup after a short delay
                setTimeout(() => {
                    if (onClose) {
                        onClose();
                    }
                }, 1500);
            } catch (error) {
                console.error('Error saving accounts payable data:', error);
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message || 'Failed to save accounts payable data. Please try again.',
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
                cName="accounts_payable"
                description="Amounts the store owes to suppliers and vendors."
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
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

export default AccountsPayable_PopupContent;
