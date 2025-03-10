import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { get_products, get_purchaseOrders } from '../../../../API/fetchExpressAPI';
import ReactThreeToggle from 'react-three-toggle';

function DashboardComponents({ data }) {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const { token } = useParams();
    const [toggleStates, setToggleStates] = useState({});
    const [editedValues, setEditedValues] = useState({});
    
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
        try {
            setLoading(false);
            if (shop_no) {
                const resp = await get_purchaseOrders(shop_no);
                if (resp.valid) {
                    setProducts(resp.data);
                }
            }

        } catch (e) {
            console.log(e);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (data) {
            fetch_products(data.shop_no);
        }
    }, [data]);

    useEffect(() => {
        if (products.length > 0) {
            const initialStates = {};
            products.forEach((_, index) => {
                initialStates[index] = "hold";  // Default selection as "hold"
            });
            setToggleStates(initialStates);
        }
    }, [products]);


    const handleToggleChange = (index, newValue) => {
        if (newValue !== null) {
            setToggleStates((prevState) => ({ ...prevState, [index]: newValue }));
            console.log(`Row ${index + 1} selected:`, newValue);
        }
    };

    const handleInputChange = (index, field, value) => {
        setEditedValues((prevState) => ({
            ...prevState,
            [index]: { ...prevState[index], [field]: value }
        }));
    };

    return (
        <>
            <Box className="col">
                {loading && <Box className="loading"><CircularProgress /></Box>}
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
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Price
                                <Typography component="span">(After discount)</Typography>
                            </TableCell>
                            <TableCell>P.O Sale
                                
                            </TableCell>
                            {/* <TableCell>Total Price</TableCell>
                                <TableCell>List of services applied</TableCell>
                                <TableCell>Final S.O.</TableCell>
                                <TableCell>Payment status</TableCell>
                                <TableCell>Final status</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row, index) => {
                            const isHold = toggleStates[index] === "hold";

                            return (
                                <TableRow key={row.product_id} hover>
                                    <TableCell>{index + 1}</TableCell>

                                    {/* Product Name Column - Dropdown if on Hold */}
                                    <TableCell>
                                        {isHold ? (
                                            <Select
                                                value={row.product_name || editedValues[index]?.product_name }
                                                onChange={(e) => handleInputChange(index, "product_name", e.target.value)}
                                                fullWidth
                                            >
                                                <MenuItem value={row.product_name}>{row.product_name}</MenuItem>
                                                <MenuItem value="Product B">Product B</MenuItem>
                                                <MenuItem value="Product C">Product C</MenuItem>
                                            </Select>
                                        ) : (
                                            row.product_name
                                        )}
                                    </TableCell>

                                    {/* Quantity Column - Input if on Hold */}
                                    <TableCell>
                                        {isHold ? (
                                            <TextField
                                                type="number"
                                                value={editedValues[index]?.quantity || row.quantity_ordered}
                                                onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                                                inputProps={{ min: 1 }}
                                            />
                                        ) : (
                                            row.quantity_ordered
                                        )}
                                    </TableCell>

                                    <TableCell>{parseInt(row.quantity) - parseInt(row.quantity_ordered)}</TableCell>
                                    <TableCell>₹ {row.unit_price}</TableCell>
                                    <TableCell>₹ {row.total_price}</TableCell>
                                    <TableCell>₹ {row.total_price - row.discount_amount}</TableCell>

                                    {/* Toggle Button Group */}
                                    <TableCell>
                                        <ToggleButtonGroup
                                            value={toggleStates[index] || "hold"}
                                            exclusive
                                            onChange={(event, newValue) => handleToggleChange(index, newValue)}
                                        >
                                            <ToggleButton value="reject" className='toggle'>Reject</ToggleButton>
                                            <ToggleButton value="hold" className='toggle'>Hold</ToggleButton>
                                            <ToggleButton value="accept" className='toggle'>Accept</ToggleButton>
                                        </ToggleButtonGroup>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

export default DashboardComponents