import React, { useEffect, useState } from 'react'
import GeneralLedgerForm from '../../Form/GeneralLedgerForm';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { get_category_wise_shops, getUser } from '../../../API/fetchExpressAPI';
import { Box, CircularProgress } from '@mui/material';
import { setSelectedProductAndShops } from '../../../store/mouSelectedProductsSlice';

function IdentifyItem() {
    const initialData = {
        products:'',
        group:'',
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
    const token = useSelector((state) => state.auth.userAccessToken);
    const [purchaserShopNo, setPurchaserShopNo] = useState('');
    const dispatch = useDispatch();
    const selectedData = useSelector(state => state.mou.selectedProductAndShops);

    console.log(allProducts);
    console.log(products);
    
    useEffect(()=>{
        if(token){
            const fetchPurchaserShopNo = async () => {
                const resp = (await getUser(token))?.find((u)=>u?.shop_no !==null);
                if(resp?.user_type === 'merchant' || resp?.user_type === 'shop'){
                    setPurchaserShopNo(resp?.shop_no);
                }
            }
            fetchPurchaserShopNo();
        }
    }, [token]);
    
    const formFields = [
        {
            id: 1,
            label: 'Select product (s) cum',
            name: 'products',
            type: 'select-check',
            options : products.map((p) => ({label: p.product_name,value : p.product_id })),
            // value : selectedData?.product_id || ''
            // adornmentValue:<SearchIcon/>
        },
        {
            id: 2,
            label: 'Group',
            name: 'group',
            type: 'text', 
            placeholder: '-',
            adornmentValue : 'Group : '
        },
        {
            id: 3,
            label: 'Select vendor(s)',
            name: 'vendors',
            type: 'select-check',
            options:vendors?.map((v)=>({label: v.business_name, value : v.shop_no })),
            // value: selectedData?.shop_nos || ''
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

                // const selectedProduct = formData?.products ? products?.find(p=>p.product_id === formData?.products) : selectedData?.product_id && products?.find(p=>p.product_id === selectedData?.product_id);
    
                try{
                    setLoading(true);
                    const resp = await get_category_wise_shops(products?.[0]?.shop_no, purchaserShopNo);                    
                    if(resp?.valid){
                        console.log(resp.data);
                        setVendors(resp?.data);
                        setFormData((prev)=>({
                            ...prev,
                            group: `${resp?.data?.[0]?.domain_name} - ${resp?.data?.[0]?.sector_name}`
                        }))
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

        // Handle 'vendors' validation
        if (name === 'vendors') {
            // Ensure value is treated as an array
            const selected = Array.isArray(value) ? value : [];

            if (selected.length < 2) {
            setErrors((e) => ({
                ...e,
                [name]: 'Please select at least 2 shops.',
            }));
            }else if (selected.length > 3) {
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

        // For all other fields
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((e) => ({
            ...e,
            [name]: null,
        }));
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
            // const selectedCategories = [
            //         ...new Set(
            //         formData.products
            //             .map((productId) => {
            //             const match = products?.find((p) => p?.product_id === productId);
            //             return match?.category || null;
            //             })
            //             .filter((cat) => cat !== null)
            //         ),
            //     ];
                const selectedProducts = 
                    formData.products
                        .map((productId) => {
                        const match = products?.find((p) => p?.product_id === productId);
                        console.log(match);
                        
                        return {id: productId, name : match?.product_name, category: match?.category, max_stock_size: match?.max_stock_quantity} || null;
                        });
            dispatch(setSelectedProductAndShops({
                products: selectedProducts,
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