import React, { useEffect, useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { get_category_wise_shops } from '../../../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';
import { setSelectedProductAndShops } from '../../../store/mouSelectedProductsSlice';

function IdentifyItem() {
    const initialData = {
        products:'',
        groups:'',
        vendors:'',
        details_of_vendor:'',
        last_conversation:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    const allProducts = useSelector((state) => state.cart.selectedProducts);
    const products = allProducts.filter((p) => p.subscribe === true);
    const dispatch = useDispatch();
    const selectedData = useSelector(state => state.mou.selectedProductAndShops);

    console.log(products);
    console.log(formData?.products);
    
    const formFields = [
        {
            id: 1,
            label: 'Select product (s) cum',
            name: 'products',
            type: 'select',
            options : products.map((p) => ({label: p.product_name,value : p.product_id })),
            value : selectedData?.product_id || ''
            // adornmentValue:<SearchIcon/>
        },
        {
            id: 2,
            label: 'Select group (s)',
            name: 'groups',
            type: 'select-check',
            options:['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5','Group 6', 'Group 7','Group 8','Group 9','Group 10'],
        },
        {
            id: 3,
            label: 'Select vendor(s)',
            name: 'vendors',
            type: 'select-check',
            options:vendors?.map((v)=>({label: v.business_name,value : v.shop_no })),
            value: selectedData?.shop_nos || []
        },
        {
            id: 4,
            label: 'Show all details of vendor / shop(s)',
            name: 'details_of_vendor',
            type: 'text',   
        },
        {
            id: 5,
            label: 'Last conversation',
            name: 'last_conversation',
            type: 'text',
        },
    ];

    useEffect(()=>{
        if(formData?.products || selectedData){
            const fetch_shops =async ()=>{
                // const selectedCategories = [
                //     ...new Set(
                //     formData.products
                //         .map((productId) => {
                //         const match = products?.find((p) => p?.product_id === productId);
                //         return match?.category || null;
                //         })
                //         .filter((cat) => cat !== null)
                //     ),
                // ];

                const selectedProduct = formData?.products ? products?.find(p=>p.product_id === formData?.products) : selectedData?.product_id && products?.find(p=>p.product_id === selectedData?.product_id);
    
                try{
                    setLoading(true);
                    const resp = await get_category_wise_shops(selectedProduct?.category, selectedProduct?.product_name);
                    console.log(resp);
                    
                    if(resp?.valid){
                        console.log(resp.data);
                        setVendors(resp?.data);
                    }
                    
                }catch(e){
                    console.log(e);
                }finally{
                    setLoading(false);
                }
            }
            fetch_shops();
        }
    }, [formData?.products, selectedData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if(name === 'vendors'){
            if(value.length<2){
                setErrors({ ...errors, [name]: 'Please select at least 2 options.' })
            }
        }

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

            const selectedProduct = products.find((p)=> p.product_id === formData?.products);
            dispatch(setSelectedProductAndShops({
                product_name: selectedProduct?.product_name,
                category: selectedProduct?.category,
                product_id: selectedProduct?.product_id,
                shop_nos: formData?.vendors
            }));

            // Proceed with further submission logic, e.g., API call
        } else {
            console.log(errors);
        }
    };
  return (
    <>
        {loading && <Box className="loading"><CircularProgress/></Box> }
        <GeneralLedgerForm
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            submitButtonText="Create Mou"
        />
    </>
  )
}

export default IdentifyItem