import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { get_allPurchaseOrderDetails, get_purchaseOrderDetails, get_purchaseOrders, getUser } from "../../../../API/fetchExpressAPI";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Divider } from "rsuite";

function OrderDetails_tab_content({ title }) {
    const [purchasedOrders, setPurchasedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]); // Store selected order
    const token = useSelector((state) => state.auth.userAccessToken);
    const [loading, setLoading] = useState(false);

    const fetchPurchasedOrder = async (buyer_id) => {
        try {
            setLoading(true);
            const resp = await get_allPurchaseOrderDetails(buyer_id);
            if (resp.valid) {
                setPurchasedOrders(resp.data);
            }
        } catch (e) {
            console.log(e);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            const fetchUserType = async () => {
                try {
                    setLoading(true);
                    const userData = (await getUser(token))?.[0];

                    if (userData.user_type === "member") {
                        fetchPurchasedOrder(userData.user_id);
                    }
                } catch (e) {
                    console.log(e);
                } finally{
                    setLoading(false);
                }
            };
            fetchUserType();
        }
    }, [token]);

    const fetchPurchasedOrderDetails = async (po_no) => {
        if(po_no){
            try{
                setLoading(true);
                const resp = await get_purchaseOrders(po_no);
                if(resp.valid){
                    setSelectedOrder(resp.data);
                }
            }catch(e){
                console.log(e);
            }finally{
                setLoading(false);
            }
        }
    }

    useEffect(()=>{
        if(selectedOrder){
            fetchPurchasedOrderDetails(selectedOrder.po_no);
        }
    }, [selectedOrder])

    console.log(selectedOrder);
    

    return (
        <Box className="tab_content">
            {loading && <Box className="loading"><CircularProgress/></Box> }
            {selectedOrder.length>0 ? <Typography sx={{cursor:'pointer'}} className="title" onClick={()=>setSelectedOrder([])}>{title}</Typography>: <Typography className="title">{title}</Typography>}
            <Box className="content">
                {/* If an order is selected, show its details */}
                {selectedOrder.length>0 ? (<>
                    <Box className="order_details_info">
                        <Box className="col">
                        <Typography className="heading">Order Details</Typography>
                        <Typography className="text">{selectedOrder?.[0]?.po_no}</Typography>
                        </Box>
                    {selectedOrder?.map((order)=> (<Box className='col_group'>
                        <Box className="col">
                            <Typography className="heading">Product Name</Typography>
                            <Typography className="text">{order.product_name ? order.product_name : '-'}</Typography>
                        </Box>
                        <Box className="col">
                            <Typography className="heading">Total Amount</Typography>
                            <Typography className="text">{order.total_amount}</Typography>
                        </Box>
                        
                        <Divider/>
                    </Box>))}
                    </Box>
                
                </>) : (
                    /* Show order list when no order is selected */
                    purchasedOrders.map((order, index) => (
                        <Box key={index} className="card" onClick={() => setSelectedOrder(order)}>
                            <Box className="col icon">
                                <ShoppingBagIcon />
                            </Box>
                            <Box className="col order_details">
                                <Typography className="heading">{order.po_no}</Typography>
                                <Typography className="text">{order.payment_method}</Typography>
                                <Typography className="text">{order.total_amount}</Typography>
                                <Typography className="text">{order.shipping_method}</Typography>
                            </Box>
                            <Box className="col status">
                                <Typography className="text">Pending</Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
}

export default OrderDetails_tab_content;
