import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import po_stamp from '../../Utils/images/Sell/cart/po_stamp.svg';
import qr_code from '../../Utils/images/Sell/cart/qr_code.svg';
import CartTable from '../../Components/Cart/CartTable';
import badge_frame from '../../Utils/images/Sell/cart/badge_frame.svg';
import Button2 from '../../Components/Home/Button2';
import pickup from '../../Utils/images/Sell/shop_details/pickup.svg';
import delivery from '../../Utils/images/Sell/shop_details/delivery.webp';
import home_visit from '../../Utils/images/Sell/shop_details/home_visit.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardBoardPopup from '../../Components/CardBoardPopupComponents/CardBoardPopup';
import SpecialOffer from '../../Components/Cart/SpecialOffer/SpecialOffer';
import PrepaidPostpaid from '../../Components/Cart/Prepaid_Postpaid/PrepaidPostpaid';
import PurchaseCoupon from '../../Components/Cart/PurchaseCoupon/PurchaseCoupon';
import ServiceType from '../../Components/Cart/ServiceType/ServiceType';
import Delivery from '../../Components/Cart/ServiceType/Delivery';
import Visit from '../../Components/Cart/ServiceType/Visit';
import CoHelper from '../../Components/Cart/CoHelper/CoHelper';

function Cart() {
    const sampleRows = useSelector((state) => state.cart.selectedProducts);
    const [openPopup, setOpenPopup] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenPopup(false);
    };

    const handleClick = (e, item) => {
        if(item.openPopup){
            setOpenPopup((prev)=>(prev===item.id ? null : item.id))
        }else if(item.title === 'Become Member'){
            setTimeout(()=>navigate('../grab'), 100);
        }
    };

    const offers = [
        { id: 1, title: 'Special Offers', popupContent:<SpecialOffer/>, cName:'special_offer_popup', openPopup:true},
        { id: 2, title: 'Co-helpers',popupContent:<CoHelper/>, cName:'co_helper_popup', openPopup:true },
        { id: 3, title: 'Prepaid / Postpaid',  popupContent:<PrepaidPostpaid/>, cName:'prepaid_postpaid_offer_popup', openPopup:true },
        { id: 4, title: 'Purchase coupons', popupContent:<PurchaseCoupon/>, cName:'purchase_coupon_offer_popup',openPopup:true },
        { id: 5, title: 'Become Member', openPopup:false },
    ];

    const service_type = [
        { id: 1, imgSrc: pickup, service: 'pickup', popupContent: <ServiceType/>, cName:'service_type_popup' },
        { id: 2, imgSrc: delivery, service: 'delivery', popupContent: <Delivery/>, cName:'service_type_popup delivery' },
        { id: 3, imgSrc: home_visit, service: 'home visit', popupContent: <Visit/>, cName:'service_type_popup delivery visit' }
    ];

    const [selectedServices, setSelectedServices] = useState(new Set());
    const [openServicePopup, setOpenServicePopup] = useState(null);

    const handleServiceTypeClick = (e, item) => {
        const target = e.target.closest(".service");
        setSelectedServices((prevSelectedServices) => {
            const newSelectedServices = new Set(prevSelectedServices);
            if (newSelectedServices.has(item.id)) {
                newSelectedServices.delete(item.id);
            } else {
                newSelectedServices.add(item.id);
            }
            return newSelectedServices;
        });
        setOpenServicePopup(item.id); // Open the popup for the clicked service
        target.classList.toggle("increase_scale");
    };

    return (
        <Box className="cart_wrapper">
            <Box className="row">
                <Box className="col">
                    <Button2 text={"Back"} redirectTo={'id/products'} />
                    <Link to="../id/return">
                        <Box component="img" src={po_stamp} alt="p.o" className='po_stamp' />
                    </Link>
                    <Typography variant='h2' className='heading'>
                        <Typography variant='span' className="span_1">Apna Departmental</Typography>
                        <Typography variant='span' className="span_1">
                            Shop No:
                            <Typography variant='span' className='span_2'>123</Typography>
                        </Typography>
                    </Typography>

                    <Link to="../id/order">
                        <Box component="img" src={qr_code} alt="qr_code" className='qr_code' />
                    </Link>
                </Box>
                <Box className="col">
                    <Box className="sub_col"></Box>
                    <CartTable rows={sampleRows} />
                    <Box className="sub_col"></Box>
                </Box>
                <Box className="col">
                    <Button2 text={"Back"} redirectTo={'../id/products'} />
                    <Box className="offers">
                        {offers.map((item) => (
                            <React.Fragment key={item.id}>
                                <Link className="offers_container" onClick={(e) => handleClick(e, item)}>
                                    <Box component="img" src={badge_frame} alt="badge_frame" className='badge_frame' />
                                    <Typography variant='h3' className='text_2'>{item.title}</Typography>
                                </Link>
                                <CardBoardPopup
                                    customPopup={true}
                                    open={openPopup === item.id}
                                    handleClose={handleClose}
                                    body_content={item.popupContent}
                                    optionalCName={item.cName}
                                />
                            </React.Fragment>
                        ))}
                    </Box>
                    <Box className="type_of_service">
                        {service_type.map((item) => (
                            <Box
                                key={item.id}
                                onClick={(e) => handleServiceTypeClick(e, item)}
                                className={`service`}
                            >
                                <Box
                                    component="img"
                                    src={item.imgSrc}
                                    alt={item.service}
                                    className={`service_type`}
                                />
                            </Box>
                        ))}
                        <CardBoardPopup
                            customPopup={true}
                            open={openServicePopup !== null}
                            handleClose={() => setOpenServicePopup(null)}
                            body_content={service_type.find(s => s.id === openServicePopup)?.popupContent}
                            optionalCName={service_type.find(s => s.id === openServicePopup)?.cName}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Cart;
