import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../../../Components/Form/GeneralLedgerForm';
import { Box, CircularProgress, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import in_stock from '../../../../Utils/images/Sell/dashboard/merchant_dashboard/in_stock_update.webp'
import { get_in_stock_updates, getUser } from '../../../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';

function InStockUpdatePreview() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
    };
    
    const theme = createCustomTheme(themeProps);
    const token = useSelector((state) => state.auth.userAccessToken);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (token) {
          const fetchUserType = async () => {
            try {
              setLoading(true);
              const userData = (await getUser(token))?.find((u)=>u.shop_no !== null);
                
              if (userData.user_type === "shop" || userData.user_type === "merchant") {
                fetch_in_stock_products(userData.shop_no);
              }
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          fetchUserType();
        }
      }, [token]);

    // const initialData = {
    //     date: '',
    // };

    // const [formData, setFormData] = useState(initialData);
    // const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // const formFields = [
    //     {
    //         id: 1,
    //         label: 'Select date',
    //         name: 'date',
    //         type: 'date',
    //     },
    // ];

    const fetch_in_stock_products = async (shop_no) => {
        if(shop_no){
            try{
                setLoading(true);
                const resp = await get_in_stock_updates(shop_no);
                if(resp.valid){
                    setData(resp?.data);
                }                
            }catch(e){
                console.log(e);
            }finally{
                setLoading(false);
            }
        }
    }

    

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });

    //     // Clear any previous error for this field
    //     setErrors({ ...errors, [name]: null });
    // };

    // const validateForm = () => {
    //     const newErrors = {};

    //     formFields.forEach(field => {
    //         const name = field.name;
    //         // Validate main fields
    //         if (!formData[name]) {
    //             newErrors[name] = `${field.label} is required.`;
    //         }
    //     });

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0; // Return true if no errors
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault(); // Prevent default form submission
    //     if (validateForm()) {
    //         console.log(formData);
    //         // Proceed with further submission logic, e.g., API call
    //     } else {
    //         console.log(errors);
    //     }
    // };

    return (
        <ThemeProvider theme={theme}>
            {loading && <Box className="loading"><CircularProgress/></Box> }
        <Box className="stock_update">
            <Box className="heading_container">
                <Box component="img" src={in_stock} alt="in-stock" className="icon"/>
                <Typography className="heading">In-Stock update</Typography>
            </Box>
            {/* <GeneralLedgerForm
                formfields={formFields}
                handleSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
                errors={errors}
            /> */}

            <Box className="table_container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No.</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>SKU ID</TableCell>
                            <TableCell>Selling price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Max Storage Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((product, index) => ( <TableRow key={index} hover>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{product?.product_id}</TableCell>
                            <TableCell>{product?.sku_id}</TableCell>
                            <TableCell>{product?.selling_price}</TableCell>
                            <TableCell>{product?.quantity_in_stock}</TableCell>
                            <TableCell>{product?.space_available_for_no_of_items}</TableCell>
                        </TableRow>))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell>Total </TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>200</TableCell>
                            <TableCell>50</TableCell>
                            <TableCell>20 </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default InStockUpdatePreview