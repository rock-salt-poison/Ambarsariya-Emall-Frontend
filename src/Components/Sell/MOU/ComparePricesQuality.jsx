import React, { useEffect, useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import { useSelector } from 'react-redux';
import { get_mou_selected_shops_products } from '../../../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';

function ComparePricesQuality() {
    const initialData = {
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
    const [selecteddata, setSelectedData] = useState([]);
    const selectedData = useSelector(state => state.mou.selectedProductAndShops);

    console.log(selectedData);
    

    const formFields = [
        {
            id: 1,
            label: 'Select shops',
            name: 'shops',
            type: 'select-check',
            options:selecteddata?.map((d)=>d.business_name),
        },
        {
            id: 2,
            label: 'Select Attribute (s)',
            name: 'groups',
            type: 'select',
            options:['Cost Price', 'Expiry date', 'Storing requirements', 'Shipping methods'],
        },
        {
            id: 3,
            label: `1000700`,
            name: 'vendor_or_shop',
            type: 'text',
            adornmentValue: 'Define Your Terms : Min Quantity * Cost Price < '
        },
        {
            id: 4,
            label: 'Send Requirements : max_stock_size - quantity',
            name: 'requirements',
            type: 'text',   
        },
        {
            id: 5,
            label: 'Receive quote price and sample',
            name: 'receive_quote_price',
            type: 'text',
        },
        {
            id: 6,
            label: 'Set price and quality',
            name: 'price_and_quality',
            type: 'text',
        },
        {
            id: 7,
            label: 'Send to vendor',
            name: 'send_to_vendor',
            type: 'text',
        },
        {
            id: 8,
            label: 'Receive from vendor',
            name: 'receive_from_vendor',
            type: 'text',
        },
        {
            id: 9,
            label: 'Fix final price',
            name: 'final_price',
            type: 'text',
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

    const fetchSelectedShopProductsData = async (data) => {
        try{
            setLoading(true);
            const resp = await get_mou_selected_shops_products(data?.category, data?.product_name, data?.shop_nos);
            if(resp?.valid){
                setSelectedData(resp?.data)
                console.log(resp);
            }
        }catch(e){
            console.log(e);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(selectedData){
            fetchSelectedShopProductsData(selectedData);
        }
    }, [selectedData]);


  return (
    <>
    {loading && <Box className="loading"><CircularProgress/></Box>}
    <GeneralLedgerForm
        formfields={formFields}
        handleSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        errors={errors}
        submitButtonText="Repeat the bidding"
    />
    </>
  )
}

export default ComparePricesQuality