import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { get_products } from '../../../../API/fetchExpressAPI';

function DashboardComponents({data}) {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const { token } = useParams();

    const card_data = [
        { id: 1, heading: 'Today\'s Sale Orders', value: '1249' },
        { id: 2, heading: 'Today\s Subscriptions Orders', value: '1249' },
        { id: 3, heading: 'Today\'s Counter Orders', value: '1249' },
        { id: 4, heading: 'Today\'s Completed Orders', value: '1249' },
        { id: 5, heading: 'Today\'s Pending Orders', value: '1249' },
        { id: 6, heading: 'Today\'s Total Sale', value: '1249' },
        { id: 7, heading: 'P.O. Number', value: '1249' },
        { id: 8, heading: 'S.O. Number', value: '1249' },
    ];

    console.log(token);
    
    function createData(id, products, qty, cost_price, selling_price, price_after_coupons, offer_price, services_applied, final_so, payment_status, final_status) {
        return { id, products, qty, cost_price, selling_price, price_after_coupons, offer_price, services_applied, final_so, payment_status, final_status };
    }

    const rows = [
        createData(
            1,
            "Product00124579635",
            "12",
            499,
            599,
            550,
            520,
            "Pickup, Home Visit",
            500,
            "Paid",
            "Done"
        ),
        createData(
            2,
            "Product00975214823",
            "40",
            499,
            599,
            550,
            520,
            "Delivery",
            500,
            "Pending",
            "Hold"
        ),
        createData(
            3,
            "Product00465784545",
            "90",
            499,
            599,
            550,
            520,
            "Home Visit",
            500,
            "Failed",
            "Denied"
        ),
    ];

    const fetch_products = async (shop_no) => {
        try{
            setLoading(false);
            if(shop_no){
                const resp = await get_products(shop_no);
                if(resp.valid){
                    setProducts(resp.data);
                }
            }

        }catch(e){
            console.log(e);
            
        }finally{
            setLoading(false);
        }
    }
    
    useEffect(()=> {
        if(data){
            fetch_products(data.shop_no);
        }
    }, [data])

  return (
    <>
        <Box className="col">
            {loading && <Box className="loading"><CircularProgress/></Box>}
                    <Box className="container">
                        {card_data.map((card) => {
                            return <Box className="card" key={card.id}>
                                <Typography className='heading'>
                                    {card.heading}
                                </Typography>
                                <Typography className="number">
                                    {card.value}
                                </Typography>
                            </Box>
                        })}

                    </Box>
                </Box>
                <Box className="col">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Quantity
                                    <Typography component="span">(in stock)</Typography>
                                </TableCell>
                                <TableCell>Cost Price</TableCell>
                                <TableCell>Selling Price</TableCell>
                                <TableCell>P.O Quantity
                                    {/* <Typography component="span">(After coupons)</Typography> */}
                                </TableCell>
                                {/* <TableCell>Total Price</TableCell>
                                <TableCell>List of services applied</TableCell>
                                <TableCell>Final S.O.</TableCell>
                                <TableCell>Payment status</TableCell>
                                <TableCell>Final status</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row, index) => (
                                <TableRow
                                    key={row.product_id}
                                    hover
                                >
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{row.product_name}</TableCell>
                                    <TableCell>{row.inventory_or_stock_quantity}</TableCell>
                                    <TableCell>{parseInt(row.inventory_or_stock_quantity) - parseInt(row.purchased_quantity)}</TableCell>
                                    <TableCell>₹ {row.price}</TableCell>
                                    <TableCell>₹ {(row.selling_price).split('$')?.[1]}</TableCell>
                                    <TableCell>{row.purchased_quantity}</TableCell>
                                    {/* <TableCell>₹ {row.offer_price}</TableCell>
                                    <TableCell>{row.services_applied}</TableCell>
                                    <TableCell>{row.final_so}</TableCell>
                                    <TableCell>{row.payment_status}</TableCell>
                                    <TableCell>{row.final_status}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
    </>
  )
}

export default DashboardComponents