import React, { useEffect, useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import { useSelector } from 'react-redux';
import { get_mou_selected_shops_products } from '../../../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';

function ComparePricesQuality() {
    const initialData = {
        item:'',
        shops:'',
        groups:'',
        vendor_or_shop:'',
        requirements:'',
        receive_quote_price:'',
        price_and_quality:'',
        send_to_vendor:'',
        receive_from_vendor:'',
        final_price:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [mouSelectedData, setMOUSelectedData] = useState([]);
    const selectedData = useSelector(state => state.mou.selectedProductAndShops);
    const allProducts = useSelector((state) => state.cart.selectedProducts);
    const products = allProducts.filter((p) => p.subscribe === true);
    const [requirement, setRequirement] = useState(0);

    console.log(selectedData);
    
    const handleAddButton = async () => {
        
    }

    const formFields = [
        {
            id: 1,
            label: 'Select Item',
            name: 'item',
            type: 'select',
            options:selectedData?.products?.map((p)=>({label: p.name, value: p.id})),
        },
        {
            id: 2,
            label: 'Select shops',
            name: 'shops',
            type: 'select-check',
            options:mouSelectedData?.map((d)=>({label: d.business_name, value: d.shop_no})),
        },
        {
            id: 3,
            label: 'Select Attribute (s)',
            name: 'groups',
            type: 'select',
            options:['Cost Price', 'Expiry date', 'Storing requirements', 'Shipping methods'],
        },
        {
            id: 4,
            label: formData?.groups ? 'Define Your Terms' : 'Select Attribute first',
            placeholder : formData?.groups === 'Cost Price' ? `1000700` : formData?.groups === 'Expiry date' ? '50' : formData?.groups === 'Storing requirements' ? '100 /- D' : ' ',
            name: 'vendor_or_shop',
            type: 'text',
            adornmentValue: formData?.groups === 'Cost Price' ? 'Terms : Min Quantity * Cost Price < ' : formData?.groups  === 'Expiry date' ? 'Terms : Expiry date >= ' : formData?.groups === 'Storing requirements' ? 'Terms : Storing item cost per day = ' : 'Terms : Enter mode of transport : Weight / cost'
        },
        {
            id: 5,
            label: 'Send Requirements : Max stock size - quantity',
            placeholder : '0',
            name: 'requirements',
            type: 'number',
            adornmentValue: 'Send Requirements : Max stock size - quantity = '
        },
        // {
        //     id: 5,
        //     label: 'Receive quote price and sample',
        //     name: 'receive_quote_price',
        //     type: 'text',
        // },
        // {
        //     id: 6,
        //     label: 'Set price and quality',
        //     name: 'price_and_quality',
        //     type: 'text',
        // },
        {
            id: 6,
            label: 'Send to vendor',
            name: 'send_to_vendor',
            type: 'select-check',
            options: formData?.shops ? formData?.shops : []
        },
        {
            id: 7,
            label: 'Receive from vendor',
            name: 'receive_from_vendor',
            type: 'text',
        },
        {
            id: 8,
            label: 'Fix final price',
            name: 'final_price',
            type: 'text',
        },
        (selectedData?.products)?.length > 0 && {
             id: 9,
             type:'button',
            value: 'Add',
            handleButtonClick: handleAddButton
        }
    ];

    

    const calculateDaysLeft = (expDate) => {
        const today = new Date();
        const expiry = new Date(expDate);
        const timeDiff = expiry - today;
        const msInDay = 24 * 60 * 60 * 1000;
        const result = Math.ceil(timeDiff / msInDay);
        console.log('Days left: ', result);
    };



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if(name=== 'groups' && value === 'Expiry date'){
            console.log(value);
            
            calculateDaysLeft('2025-07-11');
        }

        if(name === 'item'){
            const selectedItem = selectedData?.products?.find((product)=>product?.id === value);
            if(selectedItem){
                setFormData((prev) => ({
            ...prev,
            requirements: selectedItem?.max_stock_size-1,
            }));
            }
        }

        if (name === 'shops') {
            // Ensure value is treated as an array
            const selected = Array.isArray(value) ? value : [];

            // const selectedShops

            if (selected.length < 2) {
            setErrors((e) => ({
                ...e,
                [name]: 'Please select at least 2 shops.',
            }));
            } else if (selected.length > 3) {
            setErrors((e) => ({
                ...e,
                [name]: 'Please select maximum 3 shops only.',
            }));
            } else {
            setErrors((e) => ({
                ...e,
                [name]: null,
            }));
            }

            setFormData((prev) => ({
            ...prev,
            [name]: selected,
            }));
            return; // Exit early for vendors
        }

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

    const fetchSelectedShopProductsData = async (data) => {
        try{
            setLoading(true);
            const selectedProduct = selectedData?.products?.find((d)=>d.id===formData?.item);
            console.log(selectedProduct);
            
            const resp = await get_mou_selected_shops_products(selectedProduct?.category, selectedProduct?.name, data?.shop_nos);
            if(resp?.valid){
                setMOUSelectedData(resp?.data)
                console.log(resp);
            }
        }catch(e){
            console.log(e);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(formData?.item){
            fetchSelectedShopProductsData(selectedData);
        }
    }, [formData?.item]);


  return (
    <>
    {loading && <Box className="loading"><CircularProgress/></Box>}
    <GeneralLedgerForm
        formfields={formFields}
        handleSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        errors={errors}
        submitButtonText="Send for bidding"
    />
    </>
  )
}

export default ComparePricesQuality