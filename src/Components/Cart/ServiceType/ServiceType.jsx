import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import pickup_truck_gif from '../../../Utils/gifs/pickup_truck.gif';
import pickup from '../../../Utils/images/Sell/shop_details/pickup.svg';
import takeaway from '../../../Utils/images/Sell/shop_details/takeaway.webp';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Pickup from './Pickup';
import CardBoardPopup from '../../CardBoardPopupComponents/CardBoardPopup';
import TakeAway from './TakeAway';

function ServiceType({onPickupFormDataChange, onTakeAwayFormDataChange, shopAccessToken, shop_no}) {
    const [openPopup, setOpenPopup] = useState(null);
    const location = useLocation();
    const [shopNo, setShopNo] = useState(shop_no);

    // Get shop_no from shopAccessToken if not provided directly
    useEffect(() => {
        const fetchShopNo = async () => {
            if (!shop_no && shopAccessToken) {
                try {
                    const { getShopUserData } = await import('../../../API/fetchExpressAPI');
                    const resp = await getShopUserData(shopAccessToken);
                    if (resp?.length > 0) {
                        setShopNo(resp[0].shop_no);
                    }
                } catch (error) {
                    console.error('Error fetching shop data:', error);
                }
            } else if (shop_no) {
                setShopNo(shop_no);
            }
        };
        fetchShopNo();
    }, [shopAccessToken, shop_no]);

    const handleClose = () => {
        setOpenPopup(false);
    }

    const handleClick = (e, id) => {
        const service = e.target.closest('.service');
        if(service){
            service.classList.add('active');
            setTimeout(()=>{service.classList.remove('active')},300)
            setTimeout(()=>{setOpenPopup((prev) => prev===id ? null : id)},600)
        }
    }

    // Create services array with current shopNo
    const services = React.useMemo(() => [
        {id:1, imgSrc:pickup, popupContent:<Pickup title="Pickup" fieldSet="cart" shop_no={shopNo} onFormDataChange={onPickupFormDataChange} handleClose={handleClose}/>, cName:'service_type_popup pickup',  },
        {id:2, imgSrc:takeaway, popupContent:<TakeAway title="Take Away" onFormDataChange={onTakeAwayFormDataChange}/>, cName:'service_type_popup pickup' }
    ], [shopNo, onPickupFormDataChange, onTakeAwayFormDataChange, handleClose])

    const getCurrentUrlWithToken = () => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        return `${location.pathname}?${searchParams.toString()}`;
      };

  return (
    <>
        <Box className="col"></Box>
        <Box className="col">
            <Box className="service_type_container">
                <Typography variant="h2">Select one service type</Typography>
                <Box className="service_types">
                    {services.map((service)=>{
                        return <React.Fragment key={service.id}>
                            <Link to={getCurrentUrlWithToken()} onClick={(e)=>handleClick(e, service.id)}>
                                <Box component="img" alt="service_type" src={service.imgSrc} className='service'/>
                            </Link>
                            <CardBoardPopup open={openPopup===service.id} handleClose={handleClose} customPopup={true} body_content={service.popupContent} optionalCName={service.cName}/> 
                        </React.Fragment>
                    })}
                    
                   
                </Box>
            </Box>
        </Box>
        <Box className="col">
            <Box className="image_container">
                <Box component='img' src={pickup_truck_gif} alt="gif" className='gif'/>
            </Box>
        </Box>
    </>
  )
}

export default ServiceType