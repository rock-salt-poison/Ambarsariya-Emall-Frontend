import React, { useEffect, useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { get_category_wise_shops } from '../../../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';

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
    const products = useSelector((state) => state.cart.selectedProducts);

    // console.log(products);
    console.log(formData?.products);
    
    const formFields = [
        {
            id: 1,
            label: 'Select product (s) cum',
            name: 'products',
            type: 'select-check',
            options : products.map((p) => ({label: p.product_name,value : p.product_id })),
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
            options:vendors?.map((v)=>v.shop_no),
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
        if(formData?.products){
            const fetch_shops =async ()=>{
                const selectedCategories = [
                    ...new Set(
                    formData.products
                        .map((productId) => {
                        const match = products?.find((p) => p?.product_id === productId);
                        return match?.category || null;
                        })
                        .filter((cat) => cat !== null)
                    ),
                ];
    
                try{
                    setLoading(true);
                    const resp = await get_category_wise_shops(selectedCategories);
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
    }, [formData?.products]);

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