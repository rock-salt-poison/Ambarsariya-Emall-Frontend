import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function DashboardComponents({data}) {

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

  return (
    <>
        <Box className="col">
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
                                <TableCell>Products</TableCell>
                                <TableCell>Quantity
                                    <Typography component="span">(in stock)</Typography>
                                </TableCell>
                                <TableCell>Cost Price</TableCell>
                                <TableCell>Selling Price</TableCell>
                                <TableCell>P.O Quantity
                                    {/* <Typography component="span">(After coupons)</Typography> */}
                                </TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>List of services applied</TableCell>
                                <TableCell>Final S.O.</TableCell>
                                <TableCell>Payment status</TableCell>
                                <TableCell>Final status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                >
                                    <TableCell>
                                        {row.products}
                                    </TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>₹ {row.cost_price}</TableCell>
                                    <TableCell>₹ {row.selling_price}</TableCell>
                                    <TableCell>₹ {row.price_after_coupons}</TableCell>
                                    <TableCell>₹ {row.offer_price}</TableCell>
                                    <TableCell>{row.services_applied}</TableCell>
                                    <TableCell>{row.final_so}</TableCell>
                                    <TableCell>{row.payment_status}</TableCell>
                                    <TableCell>{row.final_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
    </>
  )
}

export default DashboardComponents